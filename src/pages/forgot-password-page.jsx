import React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authorization-pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordThunk } from '../services/store/user-slice';
import useForm from '../services/hooks/use-form';

const ForgotPasswordPage = () => {

  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const {values, handleChange} = useForm({ email: '' });

  const isUpdatePasswordPending = useSelector((store) => store.api.isUpdatePasswordPending)

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updatePasswordThunk(values));
    navigate('/reset-password');
  };

  return(
    <main className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} name='login-form' onSubmit={onSubmit}>
        <EmailInput
          extraClass={styles.input}
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Укажите e-mail'
          required />
        <Button
          type='primary'
          size='large'
          htmlType='submit'
          extraClass={styles.submitButton}>
            {isUpdatePasswordPending ? 'Минутку...' : 'Восстановить'}
        </Button>
      </form>
      <p className={styles.helpText}>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </main>
  );
};

export default ForgotPasswordPage;