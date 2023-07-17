import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import { IngredientsDataContext } from '../../contexts/'
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import { resetApiError } from '../../services/store/actions/api-action-creators';

function App() {

  const dispatch = useDispatch();
  const { error, isIngredientsFailed, isIngredientsRecieved, isIngredientsRequested } = useSelector((store) => store.api);

  const data = useIngredientsData();

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