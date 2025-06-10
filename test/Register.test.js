const request = require('supertest');
const sinon = require('sinon');
const fs = require('fs');
const app = require('../backend/server');
const { expect } = require('chai');

describe('POST /register', () => {
  let appendFileStub;

  beforeEach(() => {
    appendFileStub = sinon.stub(fs, 'appendFile');
  });

  afterEach(() => {
    appendFileStub.restore();
  });

  it('debería registrar correctamente un usuario', (done) => {
    appendFileStub.callsFake((filename, data, callback) => {
      callback(null); // Simula éxito
    });

    request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456'
      })
      .expect(200)
      .end((err, res) => {
        expect(appendFileStub.calledOnce).to.be.true;
        expect(res.text).to.equal('Registro guardado exitosamente 🎉');
        done(err);
      });
  });

  it('debería manejar errores al guardar', (done) => {
    appendFileStub.callsFake((filename, data, callback) => {
      callback(new Error('Fallo intencional'));
    });

    request(app)
      .post('/register')
      .send({
        username: 'erroruser',
        email: 'fail@example.com',
        password: '123456'
      })
      .expect(500)
      .end((err, res) => {
        expect(appendFileStub.calledOnce).to.be.true;
        expect(res.text).to.equal('Error al guardar los datos');
        done(err);
      });
  });
});

describe('DELETE /users/:id', () => {
  let readFileStub;
  let writeFileStub;

  beforeEach(() => {
    readFileStub = sinon.stub(fs, 'readFile');
    writeFileStub = sinon.stub(fs, 'writeFile');
  });

  afterEach(() => {
    readFileStub.restore();
    writeFileStub.restore();
  });

  it('debería eliminar un usuario correctamente', (done) => {
    const mockFileContent = 'Usuario: user1, Correo: user1@example.com, Contraseña: pass1\nUsuario: user2, Correo: user2@example.com, Contraseña: pass2\n';
    
    readFileStub.callsFake((filename, encoding, callback) => {
      callback(null, mockFileContent);
    });

    writeFileStub.callsFake((filename, data, callback) => {
      callback(null);
    });

    request(app)
      .delete('/users/1')
      .expect(200)
      .end((err, res) => {
        expect(readFileStub.calledOnce).to.be.true;
        expect(writeFileStub.calledOnce).to.be.true;
        expect(res.text).to.equal('Usuario eliminado exitosamente 🗑️');
        done(err);
      });
  });
});

describe('GET /users/:email', () => {
  beforeEach(() => {
    // Asegúrate de que el array _usuariosRegistrados existe en tu servidor
    if (app._usuariosRegistrados) {
      app._usuariosRegistrados.length = 0; // Limpia antes de cada test
      app._usuariosRegistrados.push({
        username: 'usuarioDemo',
        email: 'demo@email.com',
        password: 'demo123'
      });
    }
  });

  it('debería devolver un usuario por su email', (done) => {
    request(app)
      .get('/users/demo@email.com')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('username', 'usuarioDemo');
        expect(res.body).to.have.property('email', 'demo@email.com');
        done(err);
      });
  });

  it('debería responder con 404 si no existe el usuario', (done) => {
    request(app)
      .get('/users/noexiste@email.com')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.equal('Usuario no encontrado');
        done(err);
      });
  });
});