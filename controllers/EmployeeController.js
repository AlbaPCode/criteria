// controllers/EmployeeController.js

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET: Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Insertar un nuevo empleado
router.post('/', async (req, res) => {
    const { name, age, position } = req.body;
    const username = req.user.username;

    if (username !== 'admin') {
        return res.status(401).json({ message: 'You do not have rights to the action...' });
    }

    const employee = new Employee({ name, age, position });

    try {
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Actualizar un empleado por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, position } = req.body;
    const username = req.user.username;

    if (username !== 'admin') {
        return res.status(401).json({ message: 'You do not have rights to the action...' });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, age, position }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Eliminar un empleado por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    if (username !== 'admin') {
        return res.status(401).json({ message: 'You do not have rights to the action...' });
    }

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
