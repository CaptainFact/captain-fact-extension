import { Record, List } from 'immutable'
import { State } from 'jumpstate'
import Statement from './record'


export const StatementsState = State('Statements', {
  initial: new Record({
    isLoading: false,
    errors: null,
    data: new List()
  })(),
  fetchSuccess(state, statements) {
    return state.merge({
      data: new List(
        statements.map(({comments, ...attributes}) =>
          new Statement({
            comments: new List(comments)
                .filter(c => c.score >= 0 && c.source !== null && c.approve !== null) // Approving / Refuting facts
                .sortBy(c => -c.score),
            ...attributes
          }))
      ).sortBy(st => st.time),
      isLoading: false
    })
  },
  fetchFailure(state, errors) {
    return state.merge({
      isLoading: false, errors
    })
  },
  setLoading(state, isLoading) {
    return state.set('isLoading', isLoading)
  }
})
