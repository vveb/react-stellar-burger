import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType, stringPropType } from "../../utils/prop-types";

const Bun = ({ ingredient, type, extraClass }) => {
  return (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={ingredient.name + (type === 'top' ? ' (верх)' : ' (низ)')}
      price={ingredient.price}
      thumbnail={ingredient.image}
      extraClass={extraClass}
    />
  )
}

Bun.defaultProps = {
  extraClass: '',
}

Bun.propTypes = {
  ingredient: ingredientPropType.isRequired,
  type: stringPropType.isRequired,
  extraClass: stringPropType,
}

export default Bun;