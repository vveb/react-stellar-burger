import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styles from './ingredient-page.module.css';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { clearCurrentIngredient, setCurrentIngredient } from "../services/store/ui-slice";

const IngredientPage = () => {
  
  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state && location.state.background;
  const { id } = useParams();
  const ingredient = useSelector((store) => store.ingredients.data?.find((item) => item._id === id));
  const { currentIngredient } = useSelector((store) => store.ui);
  
  useEffect(() => {
    if (ingredient && !currentIngredient) {
      dispatch(setCurrentIngredient({itemData: ingredient}));
    };
  }, [ingredient, currentIngredient, dispatch]);

  /* При размонтировании очищаем currentIngredient,
  чтобы при переходе на главную страницу не открывалась модалка с ингредиентом */
  useEffect(() => {
    return () => {
      dispatch(clearCurrentIngredient());
    };
  }, []);
  
  if (!ingredient || background) {
    return null;
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Детали ингредиента</h2>
      <IngredientDetails ingredientData={ingredient} />
    </main>
  );
};

export default IngredientPage;