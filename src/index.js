import React, {PureComponent} from 'react'
import {store, subscribe} from 'falx'

export function subscribeHOC(name, Component) {
    return class extends PureComponent {
        state = store[name];

        componentDidMount() {
            this.subscription = subscribe(name, nextState => {
                this.setState(nextState)
            });
        }

        componentWillUnmount() {
            this.subscription.unsubscribe()
        }

        render() {
            return (
                <Component {...this.props} {...this.state} />
            )
        }
    }
}