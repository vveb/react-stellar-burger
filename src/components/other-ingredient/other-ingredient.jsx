import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeOrder, removeIngredient } from "../../services/store/actions/current-burger-action-creators";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';
import styles from './other-ingredient.module.css'
import { ingredientPropType, numberPropType } from '../../utils/prop-types';

const OtherIngredient = ({ itemData, index }) => {

  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'burgerIngredient',
    item: itemData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'burgerIngredient',
    drop(itemData) {
      dispatch(changeOrder({other: itemData, index}));
    }
  })

  return (
      <li className={`${styles.listItem} ${isDrag && styles.dragging}`} ref={dragRef}>
        <div className={styles.dropBox} ref={dropRef}>
          <DragIcon />
          <ConstructorElement
            text={itemData.name}
            price={itemData.price}
            thumbnail={itemData.image}
            extraClass={styles.backgroundColorTrue}
            handleClose={() => {
              dispatch(removeIngredient(itemData));
            }}
          />
        </div>
      </li>
  )
}

OtherIngredient.propType = {
  itemData: ingredientPropType.isRequired,
  index: numberPropType.isRequired,
}

export default React.memo(OtherIngredient);