import React from 'react';
import { ApiStateContext, CurrentBurgerContext } from '../../contexts';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from '../bun/bun';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import TotalPrice from '../total-price/total-price';
import Api from '../../utils/api';
import Others from '../others/others';
import { orderFailed, orderPending, orderPlaced } from '../../utils/action-creators'

const BurgerConstructor = () => {
  const { apiState, apiStateDispatcher } = React.useContext(ApiStateContext);
  const { currentBurger, currentBurgerDispatcher } = React.useContext(CurrentBurgerContext);
  const { bun, others } = currentBurger;

  const [orderId, setOrderId] = React.useState(null);

  // Это дополнительный стейт для управления закрытием модального окна элементами, не принадлежащими компоненту Modal
  const [isCloseRequested, setIsCloseRequested] = React.useState(false);

  const assignOrderNumber = (bun, others) => {

    const allIngredientsId = {ingredients: others.map(item => item._id)};
    if (bun) {
      allIngredientsId.ingredients = [bun._id, ...allIngredientsId.ingredients, bun._id];
    }
    apiStateDispatcher(orderPending());
    Api.addNewOrder(allIngredientsId)
    .then((data) => {
      apiStateDispatcher(orderPlaced());
      setOrderId(data.order.number);
      currentBurgerDispatcher({type: 'reset'});
    })
    .catch((err) => {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      apiStateDispatcher(orderFailed(`Ошибка при отправке заказа: ${errorText}`));
    })
  };

  const placeAnOrder = () => {
    if (bun || others.length > 0) {
      assignOrderNumber(bun, others);
    }
  };

  const resetOrderModal = React.useCallback((value) => {
    setOrderId(value);
    setIsCloseRequested(false);
  });

  return (
    <>
      <div className={styles.table}>
        {bun && <Bun ingredient={bun} type='top' extraClass={styles.bordIngredient} />}
        <Others ingredientsList={others} />
        {bun && <Bun ingredient={bun} type='bottom' extraClass={styles.bordIngredient} />}
        <div className={styles.total}>
          <TotalPrice />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={placeAnOrder}
            disabled={!bun && others.length < 1}>
            {apiState.isOrderPending ? 'Минутку...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>
      {orderId &&
      <Modal extraClass='pt-10 pr-10 pb-30 pl-10' handleCleanModalData={resetOrderModal} closeRequest={isCloseRequested}>
        <OrderDetails handleCloseRequest={setIsCloseRequested} orderId={orderId} />
      </Modal>}
    </>
  );
};

export default React.memo(BurgerConstructor);