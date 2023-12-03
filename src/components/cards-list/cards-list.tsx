import React from 'react';
import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useSelector } from '../../services/store/store';

const CardsList = ({ type }: {type: string}) => {

  const { data } = useSelector((store) => store.ingredients);

  const generateList = (type: string) => {
    return data
      ?.filter((item) => item.type === type)
      .map((item) => (<IngredientCard itemData = {item} key={item._id} />));
  };

  return (
      <ul className={styles.list}>
        {generateList(type)}
      </ul>
  );
};

export default React.memo(CardsList);