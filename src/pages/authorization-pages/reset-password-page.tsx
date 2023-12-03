import { FormEvent, useEffect } from 'react';
import { batch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './authorization-pages.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/use-form';
import { resetPasswordThunk } from '../../services/store/user-slice';
import { setIsPasswordResetRequested } from '../../services/store/ui-slice';
import { useDispatch, useSelector } from '../../services/store/store';

const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({password: '', token: ''});

  const { isResetPasswordPending, isResetPasswordSucceed, isResetPasswordFailed } = useSelector((store) => store.api);
  const isPasswordResetRequested = useSelector((store) => store.ui.isPasswordResetRequested);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    batch(() => {
      dispatch(resetPasswordThunk(values));
      dispatch(setIsPasswordResetRequested());
    });
  };

  //Эффект управляет редиректором на страницу логина только в случае успешного сброса пароля
  useEffect(() => {
    if (isResetPasswordSucceed && !isResetPasswordPending && !isResetPasswordFailed && !isPasswordResetRequested) {
      navigate('/login');
    };
  }, [isResetPasswordPending, isResetPasswordSucceed, isResetPasswordFailed, isPasswordResetRequested, navigate]);

  //Эффект управляет редиректом обратно на страницу "Забыл пароль",
  //если не был успешно завершен запрос на сервер о его сбросе
  useEffect(() => {
    if (!localStorage.getItem('isForgotPasswordSent')) {
      navigate('/forgot-password');
    }
  }, [navigate]);
  

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} name='reset-password-form' onSubmit={handleSubmit}>
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
  );
};

export default ResetPasswordPage;