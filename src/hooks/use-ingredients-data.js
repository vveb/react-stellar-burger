import React from 'react';
import { useDispatch } from 'react-redux';
import Api from '../utils/api';
import { 
  ingredientsFailed,
  ingredientsRecieved,
  ingredientsRequested,
} from '../services/store/actions/api-action-creators';

const useIngredientsData = () => {

  const dispatch = useDispatch();
  
  const [ingredientsData, setIngredientsData] = React.useState(null);

  React.useEffect(() => {
    dispatch(ingredientsRequested());
    Api.getIngredientsData()
    .then((data) => {
      setIngredientsData(data.data);
      dispatch(ingredientsRecieved());
    })
    .catch((err) => {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      dispatch(ingredientsFailed(`Ошибка при загрузке данных с сервера: ${errorText}`));
      setIngredientsData(null);
  })}, [dispatch]);

  return ingredientsData;
};

export { useIngredientsData }