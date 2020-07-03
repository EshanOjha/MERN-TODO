import { Action } from "./types";
import cloneDeep from 'lodash/cloneDeep';

export const LOADING = (stateProperty =''): string =>
  `${stateProperty}/loading`;
export const UPDATE_DATA = (stateProperty =''): string =>
  `${stateProperty}/updateData`;
export const LOAD_ERROR = (stateProperty =''): string =>
  `${stateProperty}/loaderror`;
export const FETCH_DATA = (stateProperty = ''): string =>
   `${stateProperty}/fetchData`
export const DELETE_DATA = (stateProperty = ''): string =>
      `${stateProperty}/deleteData`


export const dataLoadingAction = (stateProperty = '') => ({
  payload: {},
  type: LOADING(stateProperty)
});

export const dataFetchAction = (
  stateProperty='',
  payload: ''
) => ({
  payload,
  type: FETCH_DATA(stateProperty)
});

export const dataDeleteAction = (
  stateProperty='',
  payload: ''
) => ({
  payload,
  type: DELETE_DATA(stateProperty)
});

export const dataUpdateAction = (
  stateProperty='',
  payload: ''
) => ({
  payload,
  type: UPDATE_DATA(stateProperty)
});

export const dataLoadingErrorAction = (
  stateProperty: '',
  error: ''
) => ({
  payload: error,
  type: LOAD_ERROR(stateProperty)
});

const initialState = {
  isLoading: false,
  loadError: false,
  loadErrorDetails: {},
  payload: [],
  result: '',
  isFetchingRecords: false
}

export const getAsyncDataReducer = (stateProperty='') => {
  const reducer = (
    state = initialState,
    action = Action
  ) => {
    switch (action.type) {
      case LOADING(stateProperty):
        return {
          ...state,
          isLoading: true,
          loadErrorDetails: null
        };
      case UPDATE_DATA(stateProperty):
        return {
          ...state,
          isLoading: false,
          loadErrorDetails: null,
          result: action.payload.message,
          isFetchingRecords: false
        };
      case DELETE_DATA(stateProperty):
        let copiedState = cloneDeep(state)
        let payload = copiedState.payload.filter((val)=> val._id !== action.payload.data.id)
        return {
          ...state,
          isLoading: false,
          loadErrorDetails: null,
          result: action.payload.data.message,
          payload:payload,
          isFetchingRecords: true
        }
      case FETCH_DATA(stateProperty):
          return {
            ...state,
            isLoading: false,
            loadErrorDetails: null,
            payload: action.payload,
            result: '',
            isFetchingRecords: true
          };
      case LOAD_ERROR(stateProperty):
        return {
          ...state,
          isLoading: false,
          loadError: true,
          loadErrorDetails: action.payload
        };
      default:
        return state;
    }
  };
  return reducer;
};
