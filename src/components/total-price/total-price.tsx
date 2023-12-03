import { useMemo } from 'react';
import styles from './total-price.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/store/store';

const TotalPrice = () => {
  const {bun, others} = useSelector((store) => store.currentBurger);

  const totalSum = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return others.reduce((acc, item) => {
      return acc + item.price
    }, bunPrice);
  }, [bun, others]);

  return (
    <div className={styles.totalPrice}>
      <p className={styles.price}>{totalSum}</p>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default TotalPrice;