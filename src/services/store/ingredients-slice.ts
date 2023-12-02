import Api from '../../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrorResponse, Ingredient } from '../types';

export type IngredientsData = {
  data: Ingredient[] | null;
};

const initialIngredientsData: IngredientsData = {data: null};

const getIngredientsDataThunk = createAsyncThunk(
  'ingredients/all',
  async (_, { rejectWithValue }) => {
    try {
      const {success, data} = await Api.getIngredientsData() ?? {};
      if (!!data && success) {
        return data;
      };
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const { statusCode, message } = err as unknown as ErrorResponse;
        const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
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