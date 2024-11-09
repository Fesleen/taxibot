import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function SignComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    passportSeries: '',
    driverLicenseSeries: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Barcha maydonlarni to'ldirilganligini tekshirish
    const { name, surname, phone, passportSeries, driverLicenseSeries } = formData;
    if (!name || !surname || !phone || !passportSeries || !driverLicenseSeries) {
      setError("Iltimos, hamma joyni to'ldiring!");
      return;
    }

    try {
      // Barcha form ma'lumotlarini APIga yuborish
      const response = await axios.post('/api/sign', formData);

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setError('Ro‘yxatdan o‘tishda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Ro'yxatdan o'tish</h2>
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz bormi?</span>
          <span className={styles.link} onClick={() => navigate('/')}>Kirish</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Ismingiz</label>
          <input
            type="text"
            name="name"
            placeholder="Ismingizni kiriting"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Familiyangiz</label>
          <input
            type="text"
            name="surname"
            placeholder="Familiyangizni kiriting"
            className={styles.input}
            value={formData.surname}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqamingiz</label>
          <input
            type="number"
            name="phone"
            placeholder="998XXYYYYYYY"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Pasportingizni yuklang</label>
          <input
            type="text"
            name="passportSeries"
            placeholder="Pasport seriyasini kiriting"
            className={styles.input}
            value={formData.passportSeries}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Haydovchilik guvohnomasini yuklang</label>
          <input
            type="text"
            name="driverLicenseSeries"
            placeholder="Guvohnoma seriyasini kiriting"
            className={styles.input}
            value={formData.driverLicenseSeries}
            onChange={handleChange}
          />
        </div>

        {error && <span className={styles.errorText}>{error}</span>}

        <button type="submit" className={styles.submitButton}>Ro'yxatdan o'tish</button>
      </form>
    </div>
  );
}

export default SignComponent;
