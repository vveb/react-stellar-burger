import React from 'react';
import styles from './nutrition-value.module.css';

type NutritionValueProps = {
  title: string;
  amount: number;
};

const NutritionValue = ({ title, amount }: NutritionValueProps) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  );
};

export default React.memo(NutritionValue);