import { REQUEST_ETF, RECEIVE_ETF } from '../actions'

const etf = (state = {
    isFetching: false,
    candles: []
}, action) => {
    switch (action.type) {
        case REQUEST_ETF:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_ETF:
            return {
                ...state,
                isFetching: false,
                candles: action.candles,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export const candlesByETF = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ETF:
        case REQUEST_ETF:
            return {
                ...state,
                [action.etf]: etf(state[action.etf], action)
            }
        default:
            return state
    }
}
