import { combineReducers, createStore } from "redux";
import { getAsyncDataReducer } from "./asyncReducer";

export const StateProperty = {
  add : "add",
  deployments : "deployments"
}

const allAsyncReducers = Object.keys(StateProperty).reduce(
  (acc: any, stateProperty: StateProperty) => {
    acc[stateProperty] = getAsyncDataReducer(stateProperty);
    return acc;
  },
  {}
);

export const store = createStore(combineReducers(allAsyncReducers));
