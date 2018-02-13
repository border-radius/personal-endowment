import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputSum from '../input-sum'
import SelectETF from '../select-etf'
import SelectPeriod from '../select-period'
import Money from '../money'
import { updateWallet } from '../../actions'
import styles from './styles.css'

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
        const type2 = profit > 0 ? 'дорожали' : 'дешевели'

        return (
            <div className={ styles.calculator }>
                <div className={ styles.inner }>
                    <p>
                        Если бы я покупал
                        <SelectETF />
                        каждый месяц на
                        <InputSum />
                        начиная с
                        <SelectPeriod />
                        я бы потратил в сумме
                        <Money value={ spent } />
                        и имел бы сейчас портфель стоимостью
                        <Money value={ worth } />
                        что на
                        <Money value={ profit } abs={ true } />
                        { type } чем я вложил.
                    </p>
                    <p>
                        В среднем, мои инвестиции { type2 } на
                        <Money value={ profit_per_month } abs={ true } />
                        в месяц.
                    </p>
                </div>
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
