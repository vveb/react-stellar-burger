import React from 'react';
import Api from '../utils/api';

const useIngredientsData = () => {

  const [state, setState] = React.useState({success: false, data: []});

  React.useEffect(() => {
    Api.getIngredientsData()
    .then((data) => setState({success: data.success, data: data.data}))
    .catch((err) => {
      if (err.statusCode) {
        console.log(err.message);
      } else {
        console.log('Connection trouble, check your network');
      }
      
  })}, []);

  return state;
};

export { useIngredientsData }