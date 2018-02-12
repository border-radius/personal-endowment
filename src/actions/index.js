export const REQUEST_ETF = 'REQUEST_ETF'
export const RECEIVE_ETF = 'RECEIVE_ETF'
export const SELECT_ETF = 'SELECT_ETF'
export const SELECT_PERIOD = 'SELECT_PERIOD'
export const SELECT_SUM = 'SELECT_SUM'
export const ADD_TO_WALLET = 'ADD_TO_WALLET'
export const CLEAR_WALLET = 'CLEAR_WALLET'

export const selectETF = etf => ({
    type: SELECT_ETF,
    etf
})

export const requestETF = etf => ({
    type: REQUEST_ETF,
    etf
})

export const receiveETF = (etf, json) => ({
    type: RECEIVE_ETF,
    etf,
    candles: json.candles,
    receivedAt: Date.now()
})

export const selectPeriod = period => ({
    type: SELECT_PERIOD,
    period
})

export const selectSum = sum => ({
    type: SELECT_SUM,
    sum
})

export const addToWallet = (candle, sum) => ({
    type: ADD_TO_WALLET,
    period: candle[0],
    price: candle[1],
    sum
})

export const clearWallet = () => ({
    type: CLEAR_WALLET
})

export const updateWallet = (candles, sum) => dispatch => {
    dispatch(clearWallet())
    candles.forEach(candle => dispatch(addToWallet(candle, sum)))
}

const fetchETF = etf => dispatch => {
    dispatch(requestETF(etf))
    return fetch(`http://localhost:4444/data/${ etf }.json`)
        .then(response => response.json())
        .then(json => dispatch(receiveETF(etf, json)))
}

const shouldFetchETF = (state, etf) => {
    const etfState = state[etf]

    if (!etfState) {
        return true
    }

    return false
}

export const fetchETFIfNeeded = etf => (dispatch, getState) => {
    if (shouldFetchETF(getState(), etf)) {
        return dispatch(fetchETF(etf))
    }
}
