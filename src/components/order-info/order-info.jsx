import { useMemo } from 'react';
import { allIngredientsSelector } from '../../services/store/selectors';
import styles from './order-info.module.css';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedTotal from '../feed-total/feed-total';
import { orderStatus, orderStatusColor } from '../../utils/constants';
import { booleanPropType, orderPropType } from '../../utils/prop-types';

const OrderInfo = ({ orderData, isModal=false }) => {

  const { number, name, status, ingredients, createdAt } = orderData;

  const allIngredients = useSelector(allIngredientsSelector);
  const validatedIngredients = useMemo(() =>
  ingredients?.filter((item) => !!item && !!allIngredients && allIngredients[item] !== undefined), [ingredients, allIngredients]);

  const uniqueIngredients = useMemo(() => {
    if(!validatedIngredients) {
      return [];
    };
    return Array.from(new Set(validatedIngredients))?.map((item) => ({ id: item, key: nanoid(8) }));
  }, [validatedIngredients]);

  const ingredientsCount = useMemo(() => {
    if(!validatedIngredients) {
      return {};
    };
    return validatedIngredients.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }, [validatedIngredients]);

  if (!allIngredients || !validatedIngredients || !orderData) {
    return null;
  };

  return (
    <>
      {!isModal && <h2 className={styles.number}>#{number}</h2>}
        <p className={styles.name}>{name}</p>
        <p className={styles.status} style={{color: orderStatusColor[status]}}>{orderStatus[status]}</p>
        <p className={styles.contents}>Состав:</p>
        <ul className={styles.list}>
          {uniqueIngredients.map((item) => {
            return (
              <li className={styles.listItem} key={item.key}>
                <div className={styles.imageBack}>
                  <img className={styles.image} src={allIngredients[item.id].image_mobile} alt={allIngredients[item.id].name}/>
                </div>
                <p className={styles.ingredientName}>{allIngredients[item.id].name}</p>
                <div className={styles.priceBox}>
                  <p className={styles.amount}>{`${ingredientsCount[item.id]} x ${allIngredients[item.id].price}`}</p>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            )
          })}
        </ul>
        <div className={styles.techInfo}>
          <FormattedDate className={styles.date} date={new Date(createdAt)} />
          <FeedTotal ingredients={validatedIngredients} />
        </div>
    </>
  );
};

OrderInfo.propTypes = {
  orderData: orderPropType.isRequired,
  isModal: booleanPropType,
}

export default OrderInfo;