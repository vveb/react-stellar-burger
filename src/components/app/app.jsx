import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import { CurrentBurgerContext, IngredientsDataContext, ApiStateContext } from '../../contexts/'
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import { CLEAR_API_ERROR,
  SET_API_ERROR,
  INGREDIENTS_REQUESTED,
  INGREDIENTS_RECIEVED,
  INGREDIENTS_FAILED,
  ORDER_PENDING,
  ORDER_PLACED,
  ORDER_FAILED } from '../../utils/constants';
import { resetApiError } from '../../utils/action-creators';

function App() {

  //Редьюсер для API в следующей части проекта должен уехать в services
  const initialApiState = {
    isIngredientsRequested: false,
    isIngredientsRecieved: false,
    isIngredientsFailed: false,
    isOrderPending: false,
    isOrderPlaced: false,
    isOrderFailed: false,
    error: null,
  }
  const apiStateReducer = (state, action) => {
    switch(action.type) {
      case SET_API_ERROR:
        return {...state, error: action.payload};
      case CLEAR_API_ERROR:
        return {...state, error: null};
      case INGREDIENTS_REQUESTED:
        return {...state, isIngredientsRequested: true, isIngredientsRecieved: false, isIngredientsFailed: false, error: null};
      case INGREDIENTS_RECIEVED:
        return {...state, isIngredientsRequested: false, isIngredientsRecieved: true, isIngredientsFailed: false, error: null};
      case INGREDIENTS_FAILED:
        return {...state, isIngredientsRequested: false, isIngredientsRecieved: false, isIngredientsFailed: true, error: action.payload};
      case ORDER_PENDING:
        return {...state, isOrderPending: true, isOrderPlaced: false, isOrderFailed: false, error: null};
      case ORDER_PLACED:
        return {...state, isOrderPending: false, isOrderPlaced: true, isOrderFailed: false, error: null};
      case ORDER_FAILED:
        return {...state, isOrderPending: false, isOrderPlaced: false, isOrderFailed: true, error: action.payload};
      default:
      return state;
    };
  };
  const [apiState, apiStateDispatcher] = React.useReducer(apiStateReducer, initialApiState);

  const data = useIngredientsData(apiStateDispatcher);
  
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
      apiStateDispatcher(resetApiError())
    }
  }, [])

    return (
      <div className={styles.app}>
        <ApiStateContext.Provider value={{apiState, apiStateDispatcher}}>
          <AppHeader />
          {apiState.isIngredientsRequested && <p className={styles.loadText}>Идет загрузка данных с сервера...</p>}
          {apiState.isIngredientsFailed && <p className={styles.errorText}>{apiState.error}</p>}
          {apiState.isIngredientsRecieved &&
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
          {(apiState.error && !apiState.isIngredientsFailed) && 
          <Modal title='Что-то пошло не так :(' handleCleanModalData={closeErrorModal} extraClass='pt-10 pr-10 pb-15 pl-10'>
            <p className={styles.modalErrorText}>{apiState.error}</p>
          </Modal>
          }
        </ApiStateContext.Provider>
      </div>
    );
}

export default App;