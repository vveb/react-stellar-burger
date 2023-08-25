
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authorization-pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../services/hooks/use-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../services/store/user-slice';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({email: '', password: ''});

  const isLoginPending = useSelector((store) => store.api.isLoginPending);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUserThunk(values));
    navigate('/');
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} name='login-form' onSubmit={onSubmit}>
        <EmailInput extraClass={styles.input} name='email' value={values.email} onChange={handleChange} required />
        <PasswordInput extraClass={styles.input} name='password' value={values.password} onChange={handleChange} required/>
        <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>{isLoginPending ? 'Минутку...' : 'Войти'}</Button>
      </form>
      <p className={styles.helpText}>Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
      <p className={styles.helpText}>Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
    </main>
  )
};

export default LoginPage;