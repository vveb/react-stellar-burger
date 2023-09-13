import React from 'react';
import { stringPropType } from '../../utils/prop-types';
import styles from './order-counter.module.css';

const OrderCounter = ({ type, titleText, amount }) => {

  return (
    <div style={{gridArea: `${type}`}}>
      <p className={styles.title}>{titleText}:</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  );
};

OrderCounter.propTypes = {
  type: stringPropType.isRequired,
  titleText: stringPropType.isRequired,
  amount: stringPropType.isRequired,
}

export default React.memo(OrderCounter);