import React from 'react';
import {CurrentBurgerContext} from '../../contexts';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from '../bun/bun';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import TotalPrice from '../total-price/total-price';
import Api from '../../utils/api';
import Others from '../others/others';

const BurgerConstructor = () => {
  const { currentBurger, currentBurgerDispatcher } = React.useContext(CurrentBurgerContext);
  const { bun, others } = currentBurger;
  const [orderLoading, setOrderLoading] = React.useState(false);

  const [orderId, setOrderId] = React.useState(null);

  const [isCloseRequested, setIsCloseRequested] = React.useState(false);

  const assignOrderNumber = (bun, others) => {
    // Не решил, какая из записей лучше - эта...

    // const allIngredientsId = bun ? 
    // {ingredients: [bun ? bun._id : null, ...others.map(item => item._id), bun ? bun._id : null]} :
    // {ingredients: [...others.map(item => item._id)]}
    
    //...или эта...
    const allIngredientsId = {ingredients: others.map(item => item._id)};
    if (bun) {
      allIngredientsId.ingredients = [bun._id, ...allIngredientsId.ingredients, bun._id];
    }
    setOrderLoading(true);
    Api.addNewOrder(allIngredientsId)
    .then((data) => {
      setOrderId(data.order.number);
      currentBurgerDispatcher({type: 'reset'});
    })
    .catch((err) => {
      const error = err.statusCode ? err.message : 'Connection trouble, check your network';
      console.log(error);
    })
    .finally(() => setOrderLoading(false))
  };

  const placeAnOrder = () => {
    if (bun || others.length > 0) {
      assignOrderNumber(bun, others);
    }
  };

  const resetOrderModal = React.useCallback((value) => {
    setOrderId(value);
    setIsCloseRequested(false);
  })

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
            {orderLoading ? 'Минутку...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>
      {orderId &&
      <Modal extraClass='pt-10 pr-10 pb-30 pl-10' handleCleanModalData={resetOrderModal} closeRequest={isCloseRequested}>
        <OrderDetails handleCloseRequest={setIsCloseRequested} orderId={orderId} />
      </Modal>}
    </>
  )
}

export default React.memo(BurgerConstructor);