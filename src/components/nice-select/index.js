import React, { Component } from 'react'
import { select } from './styles.css'

export default class NiceSelect extends Component {
    render() {
        const keys = Object.keys(this.props.options || {})

        return (
            <span className={ select }>
                <select
                    onChange={ this.props.onChange }
                    value={ this.props.value }>
                    {
                        keys.map(key => <option key={ key } value={ key }>
                            { this.props.options[key] }
                        </option>)
                    }
                </select>
                <span>…</span>
            </span>
        )

        return
    }
}
