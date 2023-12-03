import { FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './authorization-pages.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/use-form';
import { loginUserThunk } from '../../services/store/user-slice';
import { isLoggedInSelector } from '../../services/store/selectors';
import { useDispatch, useSelector } from '../../services/store/store';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { values, handleChange } = useForm({email: '', password: ''});

  const isLoginPending = useSelector((store) => store.api.isLoginPending);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginUserThunk(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location.state?.from ?? '/');
    };
  }, [isLoggedIn, navigate, location.state?.from]);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} name='login-form' onSubmit={handleSubmit}>
        <EmailInput extraClass={styles.input} name='email' value={values.email} onChange={handleChange} required />
        <PasswordInput extraClass={styles.input} name='password' value={values.password} onChange={handleChange} required/>
        <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>{isLoginPending ? 'Минутку...' : 'Войти'}</Button>
      </form>
      <p className={styles.helpText}>Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
      <p className={styles.helpText}>Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
    </main>
  );
};

export default LoginPage;