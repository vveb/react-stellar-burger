import React from 'react';
import {CurrentBurgerContext} from '../../contexts/current-burger-context';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType} from '../../utils/prop-types';
import TotalPrice from '../total-price/total-price';

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

  // const cleanIngredientsList = ({ bun, others }) => {
  //   // if (bun) {deleteIngredientFromList(bun)}
  //   if (bun) {currentBurgerDispatcher({ type: 'delete', ingredient: bun })}
  //   if (others.length > 0) {
  //     // others.forEach((ingredient) => deleteIngredientFromList(ingredient))
  //     others.forEach((item) => currentBurgerDispatcher({ type: 'delete', ingredient: item }))
  //   }
  // }

  const assignOrderNumber = React.useMemo(() => {
    let orderNumber='';
    for (let i = 0; i < 6; i++) {
      orderNumber += String(Math.round(Math.random() * 9))
    };
    return orderNumber;
  }, [currentBurger]);

  const placeAnOrder = React.useCallback(() => {
    const { bun, others } = currentBurger;
    if (bun || others.length > 0) {
      currentBurgerDispatcher({type: 'reset'})
      setOrderId(assignOrderNumber);
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