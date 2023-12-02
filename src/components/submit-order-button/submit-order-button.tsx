import React from 'react';
import styles from './submit-order-button.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { functionPropType } from '../../utils/prop-types';

type SubmitOrderButtonProps = {
  handleCloseRequest: (value: boolean) => never;
};

const SubmitOrderButton = ({ handleCloseRequest }: SubmitOrderButtonProps) => {

  const handleClose = () => {
    handleCloseRequest(true);
  };

  return (
    <div onClick={handleClose} role='button' className={styles.submit}>
      <CheckMarkIcon type='primary' />
      <div className={`${styles.polygonBack} ${styles.scaleRotation}`}></div>
      <div className={`${styles.polygonMiddle} ${styles.scaleRotationSmooth}`}></div>
      <div className={`${styles.polygonFront} ${styles.scaleRotationReverse}`}></div>
    </div>
  );
};

SubmitOrderButton.propTypes = {
  handleCloseRequest: functionPropType.isRequired,
};

export default React.memo(SubmitOrderButton);