import FeedList from '../../components/feed-list/feed-list';
import OrderNumbersTable from '../../components/order-numbers-table/order-numbers-table';
import styles from './feed-page.module.css';
import OrderCounter from '../../components/order-counter/order-counter';
import { publicFeedStart, publicFeedStop } from '../../services/store/feed-slice';
import { useEffect } from 'react';
import OrderInfo from '../../components/order-info/order-info';
import Modal from '../../components/modal/modal';
import { useNavigate } from 'react-router-dom';
import { clearCurrentOrderInfo } from '../../services/store/ui-slice';
import Preloader from '../../components/preloader/preloader';
import { useDispatch, useSelector } from '../../services/store/store';
import { Order } from '../../services/types';

const FeedPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrderInfo = useSelector((store) => store.ui.currentOrderInfo);

  useEffect(() => {
    dispatch(publicFeedStart());
    return () => { dispatch(publicFeedStop()) };
  }, [dispatch]);

  const { total, totalToday, orders } = useSelector((store) => store.feed.publicFeedData) ?? {};

  if (!total || !totalToday || !orders) {
    return (<Preloader />);
  };

  const amountTotal: string = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const amountTotalToday: string = totalToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  const readyNumbers = orders.map((item) => item.status === 'done' ? item.number : null).slice(0, 30);
  const inProgressNumbers = orders.map((item) => item.status === 'pending' ? item.number : null).slice(0, 30);

  const handleCloseModal = () => {
    navigate('/feed', {state: null});
    dispatch(clearCurrentOrderInfo());
  };

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>Лента заказов</h2>
        <div className={styles.twoColumns}>
          <FeedList widthSize='600px' gapSize='16px' ordersData={orders}/>
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
      {currentOrderInfo &&
        (<Modal
          title={`#${currentOrderInfo.number}`}
          extraClass='pt-10 pr-10 pb-10 pl-10'
          handleCleanModalData={handleCloseModal}
          titleClass='text text_type_digits-default'
        >
          <OrderInfo orderData={currentOrderInfo} isModal />
        </Modal>)
      }
    </>
  );
};

export default FeedPage;