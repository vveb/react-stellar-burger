import React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import { setCurrentIngredient } from '../../services/store/actions/modals-action-creators';
import { setIsDraggingIngredient } from '../../services/store/actions/ingredient-dragstate-action-creators';

const IngredientCard = ({ itemData }) => {
  
  const dispatch = useDispatch();
  const { bun, others } = useSelector((store) => store.currentBurger);

  const isIngredientDraggingNow = useSelector((store) => store.isIngredientDraggingNow);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredientCard',
    item: itemData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  });

  useEffect(() => {
    dispatch(setIsDraggingIngredient(isDrag));
  }, [isDrag, dispatch]);

  const handleClick = () => {
    dispatch(setCurrentIngredient(itemData))
  }

  const count = useMemo(() => {
    if (itemData.type === 'bun') {
      if (!bun) {return 0}
      return itemData._id === bun._id ? 1 : 0;
    }
    return others.filter((item) => itemData._id === item._id).length;
  }, [bun, others, itemData._id, itemData.type])
  
  return (
    <li className={`${styles.listItem} ${(isIngredientDraggingNow && !isDrag) && styles.darker}`} onClick={handleClick} ref={dragRef}>
      {count !== 0 && <Counter count={count} />}
      <img role='button' src={itemData.image} alt={itemData.name} className={styles.image} />
      <div className={styles.priceBox}>
        <p className={styles.price}>{itemData.price}</p>
        <CurrencyIcon />
      </div>
      <p role='button' className={styles.name}>{itemData.name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  itemData: ingredientPropType.isRequired,
}

/* Благодаря этому (мемоизации) мы избегаем перерендера карточки при перерендере родителя
без изменения пропсов конкретной карточки */
export default React.memo(IngredientCard);