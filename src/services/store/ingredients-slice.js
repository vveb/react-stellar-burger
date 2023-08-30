import Api from '../../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialIngredientsData = {data: null};

const getIngredientsDataThunk = createAsyncThunk(
  'ingredients/all',
  async (_, { rejectWithValue }) => {
    try {
      const {success, data} = await Api.getIngredientsData() ?? {};
      if (!!data && success) {
        return data;
      };
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
        const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
        return rejectWithValue(`Ошибка при загрузке данных с сервера: ${errorText}`);
      };
    }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsData,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getIngredientsDataThunk.fulfilled, (state, action) => {
      return {data: action.payload};
    })
});

export {getIngredientsDataThunk};
export default ingredientsSlice.reducer;