import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { functionPropType } from '../../utils/prop-types';
import React from "react";
import { IngredientsListContext } from '../../contexts/ingredients-list-context'

const BurgerConstructor = ({ deleteIngredientFromList }) => {
  const ingredientsList = React.useContext(IngredientsListContext);

  const totalPrice = React.useMemo(() => {
    const bunPrice = ingredientsList.bun ? ingredientsList.bun.price * 2 : 0;
    return ingredientsList.others.reduce((acc, item) => {
      return acc + item.price
    }, bunPrice);
  }, [ingredientsList.bun, ingredientsList.others])

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
        <div className={styles.totalPrice}>
          <p className={styles.price}>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  deleteIngredientFromList: functionPropType.isRequired
}

export default React.memo(BurgerConstructor);