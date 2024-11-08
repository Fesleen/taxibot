import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const { phone, password } = formData;

  if (!phone || !password) {
    setError('Iltimos, telefon raqami va parolni kiriting.');
    return;
  }

  try {
    const response = await axios.post('/api/login', { phone, password });

    if (response.status === 200) {
      const user = response.data; 
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    }
  } catch (error) {
    console.error('Login error:', error);
    setError('Loginda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
  }
};

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <h2 className={styles.title}>Assalomu alaykum, sizni qayta ko'rganimizdan xursandmiz!</h2>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqamingiz</label>
          <input
            type="number"
            name="phone"
            placeholder="+998"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Parolingiz</label>
          <input
            type="number"
            name="password"
            placeholder="Parolingizni kiriting"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz yo'qmi?</span>
          <span className={styles.link} onClick={() => navigate('/sign')}> Bu yerdan oching </span>
        </div>
        <button type="submit" className={styles.submitButton}>Kirish</button>
      </form>
    </div>
  );
}

export default LoginComponent;
