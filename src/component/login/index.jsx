import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '' // Corrected to use "password" for the state key
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone && formData.password) {
      navigate('/dashboard');
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h2 className={styles.title}>Assalomu alaykum, sizni qayta ko'rganimizdan xursandmiz!</h2>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqamingiz</label>
          <input
            type="number"
            name="phone"
            placeholder="998"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Parolingiz</label>
          <input
            type="password" // Corrected to "password" type
            name="password" // Matches "password" state key
            placeholder="Parolingizni kiriting"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz yo'qmi?</span>
          <span className={styles.link} onClick={() => navigate('/sign')}>
            Bu yerdan oching
          </span>
        </div>
        <button type="submit" className={styles.submitButton}>Kirish</button>
      </form>
    </div>
  );
}

export default LoginComponent;
