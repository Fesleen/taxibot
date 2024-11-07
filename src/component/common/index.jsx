import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import styles from "./style.module.css";

const CommonComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getColor = (path) => {
    return location.pathname === path ? '#ffffff' : '#b0b0b0'; // Aktif page uchun rang
  };

  return (
    <div className={styles.container}>
      <div className={styles.Box}>
        <h1 className={styles.Box__h1}>BUYURTMA BERISH</h1>
        <div className={styles.Box__card}>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/')}
          >
            <LocationOnIcon sx={{ color: getColor('/') }} />
            <p className={styles.box__p} style={{ color: getColor('/') }}>Manzil</p>
          </div>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/price')}
          >
            <GroupsIcon sx={{ color: getColor('/price') }} />
            <p className={styles.box__p} style={{ color: getColor('/price') }}>Yo'lovchilar va narx</p>
          </div>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/information')}
          >
            <PersonIcon sx={{ color: getColor('/information') }} />
            <p className={styles.box__p} style={{ color: getColor('/information') }}>Shaxsiy ma'lumot</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonComponent;
