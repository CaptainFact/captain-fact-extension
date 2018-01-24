import { Record } from 'immutable'
import { State } from 'jumpstate'
import Video from './record'


export const VideoState = State('Video', {
  initial: new Record({
    isLoading: false,
    data: null
  })(),
  fetchSuccess(state, data) {
    return state.merge({
      isLoading: false,
      data: new Video(data)
    })
  },
  fetchFailure(state, errors) {
    console.log(`[CaptainFact] Error while fetching video info: ${errors}`)
    return state
  },
  setLoading(state, isLoading=true) {
    return state.set('isLoading', true)
  }
})

