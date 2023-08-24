
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const onSubmit = (evt) => {
    evt.preventDefault();
    navigate('/');
  }

  const passInput = document.getElementById('pass-input');
  const passIcon = document.getElementById('pass-icon')
  
  const toggleShowPass = (evt) => {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    passIcon.classList.toggle(styles.showHideButton_inactive)
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.loginForm} name='login-form'>
        <input className={styles.input} type='email' name='email' placeholder='E-mail' required/>
        <div className={styles.passwordInputContainer}>
          <input className={styles.input} id='pass-input' type='password' name='password' placeholder='Пароль' minLength='8' required/>
          <svg className={styles.showHideButton} id='pass-icon' role='button' onClick={toggleShowPass} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6C16.0683 6 18.0293 6.71758 19.7366 8.04606C21.4439 9.36485 22.8976 11.2945 23.9415 13.7091C24.0195 13.8933 24.0195 14.1067 23.9415 14.2812C21.8537 19.1103 18.1366 22 14 22H13.9902C9.86341 22 6.14634 19.1103 4.05854 14.2812C3.98049 14.1067 3.98049 13.8933 4.05854 13.7091C6.14634 8.88 9.86341 6 13.9902 6H14ZM14 10.1212C11.8439 10.1212 10.0976 11.857 10.0976 14C10.0976 16.1333 11.8439 17.8691 14 17.8691C16.1463 17.8691 17.8927 16.1333 17.8927 14C17.8927 11.857 16.1463 10.1212 14 10.1212ZM14.0012 11.5736C15.3378 11.5736 16.4304 12.6597 16.4304 13.9979C16.4304 15.3264 15.3378 16.4124 14.0012 16.4124C12.6548 16.4124 11.5621 15.3264 11.5621 13.9979C11.5621 13.833 11.5817 13.6779 11.6109 13.5227H11.6597C12.7426 13.5227 13.6207 12.6694 13.6597 11.6027C13.767 11.5833 13.8841 11.5736 14.0012 11.5736Z" fill="#F2F2F3"/>
          </svg>
        </div>
        <Button type='primary' size='large' htmlType='submit' onClick={onSubmit} extraClass={styles.submitButton}>Войти</Button>
      </form>
      <p className={styles.helpText}>Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
      <p className={styles.helpText}>Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
    </main>
  )
};

export default LoginPage;