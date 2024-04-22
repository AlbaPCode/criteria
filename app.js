const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();


// Permitir todas las solicitudes CORS desde cualquier origen
app.use(cors());

// Permitir solicitudes CORS desde localhost:3001
//app.use(cors({
  //origin: 'http://localhost:3001'
//}));

// Consultar todos los empleados
connection.query('SELECT * FROM EMPLOYEE', (err, employees) => {
  if (err) {
    console.error('Error al obtener los empleados:', err);
    return;
  }
  console.log('Empleados:', employees);
});

// Consultar todos los departamentos
connection.query('SELECT * FROM DEPARTMENT', (err, departments) => {
  if (err) {
    console.error('Error al obtener los departamentos:', err);
    return;
  }
  console.log('Departamentos:', departments);
});

// Definir rutas y lógica de la aplicación...

// Ejemplo de una ruta para obtener todos los empleados
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM EMPLOYEE', (err, employees) => {
    if (err) {
      console.error('Error al obtener los empleados:', err);
      res.status(500).json({ error: 'Error al obtener los empleados' });
      return;
    }
    res.json(employees);
  });
});

// Ejemplo de una ruta para obtener todos los departamentos
app.get('/departments', (req, res) => {
  connection.query('SELECT * FROM DEPARTMENT', (err, departments) => {
    if (err) {
      console.error('Error al obtener los departamentos:', err);
      res.status(500).json({ error: 'Error al obtener los departamentos' });
      return;
    }
    res.json(departments);
  });
});

// Puedes definir más rutas y lógica aquí...

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
