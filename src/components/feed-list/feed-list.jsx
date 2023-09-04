import { useMatch } from 'react-router';
import styles from './feed-list.module.css';
import FeedItem from '../feed-item/feed-item';
import {data} from '../../utils/feed-data.js'

const FeedList = ({ widthSize, gapSize }) => {

  const isPrivate = !!useMatch('/profile/orders');

  return (
    <ul style={{maxWidth: widthSize, rowGap: gapSize}} className={styles.list}>
      {data.orders.map((item) => (<FeedItem orderData={item} isPrivate={isPrivate} key={item.number}/>))}
    </ul>
  );
};

export default FeedList;