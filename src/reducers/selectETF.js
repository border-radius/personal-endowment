import { SELECT_ETF, SELECT_PERIOD, SELECT_SUM } from '../actions'

const ETFNames = {
    'fxau': 'акции австралийских компаний',
    'fxcn': 'акции китайских компаний',
    'fxde': 'акции немецких компаний',
    'fxit': 'акции IT-сектора США',
    'fxjp': 'акции японских компаний',
    'fxuk': 'акции английских компаний',
    'fxus': 'акции американских компаний'
}

export const selectETF = (state = {
    ETFNames,
    selected: 'fxau',
    period: 0,
    sum: 100
}, action) => {
    console.log(action)
    switch (action.type) {
        case SELECT_ETF:
            return {
                ...state,
                selected: action.etf
            }
        case SELECT_PERIOD:
            return {
                ...state,
                period: action.period
            }
        case SELECT_SUM:
            return {
                ...state,
                sum: parseInt(action.sum) || 0
            }
        default:
            return state
    }
}
