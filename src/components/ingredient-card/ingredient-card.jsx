import React from 'react';
import {IngredientsListContext} from '../../contexts/ingredients-list-context';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType, functionPropType } from '../../utils/prop-types';

const IngredientCard = ({ itemData, addIngredientToList}) => {
  
  const {bun, others} = React.useContext(IngredientsListContext);

  const handleClick = () => {
    addIngredientToList(itemData);
  }

  const count = React.useMemo(() => {
    if (itemData.type === 'bun') {
      if (!bun) {return 0}
      return itemData._id === bun._id ? 1 : 0;
    }
    return others.filter((item) => itemData._id === item._id).length;
  }, [bun, others])
  
  return (
    <li className={styles.listItem}>
      {count !== 0 && <Counter count={count} />}
      <img src = {itemData.image} className={styles.image} onClick={handleClick} />
      <div className={styles.priceBox}>
        <p className={styles.price}>{itemData.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{itemData.name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  itemData: ingredientPropType.isRequired,
  addIngredientToList: functionPropType.isRequired,
}

/* Благодаря этому (мемоизации) мы избегаем перерендера карточки при перерендере родителя
без изменения пропсов конкретной карточки */
export default React.memo(IngredientCard);