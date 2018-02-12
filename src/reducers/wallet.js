import { CLEAR_WALLET, ADD_TO_WALLET } from '../actions'

export const wallet = (state = {
    amounts: [],
    length: 0,
    spent: 0,
    worth: 0
}, action) => {
    switch (action.type) {
        case CLEAR_WALLET:
            return {
                amounts: [],
                length: 0,
                spent: 0,
                worth: 0
            }
        case ADD_TO_WALLET:
            const amount = action.sum / action.price
            const amounts = [...state.amounts, amount]
            const total = amounts.reduce((amount, sum) => amount + sum, 0)
            const worth = total * action.price
            const length = amounts.length
            const spent = length * action.sum

            return {
                amounts,
                length,
                spent,
                worth
            }
        default:
            return state
    }
}
