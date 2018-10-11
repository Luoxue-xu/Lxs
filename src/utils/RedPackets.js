/**
 * 每个实例都是一个随机红包
 */

export default class RedPackets {

    /**
     * @param {Number} totalMoney 红包总金额
     * @param {Number} totalNum 红包可领取总数量
     */
    constructor(totalMoney, totalNum) {
        this.totalMoney = totalMoney
        this.totalNum = totalNum
        this.hasNum = totalNum // 剩余未领取红包数量
        this.hasMoney = totalMoney // 剩余未领取金额
        this.packetsList = [] // 红包列表
    }

    getMoney() {
        if(this.hasNum === 0) {
            return 0
        }else if(this.hasNum === 1) {
            // 如果未领取的红包为1，则把剩余所有金额返回
            this.hasNum = 0
            const last = this.hasMoney.toFixed(2) * 1
            this.packetsList.push(last)
            return last
        }else {
            const money = this.getRandomMoney(this.hasMoney / this.hasNum * 2)
            this.hasMoney -= money
            this.hasNum -= 1
            this.packetsList.push(money)
            return money
        }
    }

    // 获取随机领取金额
    getRandomMoney(max) {
        return Math.floor(Math.random() * max * 100) / 100
    }

}