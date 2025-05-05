const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const newEntry = `Usuario: ${username}, Correo: ${email}, Contraseña: ${password}\n`;

  fs.appendFile('usuarios.txt', newEntry, (err) => {
    if (err) {
      console.error('Error al guardar:', err);
      return res.status(500).send('Error al guardar los datos');
    }
    res.send('Registro guardado exitosamente 🎉');
  });
});

app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001');
});
