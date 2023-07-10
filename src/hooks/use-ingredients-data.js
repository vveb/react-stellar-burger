import React from 'react';
import Api from '../utils/api';

const useIngredientsData = () => {

  const [state, setState] = React.useState({success: false, hasError: false, errorText: null, data: []});

  React.useEffect(() => {
    Api.getIngredientsData()
    .then((data) => setState({...state, success: data.success, data: data.data}))
    .catch((err) => {
      const error = err.statusCode ? err.message : 'Connection trouble, check your network'
      setState({...state, hasError: true, errorText: error});
  })}, []);

  return state;
};

export { useIngredientsData }