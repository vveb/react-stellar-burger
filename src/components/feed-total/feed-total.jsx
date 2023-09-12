import React from 'react';
import { useMemo } from 'react';
import styles from './feed-total.module.css';
import { useSelector } from 'react-redux';
import { allIngredientsSelector } from '../../services/store/selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedTotal = ({ ingredients }) => {

  const allIngredients = useSelector(allIngredientsSelector);

  const totalSum = useMemo(() => {
    if (allIngredients) {
      // bunId и bunPrice борятся с двойным подсчетом цены булок для разных логик конструктора
      // Как бы ни был реализован конструктор (добавляет в массив ингредиентов только одну или две булки),
      // ее цена будет посчитана всегда как за две булки (одна сверху, вторая снизу)
      const bunId = ingredients.find((item) => allIngredients[item]?.type === 'bun');
      const bunPrice = bunId ? allIngredients[bunId].price * 2 : 0;
      return ingredients.reduce((acc, item) => {
        const ingredient = allIngredients[item];
        return ingredient.type === 'bun' ? acc : acc + ingredient.price;
      }, bunPrice);
    };
  }, [ingredients, allIngredients]);

  return (
    <div className={styles.totalPrice}>
      <p className={styles.amount}>{totalSum}</p>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default React.memo(FeedTotal);