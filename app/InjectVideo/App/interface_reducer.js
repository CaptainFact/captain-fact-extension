import { Record } from 'immutable'
import { State } from 'jumpstate'


export const InterfaceState = State('Interface', {
  initial: new Record({
    sidebarCollapsed: true
  })(),
  openSidebar(state) {
    return state.set('sidebarCollapsed', false)
  },
  closeSidebar(state) {
    return state.set('sidebarCollapsed', true)
  }
})

