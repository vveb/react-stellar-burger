import styles from './order-counter.module.css';

const OrderCounter = ({ type, titleText, amount }) => {

  return (
    <div style={{gridArea: `${type}`}}>
      <p className={styles.title}>{titleText}:</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  );
};

export default OrderCounter;