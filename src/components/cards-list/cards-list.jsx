import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import React from "react";
import { arrayOfIngredientsPropType, functionPropType, stringPropType } from '../../utils/prop-types';

const CardsList = ({ type, data, addIngredientToList }) => {
  let ingredientTypeName;
  switch (type) {
    case 'bun':
      ingredientTypeName = 'Булки'
      break
    case 'main':
      ingredientTypeName = 'Начинки'
      break
    case 'sauce':
      ingredientTypeName = 'Соусы'
      break
  }

  function generateList(type) {
    return data.map((item) => {
      if (item.type === type) {
        return (
          <IngredientCard itemData = {item} addIngredientToList={addIngredientToList} key={item._id}/>
        )
      }
    })
  }

  return (
    <li className={styles.tableItem}>
      <h3 className={styles.title}>{ingredientTypeName}</h3>
      <ul className={styles.list}>
        {generateList(type)}
      </ul>
    </li>
  )
}

CardsList.propTypes = {
  type: stringPropType.isRequired,
  data: arrayOfIngredientsPropType.isRequired,
  addIngredientToList: functionPropType.isRequired,
}

export default React.memo(CardsList);