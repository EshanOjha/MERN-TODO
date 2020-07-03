import { useAsyncState } from "../../store/useAsyncState";
import { dataUpdateAction, dataLoadingAction, dataLoadingErrorAction } from "../../store/asyncReducer";
import { useDispatch } from "react-redux";
import axios from 'axios'
import get from 'lodash/get'
export const useApiRequest = (statePropValue,deploymentsLoader) => {
  useAsyncState(statePropValue, deploymentsLoader);
  //return deployments;
};

export const getDeployments = (url='',data={}) => () => {
  const getData = async () => {
    let getMethod = get(data,'method','GET')
    if(getMethod === 'GET'){
      const apiData = await axios.get(url);
      return Promise.resolve({ data: apiData });
    }
    if(getMethod === 'POST'){
      let obj = get(data,'postBody',{})
      const apiData = await axios.post(url,obj);
      return Promise.resolve({ data: apiData });
    }
  };
  return getData();
};

const updateData = async (postUrl,obj) => {
  const apiData = await axios.post(postUrl,obj);
  return Promise.resolve({ data: apiData });
};


export const useApiRequestPost = (property,postUrl,obj) => {
  const dispatch = useDispatch()
  const load = async () => {
    try {
      const result = await updateData(postUrl,obj);
      dispatch(dataUpdateAction(property, result.data.data));
    } catch (e) {
      dispatch(dataLoadingErrorAction(property, e));
    }
  };
  dispatch(dataLoadingAction(property));
  load();
}
