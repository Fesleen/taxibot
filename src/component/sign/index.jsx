import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';

function SignUpComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    passport_photo: null,
    prava_photo: null,
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; 

      if (!validTypes.includes(file.type)) {
        setError('Fayl turi noto‘g‘ri. Faqat rasm fayllari (jpeg, png, gif) qabul qilinadi.');
        return;
      }

      if (file.size > maxSize) {
        setError('Fayl hajmi juda katta. Maksimal hajm 5MB.');
        return;
      }
      setError('');
      setFormData({
        ...formData,
        [name]: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone_number, first_name, last_name, passport_photo, prava_photo, password } = formData;

    if (!phone_number || !first_name || !last_name || !password) {
      setError('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('phone_number', phone_number);
    formDataToSend.append('first_name', first_name);
    formDataToSend.append('last_name', last_name);
    formDataToSend.append('passport_photo', passport_photo);
    formDataToSend.append('prava_photo', prava_photo);
    formDataToSend.append('password', password);
    formDataToSend.append('balance', 0);

    try {
      const response = await axios.post(
        'https://samarqandtaksi.pythonanywhere.com/users/register/',
        formDataToSend
      );

      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setError('Ro‘yxatdan o‘tishda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Ro'yxatdan o'tish!</h2>
        <div className={styles.box}>
          <span className={styles.span}>Akkauntingiz bormi?</span>
          <span className={styles.link} onClick={() => navigate('/')}>Kirish</span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Telefon raqamingiz</label>
          <input
            type="number"
            name="phone_number"
            placeholder="+998"
            className={styles.input}
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Ismingiz</label>
          <input
            type="text"
            name="first_name"
            placeholder="Ismingizni kiriting"
            className={styles.input}
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Familiyangiz</label>
          <input
            type="text"
            name="last_name"
            placeholder="Familiyangizni kiriting"
            className={styles.input}
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Pasport fotosurati</label>
          <div className={styles.fileButtonWrapper}>
            <input
              type="file"
              name="passport_photo"
              className={styles.input}
              id="passport_photo"
              onChange={handleFileChange}
              style={{ display: 'none' }}  
            />
            <label htmlFor="passport_photo" className={styles.customFileButton}>
              Faylni tanlang
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Haydovchilik guvohnomasi fotosurati</label>
          <div className={styles.fileButtonWrapper}>
            <input
              type="file"
              name="prava_photo"
              className={styles.input}
              id="prava_photo"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="prava_photo" className={styles.customFileButton}>
              Faylni tanlang
            </label>
          </div>
        </div>

        {error && <span className={styles.errorText}>{error}</span>}

        {isLoading ? (
          <span>Yuklanmoqda...</span>
        ) : (
          <button type="submit" className={styles.submitButton}>
            Ro'yxatdan o'tish
          </button>
        )}
      </form>
    </div>
  );
}

export default SignUpComponent;
