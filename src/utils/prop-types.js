import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v:PropTypes.number
});
export const arrayOfIngredientsPropType = PropTypes.arrayOf(ingredientPropType)
export const functionPropType = PropTypes.func;
export const objectPropType = PropTypes.object;
export const stringPropType = PropTypes.string;