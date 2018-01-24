import { createStore, combineReducers, applyMiddleware, compose } from "redux"
// import logger from 'redux-logger'
// import { ENV } from 'config'
import { CreateJumpstateMiddleware } from 'jumpstate'

import { StatementsState } from '../Statement/reducer'
import { VideoState } from '../Video/reducer'
import { PlaybackState } from './playback_reducer'
import { InterfaceState } from './interface_reducer'


// Declare reducers
const reducers = combineReducers({
  Video: VideoState,
  Statements: StatementsState,
  Interface: InterfaceState,
  Playback: PlaybackState
})


// Declare middlewares
const middlewares = [CreateJumpstateMiddleware()]
// if (ENV === 'dev')
//   middlewares.push(logger)


// Build store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const getStore = () => createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)))

export default getStore
