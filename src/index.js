// import '@babel/polyfill'
import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'
import asyncComponent from '@/utils/asyncComponent'

// const LxSwiper = asyncComponent(() => import(/* webpackChunkName: "lxwiper" */ '@/components/LxSwiper'))
import Laboratory from 'containers/Laboratory'
import '@/utils/array'
import 'csses/index.scss'

class App extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Laboratory />
        )
    }

    componentDidMount() {

    }

}

ReactDOM.render(<App />, document.querySelector('#app'))
