import styles from './ingredient-details.module.css';
import NutritionValue from '../nutrition-value/nutrition-value';
import { ingredientPropType } from '../../utils/prop-types'

const IngredientDetails = ({ ingredientData }) => {
  const { calories, proteins, fat, carbohydrates } = ingredientData;
  return (
    <>
      <img className={styles.image} src={ingredientData.image} alt={ingredientData.name} />
      <p className={styles.name}>{ingredientData.name}</p>
      <div className={styles.details}>
        <NutritionValue title='Калории, ккал' amount={calories} />
        <NutritionValue title='Белки, г' amount={proteins} />
        <NutritionValue title='Жиры, г' amount={fat} />
        <NutritionValue title='Углеводы, г' amount={carbohydrates} />
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredientData: ingredientPropType.isRequired,
}

export default IngredientDetails;