import React from 'react';
import {CurrentBurgerContext} from '../../contexts/current-burger-context';
import styles from './total-price.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = () => {
  const { currentBurger } = React.useContext(CurrentBurgerContext);

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

export default TotalPrice;