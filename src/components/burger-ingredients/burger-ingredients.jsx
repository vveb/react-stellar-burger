import CardsList from '../cards-list/cards-list';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from 'react';
import {functionPropType, arrayOfIngredientsPropType} from '../../utils/prop-types'
import { productTypes } from '../../utils/constants';

const BurgerIngredients = ({ data, addIngredientToList }) => {
  const [current, setCurrent] = useState('buns')

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const generateIngredientsList = () => {
    return productTypes.map((type) => (
      <CardsList type={type} data={data} key={type} addIngredientToList={addIngredientToList} />
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
  addIngredientToList: functionPropType.isRequired,
}

export default React.memo(BurgerIngredients);