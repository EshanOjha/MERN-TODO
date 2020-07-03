// @flow
import React, { useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import Loading from '../Components/Loading'
import DeploymentDetailCard from '../Components/DeploymentDetailCard'
import get from 'lodash/get'
import { StateProperty } from "../store/store"
import {useApiRequest,getDeployments} from "../hooks/useApiRequest"
import axios from 'axios'
import { dataLoadingAction, dataLoadingErrorAction, dataDeleteAction } from "../store/asyncReducer"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import isEmpty from 'lodash/isEmpty'

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    display:'flex',
    alignItems:'center',
    flexDirection: 'column'
  },
  inner: {
    maxWidth: 900,
    margin: '0 auto'
  },
  content: {
    width: '100%',
    backgroundColor: '#d3d3d3'
  }
})

const Dashboard = ({ classes }) => {
  const dispatch = useDispatch();

  const deleteData = async (postUrl,obj) => {
    const apiData = await axios.post(postUrl,obj);
    return Promise.resolve({ data: apiData });
  };

  const deploymentsLoader = useCallback(
    getDeployments("http://localhost:5000/api/getAllDeployments",{method:'GET'}),
    []

  );

  useApiRequest(StateProperty.deployments,deploymentsLoader);

  const deploymentState = useSelector(state => state[StateProperty.deployments]);

  const data = get(deploymentState,'payload',[]);

  const isLoading = get(deploymentState,'isLoading',false);

  const handleDeleteClick = (val) => {
    const load = async () => {
      let postUrl = 'http://localhost:5000/api/deleteDeployment'
      try {
        const result = await deleteData(postUrl,val);
        dispatch(dataDeleteAction(StateProperty.deployments, result.data));
      } catch (e) {
        dispatch(dataLoadingErrorAction(StateProperty.deployments, e));
      }
    };
    dispatch(dataLoadingAction(StateProperty.deployments));
    load();
  }

  const updatedState = useSelector(state => state[StateProperty.deployments]);
  const result = get(updatedState,'result','');
  const isFetchingRecords = get(updatedState,'isFetchingRecords',false);
  const notify = () => toast(result);
  
  if(!isEmpty(result) && isFetchingRecords){
    notify();
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.inner}>
        {
          isLoading &&
           <Loading />
        }
        {
          data &&
            <DeploymentDetailCard  data={data} handleDeleteClick={handleDeleteClick}/>
        }
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default compose(withStyles(styleSheet))(Dashboard)
