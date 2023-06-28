import {useState, useCallback} from 'react';
import styles from "./app.module.css";
import {data} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { nanoid } from "nanoid";
import {IngredientsListContext} from '../../contexts/ingredients-list-context'

function App() {
  
  const [ingredientsList, setIngredientsList] = useState({bun: null, others: []})

  const addIngredientToList = useCallback((item) => {
    if (item.type === 'bun') {
      setIngredientsList((prevState) => ({...prevState, bun: item}))
    } else {
      setIngredientsList((prevState) => ({...prevState, others: [...prevState.others, {...item, uniqueId: nanoid(8)}]}))
    }
  }, []);

  const deleteIngredientFromList = useCallback((item) => {
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
            <BurgerIngredients data={data} addIngredientToList={addIngredientToList} />
          </section>
          <section className={styles.burgerConstructor}>
            <BurgerConstructor deleteIngredientFromList={deleteIngredientFromList}/>
          </section>
        </main>
      </IngredientsListContext.Provider>
    </div>
  );
}

export default App;