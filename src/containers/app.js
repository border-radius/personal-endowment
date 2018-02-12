import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    selectETF,
    fetchETFIfNeeded,
    selectPeriod,
    selectSum,
    updateWallet
} from '../actions'

const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

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

        console.log('will receive props')

        if (selected !== this.props.selected) {
            dispatch(fetchETFIfNeeded(selected))
        }

        console.log(sum, this.props.sum)

        if (sum !== this.props.sum) {
            console.log('HERE!')
            const availableCandles = candles.filter(candle => candle[0] >= period)
            dispatch(updateWallet(availableCandles, sum))
        }
    }

    changeETF(event) {
        const nextETF = event.target.value
        this.props.dispatch(selectETF(nextETF))
    }

    changePeriod(event) {
        const nextPeriod = event.target.value
        this.props.dispatch(selectPeriod(nextPeriod))
    }

    changeSum(event) {
        const nextSum = event.target.value
        this.props.dispatch(selectSum(nextSum))
    }

    getPeriodName(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth()
        const monthName = monthList[month]

        return [ monthName, year ].join(' ')
    }

    render() {
        const styles = {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
        }

        const { ETFNames, selected } = this.props
        const ETFIDs = Object.keys(ETFNames)
        const changeETF = this.changeETF.bind(this)
        const changePeriod = this.changePeriod.bind(this)
        const changeSum = this.changeSum.bind(this)

        return (
            <div>
                <select onChange={ changeETF } value={ selected }>
                    { ETFIDs.map(id => (
                        <option key={ id } value={ id }>
                            { ETFNames[id] }
                        </option>
                    )) }
                </select>
                <select onChange={ changePeriod }>
                    { this.props.candles.map(candle => (
                        <option key={ candle[0] } value={ candle[0] }>
                            { this.getPeriodName(candle[0]) }
                        </option>
                    ))}
                </select>
                <input type="number" onChange={ changeSum } />
                <pre style={ styles }>
                    { JSON.stringify(this.props) }
                </pre>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectETF, candlesByETF, wallet } = state
    const {
        ETFNames,
        selected,
        period,
        sum
    } = selectETF || {
        ETFNames: {},
        selected: '',
        period: 0,
        sum: 0
    }

    const {
        isFetching,
        lastUpdated,
        candles
    } = candlesByETF[selected] || {
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
