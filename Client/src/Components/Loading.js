// @flow weak

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'

const styleSheet = theme => ({
  btnContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex'
  },
  pageCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center'
  },
  primaryColor: {
    color: '#792877'
  }
})

function Loading (props) {
  const {classes, center = true, size} = props

  return (
    <div className={classNames(classes.btnContainer, { [classes.pageCenter]: center})}>
      <CircularProgress size={size} classes={{colorPrimary: classes.primaryColor}} />
    </div>
  )
}

export default withStyles(styleSheet)(Loading)
