
const _0 = new Map([[40, {
        name: 'a',
        min: 40,
        max: 480,
        step: 40
    }],[50, {
        name: 'a',
        min: 50,
        max: 600,
        step: 50
    }],[60, {
        name: 'a',
        min: 60,
        max: 720,
        step: 60
    }],[70, {
        name: 'a',
        min: 70,
        max: 840,
        step: 70
    }]
])

export default class Equip {

    constructor() {

    }

    getAttrs(level) {
        // 随机出的增加属性值
        const attrs = _0.get(level)
        const randomValue = this.getRandom(Math.floor((attrs.max - attrs.min) / attrs.step))
        const value = attrs.min + randomValue * attrs.step
        return {
            name: attrs.name,
            value
        }
    }

    // 获取一个随机整数
    getRandom(max) {
        return Math.floor(Math.random() * (max + 1))
    }

}