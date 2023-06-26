import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ itemData }) => {
  return (
    <>
      {itemData.__v !== 0 && <Counter count={itemData.__v} />}
      <img src = {itemData.image} className={styles.image} />
      <div className={styles.priceBox}>
        <p className={styles.price}>{itemData.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{itemData.name}</p>
    </>
  )
}

export default IngredientCard;