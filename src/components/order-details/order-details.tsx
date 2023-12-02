import React from 'react';
import styles from './order-details.module.css';
import SubmitOrderButton from '../submit-order-button/submit-order-button';

type OrderDetailsProps = {
  orderId: number;
  handleCloseRequest: () => never;
}

const OrderDetails = ({ orderId, handleCloseRequest }: OrderDetailsProps) => {
  return (
    <>
      <p className={styles.id}>{orderId}</p>
      <p className={styles.captionId}>идентификатор заказа</p>
      <SubmitOrderButton handleCloseRequest={handleCloseRequest} />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.captionOrderStatus}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

export default React.memo(OrderDetails);