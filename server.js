const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.post('/User/authenticate', async (req, res) => {
  try {
    const response = await fetch('https://albapcode.github.io/criteria/User/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agrega cualquier otra cabecera necesaria aquí
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    res.status(500).json({ error: 'Error al realizar la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en el puerto ${PORT}`);
});
