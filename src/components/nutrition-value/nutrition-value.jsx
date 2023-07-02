import styles from './nutrition-value.module.css';
import { stringPropType, numberPropType } from '../../utils/prop-types'

const NutritionValue = ({ title, amount }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.amount}>{amount}</p>
    </div>
  )
}

NutritionValue.propTypes = {
  title: stringPropType.isRequired,
  amount: numberPropType.isRequired,
}

export default NutritionValue;