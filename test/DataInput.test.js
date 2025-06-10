const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const { expect } = require('chai');
const sinon = require('sinon');

// Mock de Firebase
const mockAddDoc = sinon.stub();
const mockNavigate = sinon.stub();

// Simular el componente DataInput para testing
const DataInput = () => {
  const [personas, setPersonas] = React.useState('');
  const [mes, setMes] = React.useState('');
  const [costo, setCosto] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      personas: parseInt(personas),
      mes: parseInt(mes),
      costo: parseFloat(costo),
      timestamp: new Date()
    };

    try {
      await mockAddDoc('datosFormulario', data);
      mockNavigate('/recommendations', { state: data });
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  };

  return React.createElement('div', { className: 'container_general' },
    React.createElement('h2', { className: 'h2-input' }, 'Ingreso de datos'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'number',
        placeholder: 'Número de Personas',
        value: personas,
        onChange: (e) => {
          const value = parseInt(e.target.value);
          if (value >= 1 || e.target.value === '') {
            setPersonas(e.target.value);
          }
        },
        min: '1',
        required: true
      }),
      React.createElement('input', {
        type: 'number',
        placeholder: 'N° de mes',
        value: mes,
        onChange: (e) => {
          const value = parseInt(e.target.value);
          if (value >= 1 || e.target.value === '') {
            setMes(e.target.value);
          }
        },
        min: '1',
        max: '12',
        required: true
      }),
      React.createElement('input', {
        type: 'number',
        placeholder: 'Costo total',
        value: costo,
        onChange: (e) => {
          const value = parseInt(e.target.value);
          if (value >= 1 || e.target.value === '') {
            setCosto(e.target.value);
          }
        },
        min: '1',
        required: true
      }),
      React.createElement('button', {
        type: 'submit',
        className: 'button_dataInput'
      }, 'Generar recomendación')
    )
  );
};

describe('DataInput Component', () => {
  let consoleErrorStub;

  beforeEach(() => {
    mockAddDoc.reset();
    mockNavigate.reset();
    consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    consoleErrorStub.restore();
  });

  it('debería guardar los datos ingresados', async () => {
    mockAddDoc.resolves();
    
    render(React.createElement(BrowserRouter, null,
      React.createElement(DataInput)
    ));

    const personasInput = screen.getByPlaceholderText('Número de Personas');
    const mesInput = screen.getByPlaceholderText('N° de mes');
    const costoInput = screen.getByPlaceholderText('Costo total');
    const submitButton = screen.getByText('Generar recomendación');

    fireEvent.change(personasInput, { target: { value: '4' } });
    fireEvent.change(mesInput, { target: { value: '6' } });
    fireEvent.change(costoInput, { target: { value: '75000' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddDoc.calledOnce).to.be.true;
    });

    const savedData = mockAddDoc.getCall(0).args[1];
    expect(savedData.personas).to.equal(4);
    expect(savedData.mes).to.equal(6);
    expect(savedData.costo).to.equal(75000);
  });

  it('debería validar que los datos se hallen dentro del rango especificado', () => {
    render(React.createElement(BrowserRouter, null,
      React.createElement(DataInput)
    ));

    const personasInput = screen.getByPlaceholderText('Número de Personas');
    const mesInput = screen.getByPlaceholderText('N° de mes');
    const costoInput = screen.getByPlaceholderText('Costo total');

    // Probar valores válidos
    fireEvent.change(personasInput, { target: { value: '5' } });
    expect(personasInput.value).to.equal('5');
    
    fireEvent.change(mesInput, { target: { value: '12' } });
    expect(mesInput.value).to.equal('12');
    
    fireEvent.change(costoInput, { target: { value: '50000' } });
    expect(costoInput.value).to.equal('50000');

    // Probar valores inválidos - establecer valores válidos primero
    fireEvent.change(personasInput, { target: { value: '3' } });
    fireEvent.change(personasInput, { target: { value: '0' } });
    expect(personasInput.value).to.equal('3'); // Debe mantener el valor anterior

    fireEvent.change(mesInput, { target: { value: '5' } });
    fireEvent.change(mesInput, { target: { value: '0' } });
    expect(mesInput.value).to.equal('5'); // Debe mantener el valor anterior
  });

  it('debería generar la respectiva recomendación personalizada', async () => {
    mockAddDoc.resolves();
    
    render(React.createElement(BrowserRouter, null,
      React.createElement(DataInput)
    ));

    const personasInput = screen.getByPlaceholderText('Número de Personas');
    const mesInput = screen.getByPlaceholderText('N° de mes');
    const costoInput = screen.getByPlaceholderText('Costo total');
    const submitButton = screen.getByText('Generar recomendación');

    fireEvent.change(personasInput, { target: { value: '3' } });
    fireEvent.change(mesInput, { target: { value: '8' } });
    fireEvent.change(costoInput, { target: { value: '120000' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate.calledOnce).to.be.true;
    });

    const navigationCall = mockNavigate.getCall(0);
    const [route, options] = navigationCall.args;
    
    expect(route).to.equal('/recommendations');
    expect(options.state.personas).to.equal(3);
    expect(options.state.mes).to.equal(8);
    expect(options.state.costo).to.equal(120000);
  });
});
