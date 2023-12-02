import React from 'react';
import styles from './order-numbers-table.module.css';

type OrderNumbersTableProps = {
  titleText: string;
  numbersClass: string;
  orderNumbers: (number | null)[]
  type: string;
};

const OrderNumbersTable = ({ titleText, numbersClass, orderNumbers, type }: OrderNumbersTableProps) => {

  return (
    <div className={styles.table} style={{gridArea: `${type}`}}>
      <p className={styles.title}>{titleText}:</p>
      <div className={styles.numbers}>
        {orderNumbers.map((number) => number && <p className={numbersClass} key={number}>{number}</p>)}
      </div>
    </div>
  );
};

export default React.memo(OrderNumbersTable);