import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

const CardsList = ({ type, data }) => {
  function generateList(type) {
    return data.map((item) => {
      if (item.type === type) {
        return (
          <li className={styles.listItem}>
            <IngredientCard itemData = {item} />
          </li>
        )
      }
    })
  }

  return (
    <ul className={styles.list}>
      {generateList(type)}
    </ul>
  )
}

export default CardsList;