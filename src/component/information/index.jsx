import React, { useState } from 'react';
import axios from 'axios';
import styles from './style.module.css'

function InformationComponent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith("998")) {
      value = "+998" + value;
    }
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || !gender) {
      setError("Iltimos, telefon raqami va jinsni to‘ldiring.");
      return;
    }
    axios.post('API/information', {
      phoneNumber,
      gender
    }).then(() => alert(`Ma'lumotlar yuborildi!`))
      .catch((error) => alert('Xato yuz berdi.'));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqami:</label>
          <input 
            type="text" 
            value={phoneNumber} 
            onChange={handlePhoneNumberChange} 
            placeholder="+998" 
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Jins:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className={styles.select}>
            <option value="">Tanlang</option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
        <input type="submit" value="Yuborish" className={styles.submitButton} />
      </form>
    </div>
  );
}

export default InformationComponent;
