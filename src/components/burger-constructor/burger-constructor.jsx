import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ data }) => {
  return (
    <div className={styles.table}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[0].image}
        extraClass={styles.bordIngredient}
      />
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
        <li className={styles.listItem}>
          <DragIcon />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data.image}
            extraClass={styles.backgroundColorTrue}
          />
        </li>
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[0].image}
        extraClass={styles.bordIngredient}
      />
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