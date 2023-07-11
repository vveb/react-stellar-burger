import React from 'react';
import {CurrentBurgerContext} from '../../contexts';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType} from '../../utils/prop-types';
import TotalPrice from '../total-price/total-price';
import Api from '../../utils/api';

const BurgerConstructor = ({ setOrderId }) => {
  const { currentBurger, currentBurgerDispatcher } = React.useContext(CurrentBurgerContext);
  const { bun, others } = currentBurger;
  const [orderLoading, setOrderLoading] = React.useState(false)

  const addBun = (type) => {
    if (!bun) {return null}
    return (
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun.name + (type === 'top' ? ' (верх)' : ' (низ)')}
        price={bun.price}
        thumbnail={bun.image}
        extraClass={styles.bordIngredient}
      />
    )
  }

  const addOthers = () => {
    return others.map((item) => 
      (
        <li className={styles.listItem} key={item.uniqueId}>
          <DragIcon />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            extraClass={styles.backgroundColorTrue}
            handleClose={() => {
              currentBurgerDispatcher({ type: 'delete', ingredient: item })
            }}
          />
        </li>
      )
    )
  }

  const assignOrderNumber = React.useCallback((bun, others) => {
    let allIngredientsId = {ingredients: []};
    if (bun) {
      allIngredientsId.ingredients.push(bun._id);
    }
    others.map((item) => item._id).forEach((item) => allIngredientsId.ingredients.push(item));
    setOrderLoading(true);
    Api.addNewOrder(allIngredientsId)
    .then((data) => {
      currentBurgerDispatcher({type: 'reset'});
      setOrderId(data.order.number);
    })
    .catch((err) => {
      const error = err.statusCode ? err.message : 'Connection trouble, check your network';
      console.log(error);
    })
    .finally(() => setOrderLoading(false))
  }, []);

  const placeAnOrder = React.useCallback(() => {
    if (bun || others.length > 0) {
      assignOrderNumber(bun, others);
    }
  }, [currentBurger]);
  
  return (
    <div className={styles.table}>
      {addBun('top')}
      <ul className={styles.list}>
        {addOthers()}
      </ul>
      {addBun('bottom')}
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
  )
}

BurgerConstructor.propTypes = {
  setOrderId: functionPropType.isRequired,
}

export default React.memo(BurgerConstructor);