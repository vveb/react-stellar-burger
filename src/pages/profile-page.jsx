import { NavLink, useMatch } from 'react-router-dom';
import styles from './profile-page.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../services/hooks/use-form';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfoThunk } from '../services/store/user-slice';

const ProfilePage = () => {

  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.user);

  const isProfileActive = useMatch('/profile');
  const isOrdersStoryActive = useMatch('/profile/orders/');

  const [nameDisabledField, setNameDisabledField] = useState(true);
  const [nameIconField, setNameIconField] = useState('EditIcon')
  
  const onEditNameClick = useCallback(() => {
    setNameDisabledField(!nameDisabledField);
    setNameIconField(nameDisabledField ? 'CloseIcon' : 'EditIcon');
    const currentInput = document.getElementById('name');
    console.dir(currentInput)
    if (nameDisabledField) {
      console.log('focus')
      currentInput.focus();
    } else {
      console.log('blur')
      currentInput.blur();
    }
  }, []);

  const {values, errorTexts, isErrors, handleChange, resetForm} = useForm({
    email,
    password: '',
    name,
  });

  const isFormChanged = useMemo(() => 
  (name !== values.name && values.name) ||
  (email !== values.email && values.email) ||
  values.password,
  [name, values.name, email, values.email, values.password]
  );

  const onSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateProfileInfoThunk(values));
  });


  return (
    <>
      <main className={styles.main}>
        <div className={styles.menuBox}>
          <ul className={styles.menuLinks}>
            <li>
              <NavLink className={isProfileActive ? styles.menuItem : styles.menuItem_inactive}>Профиль</NavLink>
            </li>
            <li>
            <NavLink className={isOrdersStoryActive ? styles.menuItem : styles.menuItem_inactive}>История заказов</NavLink>
            </li>
            <li>
            <NavLink className={styles.menuItem_inactive}>Выход</NavLink>
            </li>
          </ul>
          <p className={styles.infoText}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
        <form className={styles.form} onSubmit={onSubmit} onReset={resetForm}>
          <Input
            extraClass={styles.input}
            id='name'
            name='name'
            onChange={handleChange}
            value={values.name}
            placeholder='Имя'
            type='text'
            minLength='2'
            maxLength='30'
            errorText={errorTexts.name}
            error={isErrors.name}
            icon={nameIconField}
            onIconClick={onEditNameClick}
            disabled = {nameDisabledField}
          />
          <EmailInput
            extraClass={styles.input}
            name='email'
            value={values.email}
            onChange={handleChange}
            placeholder='Логин'
            isIcon={true}
          />
          <PasswordInput
            extraClass={styles.input}
            name='password'
            onChange={handleChange}
            value={values.password}
            icon='EditIcon'
          />
          {isFormChanged && <div className={styles.controlsBox}>
            <Button type='secondary' size='large' htmlType='reset' extraClass={styles.resetButton}>Отмена</Button>
            <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>Сохранить</Button>
          </div>}
        </form>
      </main>
    </>
  )
}

export default ProfilePage;