import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as types from '../actions/types'


const user = (state={}, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return { ...action.data };
      break;
    default:
      return {}
  }
}
const assignees = (state=[], action) => {
  switch (action.type) {
    case types.ADD_ASSIGNEES:
      return [ ...action.data ]
    default:
      return []
  }
}

export default combineReducers({
    user,
    assignees,
    router: routerReducer
  })
