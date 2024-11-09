import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone_number: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone_number, password } = formData;

    if (!phone_number || !password) {
      setError('Iltimos, telefon raqami va parolni kiriting.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://samarqandtaksi.pythonanywhere.com/users/login/',
        { phone_number, password }
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Loginda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignUp = () => {
    navigate('/sign'); 
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>
          Assalomu alaykum, sizni qayta ko'rganimizdan xursandmiz!
        </h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqamingiz</label>
          <input
            type="number"
            name="phone_number"
            placeholder="+998"
            className={styles.input}
            value={formData.phone_number}
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
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz yo'qmi?</span>
          <span className={styles.link} onClick={goToSignUp}>
            Ro'yxatdan o'tish
          </span>
        </div>
        {isLoading ? (
          <span>Yuklanmoqda...</span>
        ) : (
          <button type="submit" className={styles.submitButton}>
            Kirish
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginComponent;
