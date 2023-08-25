import React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authorization-pages.module.css';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  
  const navigate = useNavigate();

  const onSubmit = (evt) => {
    evt.preventDefault();
    navigate('/');
  };

  const [value, setValue] = React.useState('bob@example.com')
  const onChange = e => {
    setValue(e.target.value)
  }
  return(
    <main className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} name='login-form'>
        <EmailInput extraClass={styles.input} value={value} onChange={onChange} placeholder='Укажите e-mail' required />
        <Button type='primary' size='large' htmlType='submit' onSubmit={onSubmit} extraClass={styles.submitButton}>Восстановить</Button>
      </form>
      <p className={styles.helpText}>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </main>
  );
};

export default ForgotPasswordPage;