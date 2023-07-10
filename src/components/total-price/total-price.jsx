import React from 'react';
import {IngredientsListContext} from '../../contexts/ingredients-list-context';
import styles from './total-price.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = () => {
  const ingredientsList = React.useContext(IngredientsListContext);

  const totalSum = React.useMemo(() => {
    const bunPrice = ingredientsList.bun ? ingredientsList.bun.price * 2 : 0;
    return ingredientsList.others.reduce((acc, item) => {
      return acc + item.price
    }, bunPrice);
  }, [ingredientsList.bun, ingredientsList.others])

  return (
    <div className={styles.totalPrice}>
      <p className={styles.price}>{totalSum}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

export default TotalPrice;