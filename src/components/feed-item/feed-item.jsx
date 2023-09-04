import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from '../../utils/constants';
import FeedImages from '../feed-images/feed-images';
import styles from './feed-item.module.css';

const FeedItem = ({ orderData, isPrivate }) => {

  const { createdAt, ingredients, number, status, name } = orderData;
  const allIngredients = useSelector((store) => store.ingredients.data)?.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});

  const totalSum = useMemo(() => {
    if (allIngredients) {
      // bunId и bunPrice борятся с двойным подсчетом цены булок для разных логик конструктора
      // Как бы ни был реализован конструктор (добавляет в массив ингредиентов только одну или две булки),
      // ее цена будет посчитана всегда как за две булки (одна сверху, вторая снизу)
      const bunId = ingredients.find((item) => allIngredients[item].type === 'bun');
      const bunPrice = bunId ? allIngredients[bunId].price * 2 : 0;
      return ingredients.reduce((acc, item) => {
        const ingredient = allIngredients[item];
        return ingredient.type === 'bun' ? acc : acc + ingredient.price;
      }, bunPrice);
    };
  }, [ingredients, allIngredients]);

  return (
    <li className={styles.listItem}>
      <div className={styles.techInfo}>
        <p className={styles.id}>{`#${number}`}</p>
        <FormattedDate className={styles.date} date={new Date(createdAt)} />
      </div>
      <p className={styles.name}>{name}</p>
      {isPrivate && <p className={styles.status}>{orderStatus[status]}</p>}
      <div className={styles.totalInfo}>
        <FeedImages ingredients={ingredients} />
        <div className={styles.totalPrice}>
          <p className={styles.amount}>{totalSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </li>
  )
};

export default FeedItem;