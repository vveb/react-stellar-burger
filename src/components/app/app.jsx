import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { nanoid } from "nanoid";
import { CurrentBurgerContext, IngredientsDataContext } from '../../contexts/'
import { useIngredientsData } from '../../hooks/use-ingredients-data';

function App() {

  const {success, data, hasError, errorText} = useIngredientsData();

  const currentBurgerInitialState = {bun: null, others: []};
  const [currentBurger, currentBurgerDispatcher] = React.useReducer(currentBurgerReducer, currentBurgerInitialState);
  function currentBurgerReducer (state, action) {
    switch (action.type) {
      case 'addBun':
        return { ...state, bun: action.ingredient };
      case 'addOther':
        return { ...state, others: [...state.others, {...action.ingredient, uniqueId: nanoid(8)}] }
      case 'delete':
          return {...state, others: state.others.filter((ingredient) => ingredient.uniqueId !== action.ingredient.uniqueId)}
      case 'reset':
        return currentBurgerInitialState;
      default:
        return state;
    }
  }

    return (
      <div className={styles.app}>
        <AppHeader />
        {!success && !hasError && <p className={styles.loadText}>Идет загрузка данных с сервера...</p>}
        {!success && hasError && <p className={styles.errorText}>{errorText}</p>}
        {success && !hasError &&
          <>
            <CurrentBurgerContext.Provider value={{currentBurger, currentBurgerDispatcher}}>
              <main className={styles.main}>
                <section className={styles.ingredients}>
                  <h2 className={styles.title}>Соберите бургер</h2>
                  <IngredientsDataContext.Provider value={data}>
                    <BurgerIngredients />
                  </IngredientsDataContext.Provider>
                </section>
                <section className={styles.burgerConstructor}>
                  <BurgerConstructor />
                </section>
              </main>
            </CurrentBurgerContext.Provider>
          </>
        }
      </div>
    );
}

export default App;