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
import { addBun, addOther } from '../../services/store/current-burger-slice';
import { getOrderNumberThunk, clearOrderId } from '../../services/store/ui-slice';
import { nanoid } from 'nanoid';
import { isLoggedInSelector } from '../../services/store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isOrderPending = useSelector((store) => store.api.isOrderPending);
  const { bun, others } = useSelector((store) => store.currentBurger);
  const { orderId } = useSelector((store) => store.ui);
  const isLoggedIn = useSelector(isLoggedInSelector);

  // Это дополнительный стейт для управления закрытием модального окна элементами, не принадлежащими компоненту Modal
  const [isCloseRequested, setIsCloseRequested] = useState(false);
  
  const handleDrop = (itemData) => {
    if (itemData.type === 'bun') {
      dispatch(addBun({bun: {...itemData, uniqueId: nanoid(8)}}));
    } else {
      dispatch(addOther({other: {...itemData, uniqueId: nanoid(8)}}));
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
    dispatch(getOrderNumberThunk({allIngredientsId}));
  };

  const placeAnOrder = () => {
    if(!isLoggedIn) {
      navigate('/login', { state: { from: location } });
    } else {
      if (bun || others.length > 0) {
        assignOrderNumber(bun, others);
      }
    }
  };

  const resetOrderModal = useCallback(() => {
    dispatch(clearOrderId());
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