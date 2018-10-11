import React, { Component } from 'react'
import RedPackets from '@/utils/RedPackets'

export default class GetRedPackets extends Component {

    constructor() {
        super()

        this.state = {
            packetsList: []
        }
        this.redPackets = new RedPackets(100, 9)
    }

    handleGetRedPackets() {
        const money = this.redPackets.getMoney()
        if(money !== 0) {
            this.setState({
                packetsList: [...this.state.packetsList, money]
            })
        }else {
            console.log('红包已领完!')
        }
    }

    render() {
        const { packetsList } = this.state

        return (
            <div className='redpackets'>
                <span className='redpackets-btn' onClick={this.handleGetRedPackets.bind(this)}>领</span>
                <ul className='redpackets-list'>
                    {packetsList.length > 0 && packetsList.map((item, index) => (
                        <li className='redpackets-item' key={index}>{index}领取了:{item}</li>
                    ))}
                </ul>
            </div>
        )
    }

    componentDidMount() {

    }

}
