import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectETF, fetchETFIfNeeded } from '../../actions'
import NiceSelect from '../nice-select'

class SelectETF extends Component {
    componentDidMount() {
        const { dispatch, selected } = this.props
        dispatch(fetchETFIfNeeded(selected))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, selected } = nextProps
        const etfChanged = selected !== this.props.selected

        if (etfChanged) {
            dispatch(fetchETFIfNeeded(selected))
        }
    }

    changeETF(event) {
        const nextETF = event.target.value
        this.props.dispatch(selectETF(nextETF))
    }

    render() {
        const changeETF = this.changeETF.bind(this)
        const { ETFNames, selected } = this.props

        return <NiceSelect onChange={ changeETF } value={ selected } options={ ETFNames } />
    }
}

const mapStateToProps = state => {
    const { select } = state
    const {
        ETFNames,
        selected
    } = select

    return {
        ETFNames,
        selected
    }
}

export default connect(mapStateToProps)(SelectETF)
