import styles from './order-numbers-table.module.css';

const OrderNumbersTable = ({ titleText, numbersClass, orderNumbers, type }) => {

  return (
    <div className={styles.table} style={{gridArea: `${type}`}}>
      <p className={styles.title}>{titleText}:</p>
      <div className={styles.numbers}>
        {orderNumbers.map((number) => number && <p className={numbersClass} key={number}>{number}</p>)}
      </div>
    </div>
  );
};

export default OrderNumbersTable;