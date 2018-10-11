import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {

        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            console.log(`加载新模块`)
            try{
                const { default: component } = await importComponent()
                console.log(`加载完毕`)
                this.setState({ component })
            }catch(err) {
                console.log(`加载完毕`)
            }
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent
}