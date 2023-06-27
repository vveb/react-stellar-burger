import CardsList from '../cards-list/cards-list';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('buns')
  const productTypes = Array.from(new Set(data.map((item) => item.type)))

  function generateIngredientsList() {
    return productTypes.map((type, index) => (<CardsList type={type} data={data} key={index} />))
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.table}>
        {generateIngredientsList()}
      </div>
    </>
  )
}

export default BurgerIngredients;