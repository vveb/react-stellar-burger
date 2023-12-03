import React from 'react';
import styles from './feed-list.module.css';
import FeedItem from '../feed-item/feed-item';
import { Order } from '../../services/types';

type FeedListProps = {
  widthSize?: string,
  gapSize?: string,
  isPrivate?: boolean,
  ordersData: Order[],
}

const FeedList = ({ widthSize = '860px', gapSize = '16px', isPrivate = false, ordersData }: FeedListProps) => {

  let orders: Order[];
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

export default React.memo(FeedList);