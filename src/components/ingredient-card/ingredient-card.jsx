import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';

const IngredientCard = ({ itemData, setIngredientsList, ingredientsList }) => {

  const handleClick = () => {
    switch (itemData.type) {
      case 'bun':
        if (count < 1) {
          setCountValue(count + 1)
        } else {
          setCountValue(0)
        }
        setIngredientsList(
          {
            bun: itemData._id,
            others: [...ingredientsList.others],
          }
        )
        break
      default:
        setCountValue(count + 1)
        setIngredientsList(
          {
            bun: ingredientsList.bun,
            others: [...ingredientsList.others, itemData._id]
          }
        )
        break
    }
    
  }

  const [count, setCountValue] = useState(0);

  return (
    <>
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

export default IngredientCard;