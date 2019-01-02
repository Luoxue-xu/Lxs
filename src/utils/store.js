class Store {

    constructor() {
        // 订阅者列表
        this.subscribers = {}
    }

    /**
     * 
     * @param {String} type // 注册的消息类型
     * @param {Function} fn // 注册触发的事件 
     */
    subscribe(type, fn) {
        if (this.subscribers[type]) {
            this.subscribers[type].push(fn)
        }else {
            this.subscribers[type] = [fn]
        }
    }

    /**
     * 取消订阅
     * @param {String} type // 订阅类型
     */
    unsubscribe(type) {

    }

    // 发布消息
    publish(type) {
        const subscribers = this.subscribers[type]
        if (subscribers) {
            for (let i = 0; i < subscribers.length; i++) {
                subscribers[i]({
                    name: type,
                    msg: '今天吃什么呀？'
                })
            }
        }
    }

}

const store = new Store()

class Person {

    constructor() {
        store.subscribe('eat', data => {
            this.eatNews = data
        })
    }

    readNews() {
        console.log(this.eatNews)
    }

}

class Dog {

    constructor() {
        store.subscribe('like', data => {
            this.eatNews = data
        })
    }

    readNews() {
        console.log(this.eatNews)
    }

}
const person = new Person()
const dog = new Dog()

store.publish('eat')
person.readNews()
store.publish('like')
dog.readNews()