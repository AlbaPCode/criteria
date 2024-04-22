// controllers/DepartmentController.js

const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET: Obtener todos los departamentos
router.get('/', async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Insertar un nuevo departamento
router.post('/', async (req, res) => {
    const { dName } = req.body;
    const username = req.user.username;

    if (username !== 'admin') {
        return res.status(401).json({ message: 'You do not have rights to the action...' });
    }

    const department = new Department({ dName });

    try {
        await department.save();
        res.status(201).json({ message: 'Department created successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Eliminar un departamento por nombre
router.delete('/:dName', async (req, res) => {
    const { dName } = req.params;
    const username = req.user.username;

    if (username !== 'admin') {
        return res.status(401).json({ message: 'You do not have rights to the action...' });
    }

    try {
        const department = await Department.findOneAndDelete({ dName });
        if (!department) {
            return res.status(404).json({ message: 'Department not found.' });
        }
        res.json({ message: 'Department deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
