
import React,{useState, useMemo, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { StateProperty } from "../store/store";
import { dataUpdateAction, dataLoadingAction, dataLoadingErrorAction } from "../store/asyncReducer";
import { useDispatch, useSelector } from "react-redux";
import dummyData from '../Constants/dummyData'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import get from 'lodash/get'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360
  },
  inner: {
    maxWidth: 900,
    margin: '0 auto'
  },
  content: {
    width: '100%',
    backgroundColor: '#d3d3d3'
  },
  text: {
    fontSize: '2rem',
    fontWeight: 600
  },
  card: {
    background: '#fff',
    padding: '2rem',
    marginBottom: '2em',
    boxShadow: '0 1px 10px rgba(0,0,0)'
  },
  label: {
    padding: '10px 0',
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e6e6e6'
  },
  templateName: {
    display: 'block',
    width: '50%'
  },
  textField: {
    display: 'block'
  },
  addButton: {
    width: '200px'
  }
}));

export default function AddDeployementDetailCard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let templateNameArray = dummyData.map((el) =>  el.name )

  const [templateName, setTemplateName] = useState('')

  const [versionNumberArray, setVersionNumberArray] = useState([])

  const [versionNumber, setVersionNumber] = useState('')

  const [url, setUrl] = useState('')

  const [date, setDate] = useState('')

  const handleChangeTemplate = () => {
     if(!isEmpty(templateName)){
        let templateObject = dummyData.filter((el) => el.name === templateName);
        setVersionNumberArray(templateObject[0].versions)
     }
  }

  useMemo(handleChangeTemplate, [templateName])

  const isDisable = isEmpty(templateName) || isEmpty(url) || isEmpty(versionNumber) || isEmpty(date)

  const [makeRequest, setMakeRequest] = useState(false)

  const updateData = async (postUrl,obj) => {
    const apiData = await axios.post(postUrl,obj);
    return Promise.resolve({ data: apiData });
  };

  useEffect(()=> {
    if(makeRequest){
      const load = async () => {
        let obj = {templateName,url,versionNumber,date};
        let postUrl = 'http://localhost:5000/api/addDeployment'
        try {
          debugger
          const result = await updateData(postUrl,obj);
          dispatch(dataUpdateAction(StateProperty.deployments, result.data.data));
        } catch (e) {
          dispatch(dataLoadingErrorAction(StateProperty.deployments, e));
        }
      };
      dispatch(dataLoadingAction(StateProperty.deployments));
      load();
    }
  },[makeRequest])

  const updatedState = useSelector(state => state[StateProperty.deployments]);
  const result = get(updatedState,'result','');
  const notify = () => toast(result);
  if(!isEmpty(result)){
    notify()
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.inner}>
        <h2 className={classes.text}>Add Deployment Detail</h2>
        <form className={classes.card}>
            <label className={classes.label}>
                URL
                <input onChange={(el) => { setUrl(el.target.value)}} value={url} className={classes.input} type='text' name="url" />
            </label>
            <label className={classes.label}>
                Template Name
                <Select
                  className={classes.templateName}
                  value={templateName}
                  onChange={(event) => { setTemplateName(event.target.value)}}>
                    {
                      templateNameArray.map((val,index) => {
                        return <MenuItem key={index} value={val}>{val}</MenuItem>
                      })
                    }
                </Select>
            </label>
            <label className={classes.label}>
                Verstion Number
                <Select
                  className={classes.templateName}
                  value={versionNumber}
                  onChange={(event) => { setVersionNumber(event.target.value)}}>
                    {
                      versionNumberArray.map((val,index) => {
                        return <MenuItem key={index} value={val}>{val}</MenuItem>
                      })
                    }
                </Select>
            </label>

            <label className={classes.label}>
               Date
               <TextField
                  type="date"
                  defaultValue={date}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => {setDate(event.target.value)}}
                />
            </label>
            <Button variant="contained" className={classes.addButton} disabled={isDisable} onClick={() => {
            setMakeRequest(true)
            }}>
              Add
            </Button>
        </form>
      </div>
     </div>
     <ToastContainer />
    </div>
  );
}
