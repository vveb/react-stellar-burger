import { baseUrl, endpointURLs } from './constants.js'

const checkResponseOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  });
}

const goFetch = async ( { endpoint, data, method }) => {
  const options = {
    headers: {},
    method,
  }
  if (data) {
    options.method = method;
    options.body = JSON.stringify(data);
  }
  const res = await fetch(baseUrl + endpoint, options);
  return checkResponseOk(res);
}

const getIngredientsData = () => {
  return goFetch({ endpoint: endpointURLs.ingredients, method: 'GET' })
}

const addNewOrder = (ingredientsIdList) => {
  return goFetch({ endpoint: endpointURLs.orders, data: ingredientsIdList, method: 'POST' })
}

const Api = {
  getIngredientsData,
  addNewOrder,
}

export default Api;