import React from 'react';
import { CurrentBurgerContext } from '../../contexts';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { arrayOfIngredientsPropType } from '../../utils/prop-types';
import styles from './others.module.css';

const Others = ({ ingredientsList }) => {
  const { currentBurgerDispatcher } = React.useContext(CurrentBurgerContext);

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
              currentBurgerDispatcher({ type: 'delete', ingredient: item })
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