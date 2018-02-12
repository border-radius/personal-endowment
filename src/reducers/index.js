import { combineReducers } from 'redux'
import { selectETF } from './selectETF'
import { candlesByETF } from './candlesByETF'
import { periodsByETF } from './periodsByETF'

const rootReducer = combineReducers({
    candlesByETF,
    periodsByETF,
    selectETF
})

export default rootReducer
