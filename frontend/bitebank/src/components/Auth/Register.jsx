import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    documentType: 'DNI', 
    documentNumber: ''
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'password', 'phone', 'documentNumber'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setMessage({ text: 'Todos los campos son requeridos', type: 'error' });
        return false;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({ text: 'Ingrese un correo electrónico válido', type: 'error' });
      return false;
    }

    if (formData.password.length < 8) {
      setMessage({ text: 'La contraseña debe tener al menos 8 caracteres', type: 'error' });
      return false;
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      setMessage({ text: 'El teléfono debe contener solo números', type: 'error' });
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await apiRequest('/users', 'POST', formData);
      setMessage({ 
        text: 'Registro exitoso. Redirigiendo al login...', 
        type: 'success' 
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage({ 
        text: error.message || 'Error al registrar usuario', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h1>Registro</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Nombre completo</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]*"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="documentType">Tipo de documento</label>
            <select
              id="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
            >
              <option value="DNI">DNI</option>
              <option value="CE">Carné de Extranjería</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="documentNumber">Número de documento</label>
            <input
              type="text"
              id="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="btn-container">
            <button 
              type="submit" 
              className="btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
          
          <div className="form-footer">
            <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
          </div>
        </form>
        
        {message.text && (
          <div id="message" className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;