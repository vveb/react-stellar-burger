import React from 'react';
import Api from '../utils/api';
import { INGREDIENTS_FAILED, INGREDIENTS_RECIEVED, INGREDIENTS_REQUESTED } from '../utils/constants';
import { ingredientsFailed, ingredientsRecieved, setApiError } from '../utils/action-creators';

const useIngredientsData = (apiStateDispatcher) => {

  const [ingredientsData, setIngredientsData] = React.useState(null);

  React.useEffect(() => {
    apiStateDispatcher({type: INGREDIENTS_REQUESTED});
    Api.getIngredientsData()
    .then((data) => {
      setIngredientsData(data.data);
      apiStateDispatcher(ingredientsRecieved());
    })
    .catch((err) => {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      apiStateDispatcher(ingredientsFailed(`Ошибка при загрузке данных с сервера: ${errorText}`));
      setIngredientsData(null);
  })}, []);

  return ingredientsData;
};

export { useIngredientsData }