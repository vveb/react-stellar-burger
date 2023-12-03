import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './other-ingredient.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeOrder, removeIngredient } from '../../services/store/current-burger-slice';
import { Ingredient } from '../../services/types';
import { useDispatch } from '../../services/store/store';

type OtherIngredientProps = {
  itemData: Ingredient;
  index: number;
}

const OtherIngredient = ({ itemData, index }: OtherIngredientProps) => {

  const dispatch = useDispatch();

  const [isDragging, setIsDragging] = useState(false);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'burgerIngredient',
    item: itemData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  //Дополнительный стейт для перерендера при перетаскивании ингредиентов в конструкторе и отработке анимации
  useEffect(() => {
    setIsDragging(isDrag);
  }, [isDrag]);

  const [, dropRef] = useDrop({
    accept: 'burgerIngredient',
    drop(itemData: Ingredient) {
      dispatch(changeOrder({other: itemData, index}));
    }
  });

  return (
      <li className={`${styles.listItem} ${isDragging && styles.dragging}`} ref={dragRef}>
        <div className={styles.dropBox} ref={dropRef}>
          <DragIcon type='primary' />
          <ConstructorElement
            text={itemData.name}
            price={itemData.price}
            thumbnail={itemData.image}
            extraClass={styles.backgroundColorTrue}
            handleClose={() => {
              dispatch(removeIngredient({itemData}));
            }}
          />
        </div>
      </li>
  );
};

export default React.memo(OtherIngredient);