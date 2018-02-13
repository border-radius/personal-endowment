import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSum } from '../../actions'
import NiceNumber from '../nice-number'

class InputSum extends Component {
    changeSum(event) {
        const nextSum = event.target.value
        this.props.dispatch(selectSum(nextSum))
    }

    render() {
        const changeSum = this.changeSum.bind(this)

        return <NiceNumber onChange={ changeSum } value={ this.props.sum } />
    }
}

const mapStateToProps = state => {
    const { select } = state
    const { sum } = select
    return { sum }
}

export default connect(mapStateToProps)(InputSum)
