import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './authorization-pages.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../services/hooks/use-form';
import { registerNewUserThunk } from '../../services/store/user-slice';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, errorTexts, isErrors, handleChange} = useForm({
    email: '',
    password: '',
    name: '',
  });

  const isRegistrationPending = useSelector((store) => store.api.isRegistrationPending);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerNewUserThunk(values));
    navigate('/');
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} name='register-form' onSubmit={onSubmit}>
        <Input
          extraClass={styles.input}
          name='name'
          onChange={handleChange}
          value={values.name}
          placeholder='Имя'
          type='text'
          minLength='2'
          maxLength='30'
          errorText={errorTexts.name}
          error={isErrors.name}
          required
        />
        <EmailInput extraClass={styles.input} name='email' value={values.email} onChange={handleChange} required />
        <PasswordInput extraClass={styles.input} name='password' onChange={handleChange} value={values.password} required />
        <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>{isRegistrationPending ? 'Минутку...' : 'Зарегистрироваться'}</Button>
      </form>
      <p className={styles.helpText}>Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link></p>
    </main>
  );
};

export default RegisterPage;