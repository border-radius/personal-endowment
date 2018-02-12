import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    selectETF,
    fetchETFIfNeeded,
    selectPeriod,
    selectSum,
    updateWallet
} from '../actions'

import SelectETF from '../components/select-etf'
import SelectPeriod from '../components/select-period'

class App extends Component {
    componentDidMount() {
        const { dispatch, selected } = this.props
        dispatch(fetchETFIfNeeded(selected))
    }

    componentWillReceiveProps(nextProps) {
        const {
            dispatch,
            candles,
            selected,
            period,
            sum
        } = nextProps

        const etfChanged = selected !== this.props.selected
        const sumChanged = sum !== this.props.sum
        const periodChanged = period !== this.props.period
        const candlesChanged = candles !== this.props.candles
        const candlesNotEmpty = candles && candles.length
        const candlesUpdated = candlesChanged && candlesNotEmpty
        const somethingChanged = candlesChanged || sumChanged || periodChanged

        if (etfChanged) {
            dispatch(fetchETFIfNeeded(selected))
        }

        if (somethingChanged) {
            const availableCandles = candles.filter(candle => candle[0] >= period)
            dispatch(updateWallet(availableCandles, sum))
        }
    }

    changeSum(event) {
        const nextSum = event.target.value
        this.props.dispatch(selectSum(nextSum))
    }

    render() {
        const styles = {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
        }

        const changeSum = this.changeSum.bind(this)

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
                <input type="number" onChange={ changeSum } value={ this.props.sum } />
                <span>начиная с</span>
                <SelectPeriod />
                <span>я бы потратил в сумме ${ spent }</span>
                <span>и имел бы сейчас портфель стоимостью ${ worth }</span>
                <span>что на ${ profit } { type } чем я вложил.</span>
                <span>Средняя доходность ${ profit_per_month } в месяц.</span>
                <pre style={ styles }>
                    { JSON.stringify(this.props) }
                </pre>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { select, history, wallet } = state
    const {
        ETFNames,
        selected,
        period,
        sum
    } = select || {
        ETFNames: {},
        selected: '',
        period: 0,
        sum: 0
    }

    const {
        isFetching,
        lastUpdated,
        candles
    } = history[selected] || {
        isFetching: true,
        candles: []
    }

    return {
        ETFNames,
        selected,
        period,
        sum,
        candles,
        isFetching,
        lastUpdated,
        wallet
    }
}

export default connect(mapStateToProps)(App)
