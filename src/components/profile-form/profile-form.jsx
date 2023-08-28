import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-form.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useForm from '../../services/hooks/use-form';
import { updateProfileInfoThunk } from '../../services/store/user-slice';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileForm = () => {

  const dispatch = useDispatch();
  const storeUser = useSelector((store) => store.user);
  const { name, email } = storeUser;
  const { isGetProfileInfoPending, isUpdateProfileInfoPending, isLoginPending } = useSelector((store) => store.api);

  //Обработка поведения input для имени (потому что готовый компонент Input не работает согласно макету)
  const [nameDisabledField, setNameDisabledField] = useState(true);
  const [nameIconField, setNameIconField] = useState('EditIcon');
  const handleEditNameClick = useCallback(() => {
    setNameDisabledField(!nameDisabledField);
    setNameIconField(nameDisabledField ? 'CloseIcon' : 'EditIcon');
    const currentInput = document.getElementById('name');
    if (nameDisabledField) {
      setTimeout(() => {
        currentInput.focus();
      }, 0);
    }
  }, [nameDisabledField]);

  const handleNameInputBlur = useCallback(() => {
    setNameIconField('EditIcon');
    setNameDisabledField(true);
  }, []);

  const {values, errorTexts, isErrors, handleChange, resetForm, setValues} = useForm({
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

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateProfileInfoThunk(values));
  }, [dispatch, values]);

  //Необходимо для рендеринга данных профиля при медленном соединении
  useEffect(() => {
    console.dir(storeUser)
    if (storeUser) {
      setValues(storeUser)
    }
  }, [storeUser, setValues])

  if (isGetProfileInfoPending || isLoginPending) {
    return (<p className='text text_type_main-medium'>'Идет загрузка данных профиля...'</p>)
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={resetForm}>
      <Input
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
        onIconClick={handleEditNameClick}
        onBlur={handleNameInputBlur}
        disabled = {nameDisabledField}
      />
      <EmailInput
        name='email'
        value={values.email}
        onChange={handleChange}
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        name='password'
        onChange={handleChange}
        value={values.password}
        icon='EditIcon'
      />
      {isFormChanged && <div className={styles.controlsBox}>
        <Button type='secondary' size='large' htmlType='reset' extraClass={styles.resetButton}>Отмена</Button>
        <Button type='primary' size='large' htmlType='submit' extraClass={styles.submitButton}>
          {isUpdateProfileInfoPending ? 'Минутку...' : 'Сохранить'}
        </Button>
      </div>}
    </form>
  )
}

export default ProfileForm;