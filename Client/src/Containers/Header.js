import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import StoreIcon from '@material-ui/icons/Store'
import AddIcon from '@material-ui/icons/Add'
import { Link } from "@reach/router"

const styleSheet = theme => ({
  nav: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
    background: '#000',
    width: '100%',
    height: '70px'
  },
  navSection: {
    display: 'flex',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-around'
 },
  navItem: {
    display: 'flex',
    color: '#fff',
    cursor: 'pointer'
  },
  navLink: {
    color: '#fff'
  }
})


const Header = ({classes}) => {
   return (
     <nav className={classes.nav}>
        <div className={classes.navSection}>
           <li className={classes.navItem}>
             <div>Hello All !</div>
           </li>
           <li className={classes.navItem}>
             <Link className={classes.navLink}  to="/">
                <StoreIcon fontSize='large'/>
                <div>View All</div>
             </Link>
           </li>
           <li className={classes.navItem}>
             <Link className={classes.navLink} to="/add">
                <AddIcon fontSize='large' />
                <div>Add</div>
             </Link>
           </li>
        </div>
     </nav>
   )
}

export default compose(withStyles(styleSheet))(Header)
