import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType, functionPropType } from '../../utils/prop-types';
import { nanoid } from 'nanoid';
import { addBun, addOther } from '../../services/store/actions/current-burger-action-creators';

const IngredientCard = ({ itemData, handleSelectIngredient}) => {

  const dispatch = useDispatch();
  const { bun, others } = useSelector((store) => store.currentBurger);

  const handleImageClick = () => {
    if (itemData.type === 'bun') {
      dispatch(addBun({...itemData, uniqueId: nanoid(8)}));
    } else {
      dispatch(addOther({...itemData, uniqueId: nanoid(8)}));
    }
  }

  const handleNameClick = () => {
    handleSelectIngredient(itemData)
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
      <img role='button' src={itemData.image} alt={itemData.name} className={styles.image} onClick={handleImageClick} />
      <div className={styles.priceBox}>
        <p className={styles.price}>{itemData.price}</p>
        <CurrencyIcon />
      </div>
      <p role='button' className={styles.name} onClick={handleNameClick}>{itemData.name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  itemData: ingredientPropType.isRequired,
  handleSelectIngredient: functionPropType.isRequired,
}

/* Благодаря этому (мемоизации) мы избегаем перерендера карточки при перерендере родителя
без изменения пропсов конкретной карточки */
export default React.memo(IngredientCard);