import React from 'react';
import styles from './order-counter.module.css';

type OrderCounterProps = {
  type: string;
  titleText: string;
  amount: string;
}

const OrderCounter = ({ type, titleText, amount }: OrderCounterProps) => {

  return (
    <div style={{gridArea: `${type}`}}>
      <p className={styles.title}>{titleText}:</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  );
};

export default React.memo(OrderCounter);