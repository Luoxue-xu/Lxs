import React, { Component } from 'react'
import './swiper.scss'

export default class Swiper extends Component {

    constructor(props) {
        super()

        this.state = {
            activeId: 0, // 当前显示的元素索引
            scrollerLeft: 0, // 滑动容器的左偏移
            transition: 'none'
        }

        // 触摸的坐标信息
        this.touchs = {
            startMoveLeft: 0, // 开始触摸的位置
            endMoveLeft: 0, // 结束触摸的位置
            moveDistance: 0 // 滑动的距离
        }

        // 滑动容器属性
        this.scroller = {
            defaultLeft: 0 // 容器每次滑动结束之后的初始信息
        }

        // 最外层容器属性
        this.wrap = {
            width: 0
        }

        this.isTouch = false // 是否触摸
    }

    handleTouchStart(event) {
        if (this.props.children.length < 2) {
            // 一张或没有图片则不可滑动
            return
        }
        this.isTouch = true
        this.touchs.startMoveLeft = event.touches[0].clientX
    }

    handleTouchMove(event) {
        if(this.props.children.length < 2) {
            // 一张或没有图片则不可滑动
            return
        }
        this.touchs.endMoveLeft = event.touches[0].clientX
        // 当前滑动位置 - 开始滑动位置
        this.touchs.moveDistance = this.touchs.endMoveLeft - this.touchs.startMoveLeft

        this.setState({
            // 容器初始位置 + 触摸滑动的距离
            transition: 'none',
            scrollerLeft: this.scroller.defaultLeft + this.touchs.moveDistance
        })
    }

    // 当触摸结束之后，根据元素重心，自动靠左靠右吸附
    autoTranslate() {
        // 左侧被完全隐藏的元素宽度和
        const itemsWidth = this.state.activeId * this.wrap.width
        // 滑动容器滑动之后跟容器的边距
        const scrollerMarginLeft = itemsWidth + this.scroller.defaultLeft

        let activeId = this.state.activeId

        if(scrollerMarginLeft < (-this.wrap.width / 5) && activeId < (this.props.children.length - 1)) {
            // 滑动距离超出左侧三分之一则自动左滑
            activeId += 1
        } else if (scrollerMarginLeft > (this.wrap.width / 5) && activeId > 0){
            // 滑动距离超出右侧三分之一则自动右滑
            activeId -= 1
        }

        // 滑动结束，重置容器初始位置
        this.scroller.defaultLeft = -this.wrap.width * activeId

        // 偏左
        this.setState({
            activeId,
            scrollerLeft: this.scroller.defaultLeft,
            transition: 'all .3s ease-out'
        })
    }

    handleTouchEnd(event) {
        if (this.props.children.length < 2) {
            // 一张或没有图片则不可滑动
            return
        }
        // 滑动结束，重置容器初始位置
        this.scroller.defaultLeft += this.touchs.moveDistance

        this.autoTranslate()
    }

    render() {
        const { scrollerLeft, activeId, transition } = this.state
        const { children } = this.props

        return (
            <div className='lxui-swiper' ref={element => this.wrap = element}>
                <div className='lxui-swiper-scroller' style={{ transform: `translateX(${scrollerLeft}px)`, transition: `${transition}` }} onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                    {React.Children.map(children, (item, index) => {
                        return <div className='lxui-swiper-item' style={{ width: `${this.wrap.width}px` }} key={index}>{item}</div>
                    })}
                </div>
            </div>
        )
    }

    // 获取元素尺寸
    getBoxStyle() {
        // 最外层容器宽度
        this.wrap.width = this.wrap.clientWidth
        this.setState({
            width: this.wrap.width
        })
    }

    componentDidMount() {
        // 获取元素尺寸
        this.getBoxStyle()
    }

}