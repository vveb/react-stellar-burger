import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  currentIngredient: null,
  isIngredientDragging: false,
};

const UIStateSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload.itemData;
    },
    // ({...state, currentIngredient: action.payload.itemData}),
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
    // ({...state, currentIngredient: null}),
    setIsIngredientDragging: (state, action) => {
      state.isIngredientDragging = action.payload.isDrag;
    },
    // ({...state, isIngredientDragging: action.payload.isDrag}),
  }
});

export const {
  setCurrentIngredient,
  clearCurrentIngredient,
  setIsIngredientDragging
} = UIStateSlice.actions;

export default UIStateSlice.reducer;