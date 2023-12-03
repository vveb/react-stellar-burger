import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/api";
import { DictionaryStrStr, ErrorResponse } from "../types";

export type UserState = {
  name: string;
  email: string;
  isAuthChecked: boolean;
}

const initialUserState: UserState = {
  name: '',
  email: '',
  isAuthChecked: false,
};

const registerNewUserThunk = createAsyncThunk(
  'user/register',
  async (data: DictionaryStrStr, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success, accessToken, refreshToken } = await Api.registerNewUser(data) ?? {};
      if (success) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken);
        return {name, email};
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при регистрации нового пользователя: ${errorText}`);
    };
  }
);

const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: DictionaryStrStr, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success, accessToken, refreshToken } = await Api.loginUser(data) ?? {};
      if (success) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken);
        return {name, email};
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при входе в систему: ${errorText}`);
    };
  }
);

const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const data =  { token: localStorage.getItem('refreshToken') };
    try {
      const { message, success } = await Api.logoutUser(data) ?? {};
      if (success) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken');
        return {message};
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при выходе из системы: ${errorText}`);
    };
  }
);

const forgotPasswordThunk = createAsyncThunk(
  'user/update-password',
  async (data: DictionaryStrStr, { rejectWithValue }) => {
    try {
      localStorage.setItem('isForgotPasswordSent', 'false');
      const { message, success } = await Api.forgotPassword(data) ?? {};
      if (success) {
        localStorage.setItem('isForgotPasswordSent', 'true');
        return {message};
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      localStorage.setItem('isForgotPasswordSent', 'false');
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при проверке e-mail: ${errorText}`);
    };
  }
);

const resetPasswordThunk = createAsyncThunk(
  'user/reset-password',
  async (data: DictionaryStrStr, { rejectWithValue }) => {
    try {
      const { message, success } = await Api.resetPassword(data) ?? {};
      if (success) {
        localStorage.removeItem('isForgotPasswordSent');
        return { message };
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при изменении пароля: ${errorText}`);
    };
  }
);

const updateProfileInfoThunk = createAsyncThunk(
  'user/update-profile-info',
  async (data: DictionaryStrStr, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success } = await Api.updateProfileInfo(data) ?? {};
      if (success) {
        return {name, email};
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при обновлении данных пользователя: ${errorText}`);
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setAuthChecked: (state, action) => ({ ...state, isAuthChecked: action.payload }),
    setUser: (state, action) => ({ ...state, ...action.payload }),
  },
  extraReducers: (builder) => builder
    .addCase(registerNewUserThunk.fulfilled, (state, action) => { 
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isAuthChecked = true;
      // return { ...state, name, email, isAuthChecked: true };
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isAuthChecked = true;
      // return { ...state, name, email, isAuthChecked: true };
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      // return {...state, name: '', email: ''};
    })
    .addCase(updateProfileInfoThunk.fulfilled, (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      // return action.payload;
    })
});

export {
  registerNewUserThunk,
  loginUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  logoutUserThunk,
  updateProfileInfoThunk,
  };

export const { setUser, setAuthChecked } = userSlice.actions;

export default userSlice.reducer;