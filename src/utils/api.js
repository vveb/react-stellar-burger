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

const goFetch = async ({ endpoint, data, method }) => {
  const options = {
    headers: method === 'GET' ? {} : { 'Content-Type': 'application/json' },
    method,
  }
  if (data) {
    options.method = method;
    options.body = JSON.stringify(data);
  }
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    options.headers.authorization = accessToken;
  };
  const res = await fetch(baseUrl + endpoint, options);
  return checkResponseOk(res);
}

export const refreshToken = () => {
  return goFetch({ endpoint: endpointURLs.refresh, data: {token: localStorage.getItem("refreshToken")}, method: 'POST' });
};

export const fetchWithRefresh = async ({ endpoint, data, method }) => {
  try {
    return await goFetch({ endpoint, data, method });
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return await goFetch({ endpoint, data, method }); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

const getIngredientsData = () => {
  return goFetch({ endpoint: endpointURLs.ingredients, method: 'GET' })
}

const addNewOrder = (ingredientsIdList) => {
  return goFetch({ endpoint: endpointURLs.orders, data: ingredientsIdList, method: 'POST' })
}
//data обычно называют dto - data transfer object (объект передачи данных)
const registerNewUser = (data) => {
  return goFetch({ endpoint: endpointURLs.register, data, method: 'POST' });
}

const loginUser = (data) => {
  return goFetch({ endpoint: endpointURLs.login, data, method: 'POST' });
};

const updatePassword = (data) => {
  return goFetch({ endpoint: endpointURLs.updatePassword, data, method: 'POST' });
}

const resetPassword = (data) => {
  return goFetch({ endpoint: endpointURLs.resetPassword, data, method: 'POST' });
}

const Api = {
  getIngredientsData,
  addNewOrder,
  registerNewUser,
  loginUser,
  updatePassword,
  resetPassword,
}

export default Api;