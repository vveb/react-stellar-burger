import { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-ingredients.module.css';
import CardsList from '../cards-list/cards-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { productTypes, ingredientTypeName } from '../../utils/constants';
import { useInView } from 'react-intersection-observer';
import { resetCurrentIngredient } from '../../services/store/actions/modals-action-creators';
import { IsDraggingIngredientContext } from '../../contexts/is-dragging-ingredient-context';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const [isDraggingNow, setIsDraggingNow] = useState(false);

  const currentIngredient = useSelector((store) => store.modals.currentIngredient);

  const handleCloseModal = () => {
    dispatch(resetCurrentIngredient());
  }

  //Обработка переключения табов при скролле
  const baseRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

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

  //Обработка скролла при клике на таб
  const setBunsTab = useCallback(() => {
    bunsRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setSaucesTab = useCallback(() => {
    saucesRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setMainsTab = useCallback(() => {
    mainsRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

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
      <IsDraggingIngredientContext.Provider value={{drag: isDraggingNow, handleDrag: setIsDraggingNow}}>
        <ul ref={baseRef} className={styles.table}>
          <li ref={bunsViewRef} className={styles.tableItem} key='buns'>
            <h3 ref={bunsRef} className={styles.title}>{ingredientTypeName.bun}</h3>
              <CardsList type={productTypes.bun} key={productTypes.bun} />
          </li>
          <li ref={saucesViewRef} className={styles.tableItem} key='sauces'>
            <h3 ref={saucesRef} className={styles.title}>{ingredientTypeName.sauce}</h3>
              <CardsList type={productTypes.sauce} key={productTypes.sauce} />
          </li>
          <li ref={mainsViewRef} className={styles.tableItem} key='mains'>
            <h3 ref={mainsRef} className={styles.title}>{ingredientTypeName.main}</h3>
              <CardsList type={productTypes.main} key={productTypes.main} />
          </li>
        </ul>
      </IsDraggingIngredientContext.Provider>
      {currentIngredient &&
      <Modal title='Детали ингредиента' extraClass='pt-10 pr-10 pb-15 pl-10' handleCleanModalData={handleCloseModal}>
        <IngredientDetails ingredientData={currentIngredient} />
      </Modal>}
    </>
  )
}

export default BurgerIngredients;