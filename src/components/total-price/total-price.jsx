import React from 'react';
import { useSelector } from 'react-redux';
import styles from './total-price.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = () => {
  const currentBurger = useSelector((store) => store.currentBurger);

  const totalSum = React.useMemo(() => {
    const bunPrice = currentBurger.bun ? currentBurger.bun.price * 2 : 0;
    return currentBurger.others.reduce((acc, item) => {
      return acc + item.price
    }, bunPrice);
  }, [currentBurger.bun, currentBurger.others])

  return (
    <div className={styles.totalPrice}>
      <p className={styles.price}>{totalSum}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

export default React.memo(TotalPrice);