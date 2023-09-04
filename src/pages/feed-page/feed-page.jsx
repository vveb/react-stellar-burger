import FeedList from '../../components/feed-list/feed-list';
import OrderNumbersTable from '../../components/order-numbers-table/order-numbers-table';
import styles from './feed-page.module.css';
import {data} from '../../utils/feed-data';
import OrderCounter from '../../components/order-counter/order-counter';

const FeedPage = () => {

  if (!data) {
    return null;
  }

  const amountTotal = data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const amountTotalToday = data.totalToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const readyNumbers = [111111,222222,33333,444444,555555,666666,777777,888888,999999, null, null, 123456, 5555]
  
  // const readyNumbers = data.orders.map((item) => item.status === 'done' ? item.number : null);
  const inProgressNumbers = data.orders.map((item) => item.status === 'pending' ? item.number : null);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Лента заказов</h2>
      <div className={styles.twoColumns}>
        <FeedList widthSize='600px' gapSize='16px'/>
        <div className={styles.ordersTable}>
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
        </div>
      </div>
    </main>
  );
};

export default FeedPage;