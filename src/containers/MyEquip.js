import React, { Component } from 'react'
import Equip from '@/utils/Equip'
import photo from '@/images/photo.jpg'

export default class MyEquip extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <img src={photo} />
            </div>
        )
    }

    componentDidMount() {

    }

}