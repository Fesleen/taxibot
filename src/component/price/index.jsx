import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css'; 

function PriceComponent() {
  const [passengerCount, setPassengerCount] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!passengerCount || !price) {
      setError('Iltimos, yo‘lovchilar sonini va narxni to‘ldiring.');
      return;
    }

    axios.post('Api/price', {
      passengerCount,
      price
    })
      .then(() => {
        navigate('/information');
      })
      .catch((error) => {
        setError('Xato yuz berdi. Iltimos, qaytadan urinib ko‘ring.');
        console.error(error);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.Box}>
        <div className={styles.Box__item}>
          <label className={styles.label}>Yo‘lovchilar soni:</label>
          <input 
            type="number" 
            value={passengerCount} 
            onChange={(e) => setPassengerCount(e.target.value)} 
            placeholder="Yo‘lovchilar sonini kiriting"
            className={styles.input} 
          />
        </div>

        <div className={styles.Box__item}>
          <label className={styles.label}>Narx:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Narxni kiriting"
            className={styles.input} 
          />
        </div>

        {error && <span className={styles.error_text}>{error}</span>}
      </div>

      <div className={styles.Buttons}>
        <button className={styles.Back_button} onClick={handleBack}>Orqaga</button>
        <button className={styles.Next_button} onClick={handleSubmit}>Keyingisi</button>
      </div>
    </div>
  );
}

export default PriceComponent;
