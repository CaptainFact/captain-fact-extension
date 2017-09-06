import { Effect } from 'jumpstate'
import HttpApi from '../../Common/lib/http_api'
import { VideoState } from '../Video/reducer'


export const checkIfVideoExists = new Effect('checkIfVideoExists', videoUrl => {
  VideoState.setLoading(true)
  HttpApi.post('/extension_api/search/video', {url: videoUrl})
    .then(v => v ? VideoState.fetchSuccess(v) : VideoState.setLoading(false))
    .catch(VideoState.fetchFailure)
})