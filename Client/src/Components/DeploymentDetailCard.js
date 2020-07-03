
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import isEmpty from 'lodash/isEmpty';
import DeleteIcon from '@material-ui/icons/Delete';
import get from 'lodash/get';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360
  },
  text: {
    fontSize: '3rem',
    fontWeight: 600
  },
  deploymentList: {
    backgroundColor: '#fff',
    padding: '2em',
    boxShadow: '0 1px 10px rgba(0, 0, 0, 0.15)'
  },
  icon: {
    cursor: 'pointer'
  }
}));

export default function DeploymentDetailCard(props) {
  const classes = useStyles();
  let deploymentData = get(props,'data',[]);
  let result = get(props,'results','')
  const handleClick = (val) => { props.handleDeleteClick(val) };

  return (
    <div className={classes.root}>
     {
       isEmpty(deploymentData) &&
        <h2 className={classes.text}> Please Add Few Records</h2>
     }
     {
       !isEmpty(deploymentData) &&
       <div>
         <h2 className={classes.text}>All Deployment Details</h2>
         {
             result &&
             <div>{result}</div>
         }
         <List className={classes.deploymentList} component="nav">
         {
           deploymentData.map((val,index) => {
             return (
               <ListItem key={index}>
                 <ListItemIcon>
                   <InboxIcon />
                 </ListItemIcon>
                 <ListItemText primary={val.templateName}></ListItemText>
                 <ListItemText primary={val.url}></ListItemText>
                 <ListItemText primary={val.date}></ListItemText>
                 <ListItemIcon  className={classes.icon} onClick={()=> {handleClick(val)}}>
                    <DeleteIcon />
                 </ListItemIcon>
               </ListItem>
             )
           })
         }
         </List>
       </div>
     }
    </div>
  );
}
