import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredients}>
          <h2 className={styles.title}>Соберите бургер</h2>
          <BurgerIngredients data = {data} />
        </section>
        <section className={styles.burgerConstructor}>
          <BurgerConstructor data = {data} />
        </section>
      </main>
    </div>
  );
}

export default App;
