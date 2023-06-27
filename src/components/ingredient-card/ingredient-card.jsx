import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType, functionPropType, objectPropType } from '../../utils/prop-types';

const IngredientCard = ({ itemData, setIngredientsList, ingredientsList }) => {
  let count = 0;

  const handleClick = () => {
    if (itemData.type == 'bun') {
      setIngredientsList(
        {
          bun: itemData._id,
          others: [...ingredientsList.others],
        }
      )
    } else {
      setIngredientsList(
        {
          bun: ingredientsList.bun,
          others: [...ingredientsList.others, itemData._id]
        }
      )
    }
  }

  function updateCounter(array) {
    count += array.reduce((acc, el) => {
      if (el === itemData._id) {
        return acc + 1
      } return acc
    }, 0)
  }
  

  return (
    <>
      {updateCounter(ingredientsList.others)}
      {updateCounter([ingredientsList.bun])}
      {count !== 0 && <Counter count={count} />}
      <img src = {itemData.image} className={styles.image} onClick={handleClick} />
      <div className={styles.priceBox}>
        <p className={styles.price}>{itemData.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{itemData.name}</p>
    </>
  )
}

IngredientCard.propTypes = {
  itemData: ingredientPropType.isRequired,
  setIngredientsList: functionPropType.isRequired,
  ingredientsList: objectPropType.isRequired,
}

export default IngredientCard;