import React from 'react';
import styles from './feed-list.module.css';
import FeedItem from '../feed-item/feed-item';
import { booleanPropType, stringPropType } from '../../utils/prop-types';

const FeedList = ({ widthSize = '860px', gapSize = '16px', isPrivate = false, ordersData }) => {

  if (!ordersData) {
    return null;
  };

  let orders;
  if (isPrivate) {
    orders = [...ordersData].reverse();
  } else {
    orders = [...ordersData];
  };

  return (
    <ul style={{maxWidth: widthSize, rowGap: gapSize}} className={styles.list}>
      {orders.map((item) => (<FeedItem orderData={item} isPrivate={isPrivate} key={item.number}/>))}
    </ul>
  );
};

FeedList.propTypes = {
  widthSize: stringPropType,
  gapSize: stringPropType,
  isPrivate: booleanPropType,
};

export default React.memo(FeedList);