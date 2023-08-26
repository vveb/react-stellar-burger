import { NavLink, useMatch } from 'react-router-dom';
import styles from './profile-page.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../services/hooks/use-form';
import { useState } from 'react';

const ProfilePage = () => {

  const isProfileActive = useMatch('/profile');
  const isOrdersStoryActive = useMatch('/profile/orders/');

  const [nameDisabledField, setNameDisabledField] = useState(true);
  const [nameIconField, setNameIconField] = useState('EditIcon')
  const onEditNameClick = () => {
    setNameDisabledField(!nameDisabledField);
    setNameIconField(nameDisabledField ? 'CloseIcon' : 'EditIcon');
    const currentInput = document.getElementById('name');
    if (nameDisabledField) {
      console.log('focus')
      currentInput.focus();
    } else {
      console.log('blur')
      currentInput.blur();
    }
  }

  const {values, errorTexts, isErrors, handleChange} = useForm({
    email: '',
    password: '',
    name: '',
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
        <form className={styles.form}>
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
            disabled
          />
          <div className={styles.controlsBox}>
            <Button type='secondary' size='large' htmlType='reset' extraClass={styles.resetButton}>Отмена</Button>
            <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>Сохранить</Button>
          </div>
        </form>
      </main>
    </>
  )
}

export default ProfilePage;