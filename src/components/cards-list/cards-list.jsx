import React from 'react';
import { useSelector } from 'react-redux';
import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { stringPropType } from '../../utils/prop-types';

const CardsList = ({ type }) => {

  const { data } = useSelector((store) => store.ingredients);

  const generateList = (type) => {
    return data
      .filter((item) => item.type === type)
      .map((item) => (<IngredientCard itemData = {item} key={item._id} />));
  };

  return (
      <ul className={styles.list}>
        {generateList(type)}
      </ul>
  );
};

CardsList.propTypes = {
  type: stringPropType.isRequired,
};

export default React.memo(CardsList);