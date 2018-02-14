# falx-react
falx HOC for react

## installation
````es6
npm i -S falx-redux
````

## usage
````es6
import React, {PureComponent} from 'react'
import {subscribeHOC} from 'falx-react'


const reducer = {
    state: {
        value: 0
    },
    actions: {
        up(state) {
            return {
                ...state,
                value: state.value + 1
            }
        },
        down(state) {
            return {
                ...state,
                value: state.value - 1
            }
        }
    }
};

const COUNTER = 'counter';

register(COUNTER, reducer);

@subscribeHOC(COUNTER)
class Counter extends PureComponent {
    render() {
        return (
            <div>
                <div id="value">
                    {this.props.counter.value}
                </div>
                <button id="up" onClick={this.props.up} >up</button>
                <button id="down" onClick={this.props.down} >down</button>
            </div>
        )
    }
}
````