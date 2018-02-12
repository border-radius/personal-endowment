import { combineReducers } from 'redux'
import { selectETF } from './selectETF'
import { candlesByETF } from './candlesByETF'
import { wallet } from './wallet'

const rootReducer = combineReducers({
    candlesByETF,
    selectETF,
    wallet
})

export default rootReducer
