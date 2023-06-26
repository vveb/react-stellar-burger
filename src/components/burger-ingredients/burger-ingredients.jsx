import CardsList from '../cards-list/cards-list';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('buns')

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
        <h3 className={styles.title}>Булки</h3>
        <CardsList type={'bun'} data={data} />
        <h3 className={styles.title}>Соусы</h3>
        <CardsList type={'sauce'} data={data} />
        <h3 className={styles.title}>Начинки</h3>
        <CardsList type={'main'} data={data} />
      </div>
    </>
  )
}

export default BurgerIngredients;