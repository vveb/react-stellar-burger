import React from 'react';
import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { arrayOfIngredientsPropType, functionPropType, stringPropType } from '../../utils/prop-types';

const CardsList = ({ type, data, addIngredientToList, handleSelectIngredient }) => {
  const ingredientTypeName = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы',
  }

  const generateList = (type) => {
    return data.map((item) => {
      if (item.type === type) {
        return (
          <IngredientCard itemData = {item} addIngredientToList={addIngredientToList} key={item._id} handleSelectIngredient={handleSelectIngredient}/>
        )
      }
    })
  }

  return (
    <li className={styles.tableItem} id={type + 's'}>
      <h3 className={styles.title}>{ingredientTypeName[type]}</h3>
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
  handleSelectIngredient: functionPropType.isRequired,
}

export default React.memo(CardsList);