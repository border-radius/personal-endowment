import { REQUEST_ETF, RECEIVE_ETF } from '../actions'
import { getPeriods } from '../lib/getPeriods'

const periods = (state = [], action) => {
    switch (action.type)  {
        case REQUEST_ETF:
            return []
        case RECEIVE_ETF:
            return getPeriods(action.candles[0])
        default:
            return state
    }
}

export const periodsByETF = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ETF:
        case RECEIVE_ETF:
            return {
                ...state,
                [action.etf]: periods(state[action.etf], action)
            }
        default:
            return state
    }
}
