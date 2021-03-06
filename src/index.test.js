import React, {PureComponent} from 'react'
import {subscribeHOC} from './index'
import {mount} from 'enzyme'
import {register, subscribe} from 'falx'


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

const Counter = subscribeHOC(COUNTER, class extends PureComponent {
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
});

const createPromise = () => new Promise(resolve => {
    setTimeout(resolve, 10)
});

describe('Counter', () => {
    test('initial render', () => {
        const wrapper = mount(<Counter />);
        expect(+wrapper.find('#value').text()).toEqual(0);
        wrapper.unmount()
    });

    test('up', () => {
        const wrapper = mount(<Counter />);
        wrapper.find('#up').simulate('click');
        return createPromise().then(() => {
            expect(+wrapper.find('#value').text()).toEqual(1);
            wrapper.find('#up').simulate('click');
            return createPromise().then(() => {
                expect(+wrapper.find('#value').text()).toEqual(2);
                wrapper.unmount()
            })
        })
    });

    test('down', () => {
        const wrapper = mount(<Counter />);
        wrapper.find('#down').simulate('click');
        return createPromise().then(() => {
            expect(+wrapper.find('#value').text()).toEqual(1);
            wrapper.unmount()
        })
    });

    test('decorator', () => {
        @subscribeHOC(COUNTER)
        class Decorated extends PureComponent {
            render() {
                return null
            }
        }
    })
});