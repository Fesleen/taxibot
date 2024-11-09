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
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true); // Yuklanmoqda indikatorini o'rnatish
    setError(''); // Xatolikni tozalash

    try {
      const response = await axios.post('/api/login', { phone, password });

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        setError('Telefon raqami yoki parol noto‘g‘ri.');
      } else {
        setError('Loginda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
      }
    } finally {
      setIsLoading(false); // Yuklanish holatini o'chirish
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            Assalomu alaykum, sizni qayta ko'rganimizdan xursandmiz!
          </h2>
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
            type="password"
            name="password"
            placeholder="Parolingizni kiriting"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        {isLoading && <span className={styles.loadingText}>Yuklanmoqda...</span>}
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz yo'qmi?</span>
          <span className={styles.link} onClick={() => navigate('/sign')}>
            {' '}
            Bu yerdan oching{' '}
          </span>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Kirish...' : 'Kirish'}
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
