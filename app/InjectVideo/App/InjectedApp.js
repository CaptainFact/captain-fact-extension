import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import { InterfaceState } from './interface_reducer'
import App from './App.js'
import CFButton from '../CFButton/CFButton'


export default class InjectedApp extends React.Component {
  componentDidMount() {
    const injectDOM = document.createElement('div')
    injectDOM.className = ''
    const refNode = document.getElementsByClassName('ytp-cards-button')[0]
    refNode.parentNode.insertBefore(injectDOM, refNode.nextSibling)
    ReactDOM.render(
      <Provider store={store}>
        <CFButton onClick={InterfaceState.openSidebar}/>
      </Provider>, injectDOM
    )
  }

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}