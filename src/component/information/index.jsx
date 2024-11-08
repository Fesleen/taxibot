import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function InformationComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phoneNumber && formData.gender) {
      axios.post('API/information', formData)
        .then(() => {
          alert("Ma'lumotlar yuborildi!");
          navigate('/');
        })
        .catch(() => alert("Xato yuz berdi."));
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <label className={styles.label}>Jins:</label>
          <select
            name="gender"
            className={styles.select}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Tanlang</option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Yuborish</button>
      </form>
    </div>
  );
}

export default InformationComponent;
