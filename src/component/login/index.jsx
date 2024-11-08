import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  // Update form data state based on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only numeric input for phone and password
    if (name === "phone" || name === "password") {
      // Make sure the value is numeric
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (formData.phone && formData.password) {
      try {
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

        const data = await response.json();

        if (response.ok) {
          // API call succeeded, navigate to dashboard
          navigate('/dashboard');
        } else {
          // Handle login error (wrong credentials, etc.)
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        // Handle network/API errors
        alert('An error occurred. Please try again later.');
      }
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
            type="text"  // Use text input and handle numeric validation manually
            name="phone"
            placeholder="998"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
            maxLength={13} // Ensure the phone number does not exceed 13 digits
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Parolingiz</label>
          <input
            type="password" // Use password type for password field
            name="password"
            placeholder="Parolingizni kiriting"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            maxLength={6} // If password is numeric, limit to a certain length
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
