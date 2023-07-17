import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import { CurrentBurgerContext, IngredientsDataContext } from '../../contexts/'
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import { resetApiError } from '../../services/store/actions/api-action-creators';

function App() {

  const dispatch = useDispatch();
  const { error, isIngredientsFailed, isIngredientsRecieved, isIngredientsRequested } = useSelector((store) => store.api);

  const data = useIngredientsData();
  
  //Редьюсер для currentBurger в следующей части проекта должен уехать в services
  const currentBurgerInitialState = {bun: null, others: []};
  const currentBurgerReducer = (state, action) => {
    switch (action.type) {
      case 'addBun':
        return { ...state, bun: action.ingredient };
      case 'addOther':
        return { ...state, others: [...state.others, action.ingredient] }
      case 'delete':
          return {...state, others: state.others.filter((ingredient) => ingredient.uniqueId !== action.ingredient.uniqueId)}
      case 'reset':
        return currentBurgerInitialState;
      default:
        return state;
    }
  }
  const [currentBurger, currentBurgerDispatcher] = React.useReducer(currentBurgerReducer, currentBurgerInitialState);

  const closeErrorModal = React.useCallback((value) => {
    if (!value) {
      dispatch(resetApiError())
    }
  }, [])

    return (
      <div className={styles.app}>
        <AppHeader />
        {isIngredientsRequested && <p className={styles.loadText}>Идет загрузка данных с сервера...</p>}
        {isIngredientsFailed && <p className={styles.errorText}>{error}</p>}
        {isIngredientsRecieved &&
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
        {(error && !isIngredientsFailed) && 
        <Modal title='Что-то пошло не так :(' handleCleanModalData={closeErrorModal} extraClass='pt-10 pr-10 pb-15 pl-10'>
          <p className={styles.modalErrorText}>{error}</p>
        </Modal>
        }
      </div>
    );
}

export default App;