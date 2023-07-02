import React from 'react';
import {IngredientsListContext} from '../../contexts/ingredients-list-context';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType} from '../../utils/prop-types';
import TotalPrice from '../total-price/total-price';

const BurgerConstructor = ({ deleteIngredientFromList, setOrderId }) => {
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

  const addOthers = () => {
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

  const cleanIngredientsList = ({ bun, others }) => {
    if (bun) {deleteIngredientFromList(bun)}
    if (others.length > 0) {
      others.forEach((ingredient) => deleteIngredientFromList(ingredient))
    }
  }

  const assignOrderNumber = React.useMemo(() => {
    let orderNumber='';
    for (let i = 0; i < 6; i++) {
      orderNumber += String(Math.round(Math.random() * 9))
    };
    return orderNumber;
  }, [ingredientsList]);

  const placeAnOrder = React.useCallback(() => {
    const { bun, others } = ingredientsList;
    if (bun || others.length > 0) {
      cleanIngredientsList(ingredientsList);
      setOrderId(assignOrderNumber);
    }
  }, [ingredientsList]);
  
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
  deleteIngredientFromList: functionPropType.isRequired,
  setOrderId: functionPropType.isRequired,
}

export default React.memo(BurgerConstructor);