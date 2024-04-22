// controllers/UserController.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// POST: Autenticar un usuario y generar un token JWT
router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generar un token JWT
        const token = jwt.sign({ username: user.username }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
