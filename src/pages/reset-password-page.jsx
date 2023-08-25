
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authorization-pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../services/hooks/use-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '../services/store/user-slice';

const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({password: '', token: ''});

  const isResetPasswordPending = useSelector((store) => store.api.isLoginPending);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPasswordThunk(values));
    navigate('/');
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} name='reset-password-form' onSubmit={onSubmit}>
        <PasswordInput extraClass={styles.input} name='password' value={values.password} onChange={handleChange} placeholder='Введите новый пароль' required/>
        <Input
          extraClass={styles.input}
          name='token'
          value={values.token}
          onChange={handleChange}
          placeholder='Введите код из письма'
          required
        />
        <Button
          type='primary'
          size='large'
          htmlType='submit'
          extraClass={styles.submitButton}>
            {isResetPasswordPending ? 'Минутку...' : 'Сохранить'}
        </Button>
      </form>
      <p className={styles.helpText}>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </main>
  )
};

export default ResetPasswordPage;