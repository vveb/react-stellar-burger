import { ingredientsFailed, ingredientsReceived, ingredientsRequested } from "../actions/api-state-action-creators";
import Api from "../../../utils/api";

const getIngredientsData = () => {
  return (dispatch) => {
    dispatch(ingredientsRequested());
    Api.getIngredientsData()
      .then((data) => {
        dispatch(ingredientsReceived(data));
      })
      .catch((err) => {
        const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
        dispatch(ingredientsFailed(`Ошибка при загрузке данных с сервера: ${errorText}`));
      })
  };
};

export default getIngredientsData;