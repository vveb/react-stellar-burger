import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from '../bun/bun';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import TotalPrice from '../total-price/total-price';
import Others from '../others/others';
import { resetOrderId } from '../../services/store/actions/modals-action-creators';
import getOrderNumber from '../../services/store/thunks/get-order-number';
import { addBun, addOther } from '../../services/store/actions/current-burger-action-creators';
import { nanoid } from 'nanoid';


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const isOrderPending = useSelector((store) => store.api.isOrderPending);
  const { bun, others } = useSelector((store) => store.currentBurger);
  const orderId = useSelector((store) => store.modals.orderId);

  // Это дополнительный стейт для управления закрытием модального окна элементами, не принадлежащими компоненту Modal
  const [isCloseRequested, setIsCloseRequested] = useState(false);
  
  const handleDrop = (itemData) => {
    if (itemData.type === 'bun') {
      dispatch(addBun({...itemData, uniqueId: nanoid(8)}));
    } else {
      dispatch(addOther({...itemData, uniqueId: nanoid(8)}));
    }
  }

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredientCard',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(itemData) {
      handleDrop(itemData);
    }
  });

  const assignOrderNumber = (bun, others) => {
    const allIngredientsId = {ingredients: others.map(item => item._id)};
    if (bun) {
      allIngredientsId.ingredients = [bun._id, ...allIngredientsId.ingredients, bun._id];
    }
    dispatch(getOrderNumber(allIngredientsId));
  };

  const placeAnOrder = () => {
    if (bun || others.length > 0) {
      assignOrderNumber(bun, others);
    }
  };

  const resetOrderModal = useCallback(() => {
    dispatch(resetOrderId());
    setIsCloseRequested(false);
  }, [dispatch]);

  return (
    <section className={styles.section} ref={dropRef}>
      <div className={`${styles.table} ${isHover && styles.onHover}`}>
        {bun && <Bun ingredient={bun} type='top' extraClass={styles.bordIngredient} />}
        {!bun && <div className={styles.bunStub} />}
        <Others ingredientsList={others} />
        {bun && <Bun ingredient={bun} type='bottom' extraClass={styles.bordIngredient} />}
        {!bun && <div className={styles.bunStub} />}
      </div>
      <footer className={styles.total}>
        <TotalPrice />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={placeAnOrder}
          disabled={!bun && others.length < 1}>
          {isOrderPending ? 'Минутку...' : 'Оформить заказ'}
        </Button>
      </footer>
      {orderId &&
      <Modal extraClass='pt-10 pr-10 pb-30 pl-10' handleCleanModalData={resetOrderModal} closeRequest={isCloseRequested}>
        <OrderDetails handleCloseRequest={setIsCloseRequested} orderId={orderId} />
      </Modal>}
    </section>
  );
};

export default BurgerConstructor;