// controllers/WeatherForecastController.js

const express = require('express');
const router = express.Router();

// Definimos los resúmenes del clima
const Summaries = [
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
];

// GET: Obtener pronóstico del tiempo
router.get('/', (req, res) => {
    try {
        // Generamos datos de pronóstico del tiempo para 5 días
        const weatherForecasts = Array.from({ length: 5 }, (_, index) => {
            return {
                date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000), // Fecha incrementada para cada día
                temperatureC: Math.floor(Math.random() * (55 - (-20) + 1)) - 20, // Temperatura entre -20 y 55 grados Celsius
                summary: Summaries[Math.floor(Math.random() * Summaries.length)] // Resumen aleatorio del clima
            };
        });

        res.json(weatherForecasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
