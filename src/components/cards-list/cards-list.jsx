import React from 'react';
import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { arrayOfIngredientsPropType, functionPropType, stringPropType } from '../../utils/prop-types';
import { ingredientTypeName } from '../../utils/constants';

const CardsList = ({ type, data, handleSelectIngredient }) => {

  const generateList = (type) => {
    return data.map((item) => {
      if (item.type === type) {
        return (
          <IngredientCard itemData = {item} key={item._id} handleSelectIngredient={handleSelectIngredient}/>
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
  handleSelectIngredient: functionPropType.isRequired,
}

export default React.memo(CardsList);