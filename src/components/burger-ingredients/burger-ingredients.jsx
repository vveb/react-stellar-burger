import React from 'react';
import styles from './burger-ingredients.module.css';
import CardsList from '../cards-list/cards-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { productTypes } from '../../utils/constants';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState('buns');

  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const setTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const generateIngredientsList = () => {
    return productTypes.map((type) => (
      <CardsList type={type} key={type} handleSelectIngredient={setCurrentIngredient} />
    ))
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <ul className={styles.table}>
        {generateIngredientsList()}
      </ul>
      {currentIngredient &&
      <Modal title='Детали ингредиента' extraClass='pt-10 pr-10 pb-15 pl-10' handleCleanModalData={setCurrentIngredient}>
        <IngredientDetails ingredientData={currentIngredient} />
      </Modal>}
    </>
  )
}

export default React.memo(BurgerIngredients);