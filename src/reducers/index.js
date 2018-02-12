import { combineReducers } from 'redux'
import { select } from './select'
import { candlesByETF } from './candlesByETF'
import { wallet } from './wallet'

const rootReducer = combineReducers({
    candlesByETF,
    select,
    wallet
})

export default rootReducer
