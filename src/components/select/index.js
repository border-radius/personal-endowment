import React, { Component } from 'react'
import styles from './index.css'

export default class Select extends Component {
    render() {
        var options = this.props.options || []

        return (
            <select className={ styles.select }>
                { options.map(option => <option>{ option.title }</option>) }
            </select>
        )
    }
}
