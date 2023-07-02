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
import OrderDetails from '../order-details/order-details';

function App() {

  const {success, data, hasError, errorText} = useIngredientsData();
  const [ingredientsList, setIngredientsList] = React.useState({bun: null, others: []});
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [orderId, setOrderId] = React.useState(null);

  const addIngredientToList = React.useCallback((item) => {
    if (item.type === 'bun') {
      setIngredientsList((prevState) => ({...prevState, bun: item}))
    } else {
      setIngredientsList((prevState) => ({...prevState, others: [...prevState.others, {...item, uniqueId: nanoid(8)}]}))
    }
  }, []);

  const deleteIngredientFromList = React.useCallback((item) => {
    if (item.type === 'bun') {
      setIngredientsList((prevState) => ({
        ...prevState,
        bun: null,
      }))
    }
    setIngredientsList((prevState) => ({
      ...prevState,
      others: prevState.others.filter((ingredient) => ingredient.uniqueId !== item.uniqueId),
    }))
  }, []);

  const onCloseRef = React.createRef();

    return (
      <div className={styles.app}>
        <AppHeader />
        {!success && !hasError && <p className={styles.loadText}>Идет загрузка данных с сервера...</p>}
        {!success && hasError && <p className={styles.errorText}>{errorText}</p>}
        {success && !hasError &&
          <>
            <IngredientsListContext.Provider value={ingredientsList}>
              <main className={styles.main}>
                <section className={styles.ingredients}>
                  <h2 className={styles.title}>Соберите бургер</h2>
                  <BurgerIngredients data={data} addIngredientToList={addIngredientToList} handleSelectIngredient={setCurrentIngredient}/>
                </section>
                <section className={styles.burgerConstructor}>
                  <BurgerConstructor deleteIngredientFromList={deleteIngredientFromList} setOrderId={setOrderId}/>
                </section>
              </main>
            </IngredientsListContext.Provider>
            {currentIngredient &&
              <Modal ref={onCloseRef} title='Детали ингредиента' extraClass='pt-10 pr-10 pb-15 pl-10' handleCleanIngredient={setCurrentIngredient}>
                <IngredientDetails ingredientData={currentIngredient} />
              </Modal>}
            {orderId &&
            <Modal ref={onCloseRef} extraClass='pt-10 pr-10 pb-30 pl-10' handleCleanIngredient={setOrderId}>
              <OrderDetails ref={onCloseRef} orderId={orderId} />
            </Modal>}
          </>
        }
      </div>
    );
}

export default App;