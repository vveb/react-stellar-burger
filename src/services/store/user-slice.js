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
});

export { registerNewUserThunk, loginUserThunk };

export default userSlice.reducer;