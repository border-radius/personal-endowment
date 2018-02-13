import React, { Component } from 'react'
import { number } from './styles.css'

export default class NiceNumber extends Component {
    render() {
        const currency = this.props.currency || '$'
        return (
            <span className={ number }>
                <span>{ currency }</span>
                <input
                    type="number"
                    onChange={ this.props.onChange }
                    value={ this.props.value } />
            </span>
        )
    }
}
