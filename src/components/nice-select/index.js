import React, { Component } from 'react'
import styles from './styles.css'

export default class NiceSelect extends Component {
    render() {
        const keys = Object.keys(this.props.options || {})

        return <select
            className={ styles.select }
            onChange={ this.props.onChange }
            value={ this.props.value }>
            {
                keys.map(key => <option key={ key } value={ key }>
                    { this.props.options[key] }
                </option>)
            }
        </select>
    }
}
