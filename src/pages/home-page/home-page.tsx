import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from '../../services/store/store';

const HomePage = () => {

  const {
    error,
    isIngredientsRequested,
    isIngredientsReceived,
    isIngredientsFailed
  } = useSelector ((store) => store.api);

  return (
    <>
      {isIngredientsRequested && <p className={styles.loadText}>Идет загрузка данных с сервера...</p>}
      {isIngredientsFailed && <p className={styles.errorText}>{error}</p>}
      {isIngredientsReceived &&
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      }
    </>
  );
};

export default HomePage;
