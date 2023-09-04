import { useMatch } from 'react-router';
import styles from './feed-list.module.css';
import FeedItem from '../feed-item/feed-item';
import {data} from '../../utils/feed-data.js'
import { stringPropType } from '../../utils/prop-types';

const FeedList = ({ widthSize = '860px', gapSize = '16px' }) => {

  const isPrivate = !!useMatch('/profile/orders');

  return (
    <ul style={{maxWidth: widthSize, rowGap: gapSize}} className={styles.list}>
      {data.orders.map((item) => (<FeedItem orderData={item} isPrivate={isPrivate} key={item.number}/>))}
    </ul>
  );
};

FeedList.propTypes = {
  widthSize: stringPropType,
  gapSize: stringPropType,
}

export default FeedList;