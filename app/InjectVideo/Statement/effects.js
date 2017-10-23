import { Effect } from 'jumpstate'
import { StatementsState } from './reducer'
import HttpApi from '../../Common/lib/http_api'


export const fetchStatements = new Effect('fetchStatements', videoId => {
  const url = `/videos/${videoId}/statements`
  StatementsState.setLoading(true)
  HttpApi.get(url)
    .then(StatementsState.fetchSuccess)
    .catch(StatementsState.fetchFailure)
})