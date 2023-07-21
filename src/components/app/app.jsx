import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import { resetApiError } from '../../services/store/actions/api-state-action-creators';
import getIngredientsData from '../../services/store/thunks/get-ingredients-data';

function App() {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredientsData());
  }, [])

  const { error, isIngredientsFailed, isIngredientsRecieved, isIngredientsRequested } = useSelector((store) => store.api);

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
              <DndProvider backend={HTML5Backend}>
                <section className={styles.ingredients}>
                  <h2 className={styles.title}>Соберите бургер</h2>
                    <BurgerIngredients />
                </section>
                  <BurgerConstructor />
              </DndProvider>
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