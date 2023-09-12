import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus, orderStatusColor } from '../../utils/constants';
import FeedImages from '../feed-images/feed-images';
import styles from './feed-item.module.css';
import { booleanPropType, orderPropType } from '../../utils/prop-types';
import FeedTotal from '../feed-total/feed-total';
import { setCurrentOrderInfo } from '../../services/store/ui-slice';
import { useMemo } from 'react';
import { allIngredientsSelector } from '../../services/store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';

const FeedItem = ({ orderData, isPrivate }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { createdAt, ingredients, number, status, name } = orderData;
  const allIngredients = useSelector(allIngredientsSelector);
  const validatedIngredients = useMemo(() =>
  ingredients?.filter((item) => !!item && allIngredients[item] !== undefined), [ingredients, allIngredients]);

  const handleOrderClick = () => {
    dispatch(setCurrentOrderInfo(orderData));
    const path = isPrivate ?`/profile/orders/${orderData.number}` : `/feed/${orderData.number}`
    navigate(path, { state: { background: location } })
  };
  
  return (
    <li className={styles.listItem} role='button' onClick={handleOrderClick}>
      <div className={styles.techInfo}>
        <p className={styles.id}>{`#${number}`}</p>
        <FormattedDate className={styles.date} date={new Date(createdAt)} />
      </div>
      <p className={styles.name}>{name}</p>
      {isPrivate && <p className={styles.status} style={{color: orderStatusColor[status]}}>{orderStatus[status]}</p>}
      <div className={styles.totalInfo}>
        <FeedImages ingredients={validatedIngredients} />
        <FeedTotal ingredients={validatedIngredients} />
      </div>
    </li>
  )
};

FeedItem.propTypes = {
  orderData: orderPropType.isRequired,
  isPrivate: booleanPropType.isRequired,
};

export default React.memo(FeedItem);