import React from 'react';
import styles from './submit-order-button.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const SubmitOrderButton = React.forwardRef((props, onCloseRef) => {

  const handleSubmitOrderClick = () => {
    onCloseRef.current();
  }

  return (
    <div onClick={handleSubmitOrderClick} role='button' className={styles.submit}>
      <CheckMarkIcon type='primary' />
      <div className={`${styles.polygonBack} ${styles.scaleRotation}`}></div>
      <div className={`${styles.polygonMiddle} ${styles.scaleRotationSmooth}`}></div>
      <div className={`${styles.polygonFront} ${styles.scaleRotationReverse}`}></div>
    </div>
  )
})

export default SubmitOrderButton;