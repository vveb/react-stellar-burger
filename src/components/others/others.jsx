import React from 'react';
import { useSelector } from 'react-redux';
import styles from './others.module.css';
import { arrayOfIngredientsPropType } from '../../utils/prop-types';
import OtherIngredient from '../other-ingredient/other-ingredient';

const Others = ({ ingredientsList }) => {

  const { bun, others } = useSelector((store) => store.currentBurger);

  return (
      <ul className={`${styles.list} && ${(!bun && others.length < 1) && styles.list_empty}`}>
        {(!bun && others.length < 1) && <h2 className={styles.title}>Добавьте ингредиенты</h2>}
        {ingredientsList.map((item, index) => <OtherIngredient itemData={item} key={item.uniqueId} index={index} />)}
      </ul>
  );
};

Others.propTypes = {
  ingredientsList: arrayOfIngredientsPropType.isRequired, 
};

export default React.memo(Others);