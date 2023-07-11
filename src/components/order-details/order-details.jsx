import React from 'react';
import styles from './order-details.module.css';
import SubmitOrderButton from '../submit-order-button/submit-order-button';
import { numberPropType } from '../../utils/prop-types'

const OrderDetails = React.forwardRef(({ orderId }, onCloseRef) => {
  return (
    <>
      <p className={styles.id}>{orderId}</p>
      <p className={styles.captionId}>идентификатор заказа</p>
      <SubmitOrderButton ref={onCloseRef} />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.captionOrderStatus}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
})

OrderDetails.propTypes = {
  orderId: numberPropType,
}

export default OrderDetails;