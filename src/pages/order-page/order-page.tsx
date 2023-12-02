import styles from './order-page.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearCurrentOrderInfo, getOrderInfoThunk } from '../../services/store/ui-slice';
import OrderInfo from '../../components/order-info/order-info';
import Preloader from '../../components/preloader/preloader';
import { useDispatch, useSelector } from '../../services/store/store';

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
    return (<Preloader />);
  };

  return (
    <main className={styles.main}>
      <OrderInfo orderData={currentOrderInfo} />
    </main>
  );
};

export default OrderPage;