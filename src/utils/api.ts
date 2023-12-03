import { AddNewOrderRequest, AddNewOrderResponse, DictionaryStrStr, ErrorResponse, FetchOptions, FetchParameters, ForgotPasswordResponse, GetIngredientsResponse, GetOrderInfoResponse, GetProfileInfoResponse, LoginUserResponse, LogoutRequest, LogoutResponse, RefreshTokenResponse, RegisterNewUserResponse, ResetPasswordResponse, UpdateProfileInfoResponse } from '../services/types/index.js';
import { baseUrl, endpointURLs } from './constants';

const checkResponseOk = (res: Response) => {
  if (res.ok) {
    return res.json();
  };
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  });
};

const goFetch = async <T, R>({ endpoint, data, method = 'GET' }: FetchParameters<T>): Promise<R> => {
  
  const options: FetchOptions = {
    headers: method === 'GET' ? {} : { 'Content-Type': 'application/json' },
    method,
  };
  if (data) {
    options.method = method;
    options.body = JSON.stringify(data);
  };
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    options.headers.authorization = accessToken;
  };
  const res = await fetch(baseUrl + endpoint, options);
  return checkResponseOk(res);
};

export const refreshToken = (): Promise<RefreshTokenResponse> => {
  return goFetch({ endpoint: endpointURLs.refresh, data: {token: localStorage.getItem("refreshToken")}, method: 'POST' });
};

export const fetchWithRefresh = async <T, R>({ endpoint, data, method = 'GET' }: FetchParameters<T>): Promise<R> => {
  try {
    return await goFetch({ endpoint, data, method });
  } catch (err) {
    const { message } = err as unknown as ErrorResponse;
    if (message === "jwt expired" || message === "jwt malformed") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      };
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return await goFetch({ endpoint, data, method }); //повторяем запрос
    } else {
      return Promise.reject(err);
    };
  };
};

const getIngredientsData = () => {
  return goFetch<never, GetIngredientsResponse>({ endpoint: endpointURLs.ingredients, method: 'GET' });
};

const addNewOrder = (ingredientsIdList: {ingredients: string[]}) => {
  return fetchWithRefresh<AddNewOrderRequest, AddNewOrderResponse>({ endpoint: endpointURLs.orders, data: ingredientsIdList, method: 'POST' });
};
//data обычно называют dto - data transfer object (объект передачи данных)
const registerNewUser = (data: DictionaryStrStr) => {
  return goFetch<DictionaryStrStr, RegisterNewUserResponse>({ endpoint: endpointURLs.register, data, method: 'POST' });
};

const loginUser = (data: DictionaryStrStr) => {
  return goFetch<DictionaryStrStr, LoginUserResponse>({ endpoint: endpointURLs.login, data, method: 'POST' });
};

const logoutUser = (data: LogoutRequest) => {
  return fetchWithRefresh<LogoutRequest, LogoutResponse>({ endpoint: endpointURLs.logout, data, method: 'POST' });
};

const forgotPassword = (data: DictionaryStrStr) => {
  return goFetch<DictionaryStrStr, ForgotPasswordResponse>({ endpoint: endpointURLs.forgotPassword, data, method: 'POST' });
};

const resetPassword = (data: DictionaryStrStr) => {
  return goFetch<DictionaryStrStr, ResetPasswordResponse>({ endpoint: endpointURLs.resetPassword, data, method: 'POST' });
};

const updateProfileInfo = (data: DictionaryStrStr) => {
  return fetchWithRefresh<DictionaryStrStr, UpdateProfileInfoResponse>({ endpoint: endpointURLs.profileInfo, data, method: 'PATCH' });
};

const getProfileInfo = () => {
  return fetchWithRefresh<never, GetProfileInfoResponse>({ endpoint: endpointURLs.profileInfo, method: 'GET' });
};

const getOrderInfo = (orderNumber: string | undefined) => {
  return fetchWithRefresh<never, GetOrderInfoResponse>({ endpoint: `${endpointURLs.orders}/${orderNumber}`, method: 'GET' });
}

const Api = {
  getIngredientsData,
  addNewOrder,
  registerNewUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateProfileInfo,
  getProfileInfo,
  getOrderInfo,
};

export default Api;