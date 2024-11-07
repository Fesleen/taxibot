import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function AddressComponent() {
  const [departureRegion, setDepartureRegion] = useState('');
  const [departureDistrict, setDepartureDistrict] = useState('');
  const [destinationRegion, setDestinationRegion] = useState('');
  const [destinationDistrict, setDestinationDistrict] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const regions = {
    "Toshkent": [
      "Bektemir", "Mirobod", "Mirzo Ulug'bek", "Sirg'ali", "Chilonzor", "Yakkasaroy", "Shayxontohur", "Yunusobod", "Olmazor"
    ],
    "Andijon": [
      "Andijon", "Asaka", "Baliqchi", "Bo'z", "Izboskan", "Jalaquduq", "Marhamat", "Khonaqa", "Shahrixon", "Ulug'nor"
    ],
    "Buxoro": [
      "Buxoro", "Vobkent", "G'ijduvon", "Jondor", "Kogon", "Shofirkon", "Qorako'l", "Peshku", "Romitan", "Jumaniyoz"
    ],
    "Farg'ona": [
      "Farg'ona", "Beshariq", "Bo'ston", "Dang'ara", "Furqat", "Kokand", "Mingbuloq", "Rishton", "Toshloq", "Uchko'prik"
    ],
    "Jizzax": [
      "Jizzax", "Baxmal", "G'allaorol", "Zafarobod", "Sharof Rashidov", "Jumaobod", "Arnasoy", "Mingbuloq"
    ],
    "Qashqadaryo": [
      "Qarshi", "Chirakchi", "Dehqonobod", "Kasbi", "Muborak", "Nishon", "Shahrisabz", "Kitob", "Qamashi", "Yakkabog'"
    ],
    "Khorezm": [
      "Urgench", "Yangibozor", "Gurlan", "Khiva", "Shovot", "Tashovuz", "Khazarasp", "Beruniy"
    ],
    "Samarqand": [
      "Samarqand", "Kattakurgan", "Jomboy", "Narpay", "Oqdarya", "Pastdargom", "Payariq", "Bulung'ur", "Tayloq"
    ],
    "Surxondaryo": [
      "Termiz", "Angor", "Boysun", "Denov", "Jarqoq", "Kiziriq", "Muzrobod", "Sherobod", "Sariosiyo", "Uzun"
    ],
    "Navoiy": [
      "Navoiy", "Zarafshan", "Uchkuduk", "Kyzyltepa", "Tomdi", "Konimex", "Nurota"
    ],
    "Sirdaryo": [
      "Guliston", "Jizzakh", "Mirzaobod", "Sirdaryo", "Shirin", "Baydavlat", "Oqoltin"
    ],
    "Toshkent viloyati": [
      "Angren", "Angren", "Bekabad", "Chirchiq", "Zangiota", "Quyi Chirchiq", "Yangiyo'l", "Kibray", "Bo'ka", "Toshkent", "Yangiobod"
    ],
    "Xorazm": [
      "Urgench", "Yangibozor", "Gurlan", "Khiva", "Shovot", "Tashovuz", "Khazarasp", "Beruniy"
    ]
  };
  
  

  const validateForm = () => {
    const newErrors = {};
    if (!departureRegion) newErrors.departureRegion = "Iltimos, bu joyni to'ldiring.";
    if (!departureDistrict) newErrors.departureDistrict = "Iltimos, u joyni to'ldiring.";
    if (!destinationRegion) newErrors.destinationRegion = "Iltimos, u joyni to'ldiring.";
    if (!destinationDistrict) newErrors.destinationDistrict = "Iltimos, u joyni to'ldiring.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      axios.post('API/', { departureRegion, departureDistrict, destinationRegion, destinationDistrict })
        .then(() => navigate('/price'));
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className={styles.container}>
      <div className={styles.Box}>
      
        <div className={styles.Box__item}>
          <label className={styles.label}>Qayerdan (viloyat):</label>
          <select
            className={styles.select}
            value={departureRegion}
            onChange={(e) => setDepartureRegion(e.target.value)}
          >
            <option value="">Viloyat tanlang</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.departureRegion && <span className={styles.error_text}>{errors.departureRegion}</span>}
        </div>
        <div className={styles.Box__item}>
          <label className={styles.label}>Qayerdan (tuman):</label>
          <select
            className={styles.select}
            value={departureDistrict}
            onChange={(e) => setDepartureDistrict(e.target.value)}
            disabled={!departureRegion}
          >
            <option value="">Tumanni tanlang</option>
            {departureRegion && regions[departureRegion].map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {errors.departureDistrict && <span className={styles.error_text}>{errors.departureDistrict}</span>}
        </div>
        <div className={styles.Box__item}>
          <label className={styles.label}>Qayerga (viloyat):</label>
          <select
            className={styles.select}
            value={destinationRegion}
            onChange={(e) => setDestinationRegion(e.target.value)}
          >
            <option value="">Viloyat tanlang</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.destinationRegion && <span className={styles.error_text}>{errors.destinationRegion}</span>}
        </div>
        <div className={styles.Box__item}>
          <label className={styles.label}>Qayerga (tuman):</label>
          <select
            className={styles.select}
            value={destinationDistrict}
            onChange={(e) => setDestinationDistrict(e.target.value)}
            disabled={!destinationRegion}
          >
            <option value="">Tumanni tanlang</option>
            {destinationRegion && regions[destinationRegion].map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {errors.destinationDistrict && <span className={styles.error_text}>{errors.destinationDistrict}</span>}
        </div>
      </div>
      <div className={styles.Buttons}>
      <button className={styles.Back_button} onClick={handleBack}>Orqaga</button>
      <button className={styles.Next_button} onClick={handleNext}>Keyingisi</button>
      </div>
    </div>
  );
}

export default AddressComponent;
