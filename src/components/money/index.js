import React, { Component } from 'react'
import styles from './styles.css'

export default class Money extends Component {
    render() {
        const currency = this.props.currency || '$'
        const value = parseFloat(this.props.value || 0).toFixed(2)
        const prefix = value < 0 ? '-' : ''
        const abs = this.props.abs
        const style = prefix ? styles.money_down : styles.money_up

        return <span className={ style }>{ abs ? '' : prefix }{ currency }{ Math.abs(value) }</span>
    }
}
