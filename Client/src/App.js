import React from 'react'
import { connect } from 'react-redux'
import {  Router } from "@reach/router"
import Dashboard from './Containers/Dashboard'
import AddDeployementDetailCard from './Components/AddDeployementDetailCard'
import Header from './Containers/Header'
import './App.css'

const App = () => {
  return (
    <div id="App">
      <Header />
      <Router>
        <Dashboard path="/" />
        <AddDeployementDetailCard path="/add" />
      </Router>
    </div>
  )
}

export default connect(null, null)(App)
