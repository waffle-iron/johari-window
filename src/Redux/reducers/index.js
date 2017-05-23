import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as types from '../types'


const user = (state={}, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return { ...action.data };
    default:
      return state
  }
}
const assignees = (state=[], action) => {
  switch (action.type) {
    case types.ADD_ASSIGNEES:
      return [...action.data]

    default:
      return state
  }
}

const assignee = (state={}, action) => {
  switch (action.type) {
    case types.SET_ASSIGNEE:
      return { ...action.data }

    default:
      return state
  }
}

export default combineReducers({
    user,
    assignees,
    assignee,
    router: routerReducer
  })
