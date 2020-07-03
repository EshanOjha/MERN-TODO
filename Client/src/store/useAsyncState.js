import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dataLoadingAction,
  dataLoadingErrorAction,
  dataFetchAction
} from "./asyncReducer";

export const useAsyncStateHook = ({stateProperty, dispatch, loader, stateValue}) => {
  useEffect(() => {
    const load = async () => {
      try {
        const result = await loader();
        dispatch(dataFetchAction(stateProperty, result.data.data));
      } catch (e) {
        dispatch(dataLoadingErrorAction(stateProperty, e));
      }
    };
    dispatch(dataLoadingAction(stateProperty));
    load();
  }, [loader, stateProperty, dispatch]);
  //return stateValue;
};

export const useAsyncState = (stateProperty,loader) => {
  const dispatch = useDispatch();
  const stateValue = useSelector( state => state[stateProperty]);
  useAsyncStateHook({ stateProperty, dispatch, loader, stateValue });
};
