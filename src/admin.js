// import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import asyncComponent from '@/utils/asyncComponent'

const MyEquip = asyncComponent(() => import('@/containers/MyEquip'))
const GetRedPackets = asyncComponent(() => import('@/containers/GetRedPackets'))
import 'csses/index.scss'

class App extends Component {

    constructor() {
        super()
    }

    render() {
        return <MyEquip />
    }

    componentDidMount() {
        console.log(123)
    }

}

ReactDOM.render(<App />, document.querySelector('#app'))
