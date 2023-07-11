import React from 'react';
import styles from './burger-ingredients.module.css';
import CardsList from '../cards-list/cards-list';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {functionPropType, arrayOfIngredientsPropType} from '../../utils/prop-types';
import { productTypes } from '../../utils/constants';

const BurgerIngredients = ({ data, handleSelectIngredient }) => {
  const [current, setCurrent] = React.useState('buns')

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const generateIngredientsList = () => {
    return productTypes.map((type) => (
      <CardsList type={type} data={data} key={type} handleSelectIngredient={handleSelectIngredient} />
    ))
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <ul className={styles.table}>
        {generateIngredientsList()}
      </ul>
    </>
  )
}

BurgerIngredients.propTypes = {
  data: arrayOfIngredientsPropType.isRequired,
  handleSelectIngredient: functionPropType.isRequired,
}

export default React.memo(BurgerIngredients);