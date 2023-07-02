import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredientData }) => {
  console.log(ingredientData)
  return (
    <>
      <img className={styles.image} src={ingredientData.image} alt={ingredientData.name} />
      <p className={styles.name}>{ingredientData.name}</p>
      <div className={styles.details}>
        <div className={styles.detailsItem}>
          <p className={styles.detailsTitle}>Калории, ккал</p>
          <p className={styles.detailsAmount}>{ingredientData.calories}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.detailsTitle}>Белки, г</p>
          <p className={styles.detailsAmount}>{ingredientData.proteins}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.detailsTitle}>Жиры, г</p>
          <p className={styles.detailsAmount}>{ingredientData.fat}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.detailsTitle}>Углеводы, г</p>
          <p className={styles.detailsAmount}>{ingredientData.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

export default IngredientDetails;