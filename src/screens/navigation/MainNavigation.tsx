import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { MainNavigator } from './navigation'
import { State } from '../../types/state'
import { connect } from 'react-redux'

interface MainNavigationProps {
    nav: any
    dispatch?: any,
    navigation?: any,
}

class MainNavigation extends React.Component<MainNavigationProps, any> {

    render() {
        return (
            <MainNavigator
            navigation={
                addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })
            }
            />
        )
    }
}

const mapStateToProps = (state: State): MainNavigationProps => {
    return {
        nav: state.nav
    }
}

export default connect(mapStateToProps)(MainNavigation)