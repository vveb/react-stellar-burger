import React from 'react';
import styles from './burger-ingredients.module.css';
import CardsList from '../cards-list/cards-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { productTypes, ingredientTypeName } from '../../utils/constants';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {

  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const baseRef = React.useRef(null);

  const bunsRef = React.useRef(null);
  const saucesRef = React.useRef(null);
  const mainsRef = React.useRef(null);

  const [bunsViewRef, bunsActiveView] = useInView({
    threshold: .5,
    root: baseRef.current,
  });
  const [saucesViewRef, saucesActiveView] = useInView({
    threshold: .1,
    root: baseRef.current,
  });
  const [mainsViewRef, mainsActiveView] = useInView({
    threshold: .2,
    root: baseRef.current,
  });

  const setBunsTab = React.useCallback(() => {
    bunsRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setSaucesTab = React.useCallback(() => {
    saucesRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setMainsTab = React.useCallback(() => {
    mainsRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // React.useEffect(() => {
  //   console.log(mainsInView)
  //   console.dir(mainsViewRef)
  // }, [mainsInView, mainsViewRef])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={bunsActiveView} onClick={setBunsTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={saucesActiveView && !bunsActiveView} onClick={setSaucesTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={mainsActiveView && !saucesActiveView} onClick={setMainsTab}>
          Начинки
        </Tab>
      </div>
      <ul ref={baseRef} className={styles.table}>
        <li ref={bunsViewRef} className={styles.tableItem} key='buns'>
          <h3 ref={bunsRef} className={styles.title}>{ingredientTypeName.bun}</h3>
            <CardsList type={productTypes.bun} key={productTypes.bun} handleSelectIngredient={setCurrentIngredient} />
        </li>
        <li ref={saucesViewRef} className={styles.tableItem} key='sauces'>
          <h3 ref={saucesRef} className={styles.title}>{ingredientTypeName.sauce}</h3>
            <CardsList type={productTypes.sauce} key={productTypes.sauce} handleSelectIngredient={setCurrentIngredient} />
        </li>
        <li ref={mainsViewRef} className={styles.tableItem} key='mains'>
          <h3 ref={mainsRef} className={styles.title}>{ingredientTypeName.main}</h3>
            <CardsList type={productTypes.main} key={productTypes.main} handleSelectIngredient={setCurrentIngredient} />
        </li>
      </ul>
      {currentIngredient &&
      <Modal title='Детали ингредиента' extraClass='pt-10 pr-10 pb-15 pl-10' handleCleanModalData={setCurrentIngredient}>
        <IngredientDetails ingredientData={currentIngredient} />
      </Modal>}
    </>
  )
}

export default React.memo(BurgerIngredients);