import React from 'react';
import {CurrentBurgerContext} from '../../contexts';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType} from '../../utils/prop-types';
import TotalPrice from '../total-price/total-price';
import Api from '../../utils/api';

const BurgerConstructor = ({ setOrderId }) => {
  const { currentBurger, currentBurgerDispatcher } = React.useContext(CurrentBurgerContext);

  const addBun = (type) => {
    const { bun } = currentBurger;
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
    return currentBurger.others.map((item) => 
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
    let orderNumber='0';
    let allIngredientsId = {ingredients: []};
    allIngredientsId.ingredients.push(bun._id);
    // console.log(allIngredientsId)
    others.map((item) => item._id).forEach((item) => allIngredientsId.ingredients.push(item));
    console.log(allIngredientsId)
    Api.addNewOrder(allIngredientsId)
    .then((data) => console.log(data))
    return orderNumber;
  }, [currentBurger]);

  const placeAnOrder = React.useCallback(() => {
    const { bun, others } = currentBurger;
    if (bun && others.length > 0) {
      currentBurgerDispatcher({type: 'reset'})
      setOrderId(assignOrderNumber(bun, others));
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
        <Button htmlType="button" type="primary" size="large" onClick={placeAnOrder}>Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  setOrderId: functionPropType.isRequired,
}

export default React.memo(BurgerConstructor);