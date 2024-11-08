import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Ensure both fields are filled before sending data
    if (!formData.phone || !formData.password) {
      alert('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    try {
      // Make the API request
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        }),
      });

      // Use response to check for successful login
      if (response.ok) {
        // If response is successful, navigate to the address page
        navigate('/address');
      } else {
        // If response is not successful, show an error message
        setErrorMessage('Noto‘g‘ri ma’lumotlar. Iltimos, qayta urinib ko‘ring.');
      }
    } catch (error) {
      // Handle error if fetch fails
      setErrorMessage('Xato yuz berdi. Iltimos, keyinroq urinib ko‘ring.');
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
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            maxLength={13}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            maxLength={6}
          />
        </div>

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

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
