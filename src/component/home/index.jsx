import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

function HomeComponent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSubmit = () => {
    navigate('/adress');
  };

  return (
    <div className={styles.container}>
      {user ? (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <div className={styles.box__top}>
            <span>Welcome, {user.name}!</span>
          </div>
          <div>
            <span>Balance: {user.balance.toLocaleString()} UZS</span>
          </div>
        </header>
      ) : (
        <div className={styles.card}>
          <h2 className={styles.card__h2}>Loading...</h2>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSubmit}>Yo'lovchi olish</button>
        <button className={styles.button} onClick={handleSubmit}>Yo'lovchi berish</button>
        <button className={styles.button} onClick={handleSubmit}>Pochta olish</button>
        <button className={styles.button} onClick={handleSubmit}>Pochta berish</button>
      </div>
    </div>
  );
}

export default HomeComponent;
