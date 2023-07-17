import { combineReducers } from "redux";
import apiStateReducer from "./api-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
});

export default rootReducer;