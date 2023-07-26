import Api from "../../../utils/api";
import { orderFailed, orderPending, orderPlaced } from "../actions/api-state-action-creators";
import { resetBurger } from "../actions/current-burger-action-creators";
import { setOrderId } from "../actions/modals-action-creators";

const getOrderNumber = (allIngredientsId) => {
  return (dispatch) => {
    dispatch(orderPending());
    Api.addNewOrder(allIngredientsId)
    .then((data) => {
      dispatch(orderPlaced());
      dispatch(setOrderId(data.order.number))
      dispatch(resetBurger());
    })
    .catch((err) => {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      dispatch(orderFailed(`Ошибка при отправке заказа: ${errorText}`));
    })
  };
};

export default getOrderNumber;