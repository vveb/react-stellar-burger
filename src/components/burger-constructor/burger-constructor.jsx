import React from 'react';
import {IngredientsListContext} from '../../contexts/ingredients-list-context';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType} from '../../utils/prop-types';
import TotalPrice from '../total-price/total-price';

const BurgerConstructor = ({ deleteIngredientFromList }) => {
  const ingredientsList = React.useContext(IngredientsListContext);

  const addBun = (type) => {
    const { bun } = ingredientsList;
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

  function addOthers() {
    return ingredientsList.others.map((item) => 
      (
        <li className={styles.listItem} key={item.uniqueId}>
          <DragIcon />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            extraClass={styles.backgroundColorTrue}
            handleClose={() => {
              deleteIngredientFromList(item)
            }}
          />
        </li>
      )
    )
  }
  
  return (
    <div className={styles.table}>
      {addBun('top')}
      <ul className={styles.list}>
        {addOthers()}
      </ul>
      {addBun('bottom')}
      <div className={styles.total}>
        <TotalPrice />
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  deleteIngredientFromList: functionPropType.isRequired,
}

export default React.memo(BurgerConstructor);