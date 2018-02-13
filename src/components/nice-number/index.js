import React, { Component } from 'react'
import styles from './styles.css'

export default class NiceNumber extends Component {
    render() {
        return <input
            className={ styles.number }
            type="number"
            onChange={ this.props.onChange }
            value={ this.props.value } />
    }
}
