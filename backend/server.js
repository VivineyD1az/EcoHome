const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Array para almacenar usuarios en memoria (para los tests)
const usuariosRegistrados = [];

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

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  fs.readFile('usuarios.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer para eliminar:', err);
      return res.status(500).send('Error al leer los datos');
    }
    
    if (!data.trim()) {
      return res.status(404).send('Usuario no encontrado');
    }
    
    // Parsear líneas del archivo
    const lines = data.trim().split('\n');
    
    // Verificar si el usuario existe
    if (userId < 1 || userId > lines.length) {
      return res.status(404).send('Usuario no encontrado');
    }
    
    // Eliminar la línea correspondiente al usuario
    lines.splice(userId - 1, 1);
    
    // Recrear el contenido del archivo
    const updatedContent = lines.length > 0 ? lines.join('\n') + '\n' : '';
    
    fs.writeFile('usuarios.txt', updatedContent, (writeErr) => {
      if (writeErr) {
        console.error('Error al eliminar usuario:', writeErr);
        return res.status(500).send('Error al eliminar el usuario');
      }
      res.send('Usuario eliminado exitosamente 🗑️');
    });
  });
});

app.get('/users', (req, res) => {
  res.json(usuariosRegistrados);
});

app.get('/users/:email', (req, res) => {
  const email = req.params.email;
  const usuario = usuariosRegistrados.find(u => u.email === email);
  
  if (!usuario) {
    return res.status(404).send('Usuario no encontrado');
  }
  
  res.json(usuario);
});

// Exportar tanto el app como el array para los tests
app._usuariosRegistrados = usuariosRegistrados;

if (require.main === module) {
  app.listen(3001, () => {
    console.log('Servidor backend en http://localhost:3001');
  });
}

module.exports = app;