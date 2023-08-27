import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/api";

const initialUserState = {
  name: '',
  email: '',
};

const registerNewUserThunk = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success, accessToken, refreshToken } = await Api.registerNewUser(data) ?? {};
      if (success) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken);
        return {name, email};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при регистрации нового пользователя: ${errorText}`);
    };
  }
);

const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success, accessToken, refreshToken } = await Api.loginUser(data) ?? {};
      if (success) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken);
        return {name, email};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при входе в систему: ${errorText}`);
    };
  }
);

const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (data, { rejectWithValue }) => {
    try {
      const { message, success } = await Api.logoutUser(data) ?? {};
      if (success) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken');
        return {message};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при выходе из системы: ${errorText}`);
    };
  }
);

const updatePasswordThunk = createAsyncThunk(
  'user/update-password',
  async (data, { rejectWithValue }) => {
    try {
      const { message, success } = await Api.updatePassword(data) ?? {};
      if (success) {
        return {message};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при проверке e-mail: ${errorText}`);
    };
  }
);

const resetPasswordThunk = createAsyncThunk(
  'user/reset-password',
  async (data, { rejectWithValue }) => {
    try {
      const { message, success } = await Api.resetPassword(data) ?? {};
      if (success) {
        return { message };
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при изменении пароля: ${errorText}`);
    };
  }
);

const updateProfileInfoThunk = createAsyncThunk(
  'user/update-profile-info',
  async (data, { rejectWithValue }) => {
    try {
      const { user: { name, email }, success } = await Api.updateProfileInfo(data) ?? {};
      if (success) {
        return {name, email};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при обновлении данных пользователя: ${errorText}`);
    };
  }
);

const getProfileInfoThunk = createAsyncThunk(
  'user/get-profile-info',
  async (_, { rejectWithValue }) => {
    if (!localStorage.getItem('accessToken')) {
      return initialUserState;
    }
    try {
      const { user: { name, email }, success } = await Api.getProfileInfo() ?? {};
      if (success) {
        return {name, email};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при получении данных пользователя: ${errorText}`);
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (_, action) => action.payload,
  },
  extraReducers: (builder) => builder
    .addCase(registerNewUserThunk.fulfilled, (_, action) => { 
      const { name, email } = action.payload;
      return { name, email };
    })
    .addCase(loginUserThunk.fulfilled, (_, action) => {
      const { name, email } = action.payload;
      return { name, email };
    })
    .addCase(logoutUserThunk.fulfilled, () => {
      return initialUserState;
    })
    .addCase(updateProfileInfoThunk.fulfilled, (_, action) => {
      return action.payload;
    })
});

export {
  registerNewUserThunk,
  loginUserThunk,
  updatePasswordThunk,
  resetPasswordThunk,
  logoutUserThunk,
  updateProfileInfoThunk,
  getProfileInfoThunk,
  };

export const { setUser } = userSlice.actions;

export default userSlice.reducer;