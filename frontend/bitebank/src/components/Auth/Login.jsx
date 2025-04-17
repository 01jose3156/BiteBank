import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import '../../styles/Auth.css';

const initialState = {
  email: '',  
  password: '',
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_MESSAGE':
      return { ...state, message: action.message };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      dispatch({ type: 'SET_MESSAGE', message: 'Ingrese un correo electrónico válido' });
      return;
    }

    try {
      const response = await apiRequest('/users/login', 'POST', {
        email: state.email, 
        password: state.password,
      });
      localStorage.setItem('token', response.access_token);
      dispatch({ type: 'SET_MESSAGE', message: 'Inicio de sesión exitoso. Redirigiendo...' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      dispatch({ type: 'SET_MESSAGE', message: error.message || 'Credenciales inválidas' });
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label> 
            <input
              type="email" 
              id="email"     
              value={state.email}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          <div className="form-footer">
            <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
          </div>
        </form>
        {state.message && (
          <div id="message" className={`message ${state.message.includes('éxito') ? 'success' : 'error'}`}>
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;