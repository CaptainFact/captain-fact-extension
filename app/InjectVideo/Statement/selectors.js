import { createSelector } from 'reselect'
// import { createCachedSelector } from 're-reselect'

import { STATEMENT_FOCUS_TIME } from "../../Common/lib/constants"


// TODO Make this cached
export const getFocusedStatement = createSelector(
  state => state.Statements.data,
  state => state.Playback.position,
  (statements, position) => {
    if (position === null)
      return null
    const statement = statements.findLast(st =>
      position >= st.time && position <= st.time + STATEMENT_FOCUS_TIME
    )
    return statement || null
  }
)
