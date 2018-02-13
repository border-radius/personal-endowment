import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPeriod } from '../../actions'
import NiceSelect from '../nice-select'

class SelectPeriod extends Component {
    changePeriod(event) {
        const nextPeriod = event.target.value
        this.props.dispatch(selectPeriod(nextPeriod))
    }

    getPeriodName(timestamp) {
        const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth()
        const monthName = monthList[month]

        return [ monthName, year ].join(' ')
    }

    render() {
        const changePeriod = this.changePeriod.bind(this)
        const periods = {}
        this.props.candles.forEach(candle => periods[candle[0]] = this.getPeriodName(candle[0]))

        return <NiceSelect onChange= { changePeriod } options={ periods } />
    }
}

const mapStateToProps = state => {
    const { select, history } = state
    const { selected } = select
    const { candles } = history[selected] || { candles: [] }
    return { candles }
}

export default connect(mapStateToProps)(SelectPeriod)
