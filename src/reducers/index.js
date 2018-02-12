import { combineReducers } from 'redux'
import { selectETF } from './selectETF'
import { candlesByETF } from './candlesByETF'

const rootReducer = combineReducers({
    candlesByETF,
    selectETF
})

export default rootReducer
