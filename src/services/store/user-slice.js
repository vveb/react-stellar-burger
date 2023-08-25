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
        console.log(message)
        return {message};
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при изменении пароля: ${errorText}`);
    };
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {

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
    .addCase(updatePasswordThunk.fulfilled, (_, action) => {
      const { password, token } = action.payload;
      return { password, token };
    })
});

export {
  registerNewUserThunk,
  loginUserThunk,
  updatePasswordThunk,
  resetPasswordThunk,
  };

export default userSlice.reducer;