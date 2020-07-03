import Loading from '../Components/Loading'
import React from 'react'

const MyLoadingComponent = (props) => {
  if (props.error) {
    console.log('Error:', props.error)
    return <div>Error! Sorry, there was a problem loading the page.</div>
  } else if (props.pastDelay) {
    return <Loading />
  } else {
    return null
  }
}

export default MyLoadingComponent
