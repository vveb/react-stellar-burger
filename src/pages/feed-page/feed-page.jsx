import FeedList from '../../components/feed-list/feed-list';
import OrderNumbersTable from '../../components/order-numbers-table/order-numbers-table';
import styles from './feed-page.module.css';
import OrderCounter from '../../components/order-counter/order-counter';
import { useDispatch, useSelector } from 'react-redux';
import { publicFeedStart, publicFeedStop } from '../../services/store/feed-slice';
import { useEffect } from 'react';

const FeedPage = () => {

  const dispatch = useDispatch();
  const isPublicFeedOpen = useSelector((store) => store.api.isPublicFeedOpen)

  useEffect(() => {
    if (!isPublicFeedOpen) {
      dispatch(publicFeedStart());
    };
    return () => dispatch(publicFeedStop());
  }, [dispatch]);

  const { total, totalToday, orders } = useSelector((store) => store.feed.publicFeedData) ?? {};

  if (!total || !totalToday || !orders) {
    return null;
  };

  const amountTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const amountTotalToday = totalToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  const readyNumbers = orders.map((item) => item.status === 'done' ? item.number : null).slice(0, 15);
  const inProgressNumbers = orders.map((item) => item.status === 'pending' ? item.number : null).slice(0, 15);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Лента заказов</h2>
      <div className={styles.twoColumns}>
        <FeedList widthSize='600px' gapSize='16px' ordersData={orders}/>
        {<div className={styles.ordersTable}>
          <OrderNumbersTable
            type='ready'
            titleText='Готовы'
            numbersClass={styles.ready}
            orderNumbers={readyNumbers}
          />
          <OrderNumbersTable
            type='progress'
            titleText='В работе'
            numbersClass={styles.inProgress}
            orderNumbers={inProgressNumbers}
          />
          <OrderCounter type='all' titleText='Выполнено за все время' amount={amountTotal} />
          <OrderCounter type='today' titleText='Выполнено за сегодня' amount={amountTotalToday} />
        </div>}
      </div>
    </main>
  );
};

export default FeedPage;