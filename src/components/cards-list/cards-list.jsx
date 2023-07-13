import React from 'react';
import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { functionPropType, stringPropType } from '../../utils/prop-types';
import { ingredientTypeName } from '../../utils/constants';
import { IngredientsDataContext } from '../../contexts';

const CardsList = ({ type, handleSelectIngredient }) => {

  const data = React.useContext(IngredientsDataContext);

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
      <ul className={styles.list}>
        {generateList(type)}
      </ul>
  )
};

CardsList.propTypes = {
  type: stringPropType.isRequired,
  handleSelectIngredient: functionPropType.isRequired,
}

export default React.memo(CardsList);