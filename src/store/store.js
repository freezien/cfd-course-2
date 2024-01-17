import { combineReducers, createStore } from "redux";
import counterReducer from "../reducers/counterReducer";

const reducers = combineReducers({
  counter: counterReducer,
});

const store = createStore(counterReducer);

export default store;
