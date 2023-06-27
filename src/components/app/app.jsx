import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useState} from 'react';

function App() {
  
  const [ingredientsList, setIngredientsList] = useState({bun: '60666c42cc7b410027a1a9b2', others: []})

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredients}>
          <h2 className={styles.title}>Соберите бургер</h2>
          <BurgerIngredients data = {data} setIngredientsList={setIngredientsList} ingredientsList={ingredientsList} />
        </section>
        <section className={styles.burgerConstructor}>
          <BurgerConstructor data = {data} ingredientsList = {ingredientsList}/>
        </section>
      </main>
    </div>
  );
}

export default App;
