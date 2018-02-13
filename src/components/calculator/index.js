import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputSum from '../input-sum'
import SelectETF from '../select-etf'
import SelectPeriod from '../select-period'
import { updateWallet } from '../../actions'

class Calculator extends Component {
    componentWillReceiveProps(nextProps) {
        const {
            dispatch,
            candles,
            period,
            sum
        } = nextProps

        const sumChanged = sum !== this.props.sum
        const periodChanged = period !== this.props.period
        const candlesChanged = candles !== this.props.candles
        const candlesNotEmpty = candles && candles.length
        const candlesUpdated = candlesChanged && candlesNotEmpty
        const somethingChanged = candlesChanged || sumChanged || periodChanged

        if (somethingChanged) {
            const availableCandles = candles.filter(candle => candle[0] >= period)
            dispatch(updateWallet(availableCandles, sum))
        }
    }

    render() {
        const spent = this.props.wallet.spent
        const worth = this.props.wallet.worth.toFixed(2)
        const profit = this.props.wallet.profit.toFixed(2)
        const profit_per_month = this.props.wallet.profit_per_month.toFixed(2)
        const type = profit > 0 ? 'больше' : 'меньше'

        return (
            <div>
                <span>Если бы я покупал</span>
                <SelectETF />
                <span>каждый месяц на $</span>
                <InputSum />
                <span>начиная с</span>
                <SelectPeriod />
                <span>я бы потратил в сумме ${ spent }</span>
                <span>и имел бы сейчас портфель стоимостью ${ worth }</span>
                <span>что на ${ profit } { type } чем я вложил.</span>
                <span>Средняя доходность ${ profit_per_month } в месяц.</span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { select, history, wallet } = state
    const {
        selected,
        period,
        sum
    } = select

    const { candles } = history[selected] || { candles: [] }

    return {
        period,
        sum,
        candles,
        wallet
    }
}

export default connect(mapStateToProps)(Calculator)
