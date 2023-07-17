import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { arrayOfIngredientsPropType } from '../../utils/prop-types';
import styles from './others.module.css';
import { removeIngredient } from '../../services/store/actions/current-burger-action-creators';

const Others = ({ ingredientsList }) => {
  const dispatch = useDispatch();

  return (
      <ul className={styles.list}>
        {ingredientsList.map((item) => (
        <li className={styles.listItem} key={item.uniqueId}>
          <DragIcon />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            extraClass={styles.backgroundColorTrue}
            handleClose={() => {
              dispatch(removeIngredient(item));
            }}
          />
        </li>))}
      </ul>
  )
}

Others.propTypes = {
  ingredientsList: arrayOfIngredientsPropType.isRequired, 
}

export default Others;