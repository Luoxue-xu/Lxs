// import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import asyncComponent from '@/utils/asyncComponent'

const MyEquip = asyncComponent(() => import('@/containers/MyEquip'))
const GetRedPackets = asyncComponent(() => import('@/containers/GetRedPackets'))
import 'csses/index.scss'

const setName = target => {
    target.age = 'luoxue'
}

@setName
class App extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className='lxui'>
                123
            </div>
        )
    }

    componentDidMount() {

    }

}

ReactDOM.render(<App />, document.querySelector('#app'))
