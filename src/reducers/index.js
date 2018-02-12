import { combineReducers } from 'redux'
import { select } from './select'
import { history } from './history'
import { wallet } from './wallet'

const rootReducer = combineReducers({
    history,
    select,
    wallet
})

export default rootReducer
