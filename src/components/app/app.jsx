import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { nanoid } from "nanoid";
import {IngredientsListContext} from '../../contexts/ingredients-list-context'
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {

  const {success, data} = useIngredientsData();
  const [ingredientsList, setIngredientsList] = React.useState({bun: null, others: []});
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const addIngredientToList = React.useCallback((item) => {
    if (item.type === 'bun') {
      setIngredientsList((prevState) => ({...prevState, bun: item}))
    } else {
      setIngredientsList((prevState) => ({...prevState, others: [...prevState.others, {...item, uniqueId: nanoid(8)}]}))
    }
  }, []);

  const deleteIngredientFromList = React.useCallback((item) => {
    setIngredientsList((prevState) => ({
      ...prevState,
      others: prevState.others.filter((ingredient) => ingredient.uniqueId !== item.uniqueId),
    }))
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsListContext.Provider value={ingredientsList}>
        <main className={styles.main}>
          <section className={styles.ingredients}>
            <h2 className={styles.title}>Соберите бургер</h2>
            {success && <BurgerIngredients data={data} addIngredientToList={addIngredientToList} handleSelectIngredient={setCurrentIngredient}/>}
          </section>
          <section className={styles.burgerConstructor}>
            <BurgerConstructor deleteIngredientFromList={deleteIngredientFromList}/>
          </section>
        </main>
      </IngredientsListContext.Provider>
      {currentIngredient &&
        <Modal title='Детали ингредиента' extraClass='pt-10 pr-10 pb-15 pl-10' handleCleanIngredient={setCurrentIngredient}>
          <IngredientDetails ingredientData={currentIngredient} />
        </Modal>}
    </div>
  );
}

export default App;