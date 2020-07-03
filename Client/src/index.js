import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { store } from "./store/store"
import './index.css'
import App from './App'

const Root = () => (
  <StoreProvider store={store}>
      <App />
   </StoreProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
