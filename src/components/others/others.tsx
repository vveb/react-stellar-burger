import React from 'react';
import styles from './others.module.css';
import OtherIngredient from '../other-ingredient/other-ingredient';
import { Ingredient } from '../../services/types';
import { useSelector } from '../../services/store/store';

type OthersProps = {
  ingredientsList: Ingredient[];
};

const Others = ({ ingredientsList }: OthersProps) => {

  const { bun, others } = useSelector((store) => store.currentBurger);

  return (
      <ul className={`${styles.list} && ${(!bun && others.length < 1) && styles.list_empty}`}>
        {(!bun && others.length < 1) && <h2 className={styles.title}>Добавьте ингредиенты</h2>}
        {ingredientsList.map((item, index) => <OtherIngredient itemData={item} key={item.uniqueId} index={index} />)}
      </ul>
  );
};

export default React.memo(Others);