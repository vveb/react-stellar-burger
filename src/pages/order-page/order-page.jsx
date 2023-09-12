import { useDispatch, useSelector } from 'react-redux';
import styles from './order-page.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearCurrentOrderInfo, getOrderInfoThunk } from '../../services/store/ui-slice';
import OrderInfo from '../../components/order-info/order-info';

const OrderPage = () => {

  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state && location.state.background;
  const { number } = useParams();
  const currentOrderInfo = useSelector((store) => store.ui.currentOrderInfo);

  useEffect(() => {
    dispatch(getOrderInfoThunk({number}));
    return () => {
      dispatch(clearCurrentOrderInfo());
    }
  }, [dispatch, number]);

  if (!currentOrderInfo || background) {
    return null;
  };

  return (
    <main className={styles.main}>
      <OrderInfo orderData={currentOrderInfo} />
    </main>
  );
};

export default OrderPage;