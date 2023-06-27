import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ data, ingredientsList }) => {

  function addBun(type) {
    const bun = data.find(item => item._id === ingredientsList.bun)
    return (
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun.name + (type === 'top' ? ' (верх)' : ' (низ)')}
        price={bun.price}
        thumbnail={bun.image}
        extraClass={styles.bordIngredient}
      />
    )
  }

  function addOthers() {
    return ingredientsList.others.map((itemId, index) => {
      const ingredient = data.find((item) => item._id === itemId)
      return (
        <li className={styles.listItem} key={index}>
          <DragIcon />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
      )
    })
  }
  

  return (
    <div className={styles.table}>
      {addBun('top')}
      <ul className={styles.list}>
        {addOthers()}
      </ul>
      {addBun('bottom')}
      <div className={styles.total}>
        <div className={styles.totalPrice}>
          <p className={styles.price}>610</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;