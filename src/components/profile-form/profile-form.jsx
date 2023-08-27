import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-form.module.css';
import { useCallback, useMemo, useState } from 'react';
import useForm from '../../services/hooks/use-form';
import { updateProfileInfoThunk } from '../../services/store/user-slice';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileForm = () => {

  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.user);
  const { isUpdateProfileInfoPending } = useSelector((store) => store.api);

  const [nameDisabledField, setNameDisabledField] = useState(true);
  const [nameIconField, setNameIconField] = useState('EditIcon');
  const handleEditNameClick = useCallback(() => {
    setNameDisabledField(!nameDisabledField);
    setNameIconField(nameDisabledField ? 'CloseIcon' : 'EditIcon');
    const currentInput = document.getElementById('name');
    // console.dir(currentInput.closest('.input'))
    // console.dir(currentInput)
    //QUESTION: почему-то не срабатывает фокус =(
    if (nameDisabledField) {
      // console.log('focus')
      // currentInput.closest('.input').classList.add('input_status_active');
      // currentInput.closest('.input').focus()
      currentInput.focus();
    } else {
      // console.log('blur')
      // currentInput.closest('.input').blur();
      currentInput.blur();
    }
  }, [nameDisabledField]);

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

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateProfileInfoThunk(values));
  }, [dispatch, values]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={resetForm}>
      <Input
        // extraClass={styles.input}
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
        disabled = {nameDisabledField}
      />
      <EmailInput
        // extraClass={styles.input}
        name='email'
        value={values.email}
        onChange={handleChange}
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        // extraClass={styles.input}
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