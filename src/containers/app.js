import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    selectETF,
    fetchETFIfNeeded,
    selectPeriod,
    selectSum
} from '../actions'

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

        if (selected !== this.props.selected) {
            dispatch(fetchETFIfNeeded(selected))
        }

        if (period !== this.props.period || sum !== this.props.sum) {

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
                    { this.props.periods.map(period => (
                        <option key={ period.date } value={ period.date }>
                            { period.string }
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
    const { selectETF, candlesByETF, periodsByETF } = state
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
    const periods = periodsByETF[selected] || []

    return {
        ETFNames,
        selected,
        period,
        sum,
        candles,
        isFetching,
        lastUpdated,
        periods
    }
}

export default connect(mapStateToProps)(App)
