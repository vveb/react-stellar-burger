import styles from './cards-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

const CardsList = ({ type, data, setIngredientsList, ingredientsList }) => {
  let ingredientTypeName;
  switch (type) {
    case 'bun':
      ingredientTypeName = 'Булки'
      break
    case 'main':
      ingredientTypeName = 'Начинки'
      break
    case 'sauce':
      ingredientTypeName = 'Соусы'
      break
  }

  function generateList(type) {
    return data.map((item) => {
      if (item.type === type) {
        return (
          <li className={styles.listItem} key={item._id}>
          <IngredientCard itemData = {item} setIngredientsList={setIngredientsList} ingredientsList={ingredientsList} />
          </li>
        )
      }
    })
  }

  return (
    <>
      <h3 className={styles.title}>{ingredientTypeName}</h3>
      <ul className={styles.list}>
        {generateList(type)}
      </ul>
    </>
  )
}

export default CardsList;