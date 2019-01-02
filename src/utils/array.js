/**
 * Array构造函数的所有属性测试
 */

/**
 * copyWidthin(target, start, end)
 * 浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小，会修改数组本身
 * @param {Number} target 需要替换的元素起始索引值（包含），负数则从末尾开始计算
 * @param {Number} start 需要拷贝的元素起始索引值（包含），负数从末尾开始计算，不填则默认为0
 * @param {Number} end 需要拷贝的元素的结束索引值（不包含），负数从末尾开始计算，不填则默认为数组长度
 * @return 改变之后的数组本身
 * start >= end 不做任何改变
 */
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// arr.copyWithin(0, 4, 6)
// [5, 6, 3, 4, 5, 6, 7, 8, 9]
// arr.copyWithin(-2, 4, 6) 
// [1, 2, 3, 4, 5, 6, 7, 5, 6]
// arr.copyWithin(0)
// [1, 2, 3, 4, 5, 6, 7, 8, 9] 未做任何改变
// arr.copyWithin(0, 2)
//[3, 4, 5, 6, 7, 8, 9, 8, 9] 相当于 arr.copyWithin(0, 2, 9)



/**
 * fill(value, start, end)
 * 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引，会改变数组本身
 * @param {Any} value 用来填充的值，可以是任何类型
 * @param {Number} start 填充的起始位置（包含），不传默认为0，负数则从末尾开始计算(length + start)
 * @param {Number} end 填充的结束位置（不包含），不传默认为数组长度，负数则从末尾开始计算(length + start)
 * @return 改变之后的数组本身
 * start >= end 不做任何改变
 */
// const arr = new Array(10)
// arr.fill('落雪')
// ["落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪"]
// arr.fill('落雪', 1)
// [empty, "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪", "落雪"]
// arr.fill('落雪', 1, 3)
// [empty, "落雪", "落雪", empty × 7]
// arr.fill('落雪', -2, -1)
// [empty × 8, "落雪", empty]

// const obj = { length: 10 }
// Array.prototype.fill.call(obj, 4)
// {0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, length: 10} 现在还没弄懂原理，哈哈



/**
 * pop()
 * 从数组中删除最后一个元素，并返回该元素的值，此方法更改数组的长度
 * @return 被删除的值
 */
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// arr.pop()
// 操作之后的数组：[1, 2, 3, 4, 5, 6, 7, 8], 返回的值：9
// arr = []
// [], undefined



/**
 * push(...element)
 * 将一个或多个元素添加到数组的末尾，并返回该数组的新长度
 * @param {Any} element 可以传递1-N个元素
 * @return 新的数组长度
 */
// const arr = []
// arr.push('落雪')
// 操作之后的数组：['落雪']，返回的值：1



/**
 * reverse()
 * 将数组中元素的位置颠倒，第一个数组元素成为最后一个数组元素，最后一个数组元素成为第一个
 * @return 新的数组
 */

// const arr = [1, 2, 3, 4, 5, 6]
// arr.reverse()
// [6, 5, 4, 3, 2, 1]



/**
 * shift()
 * 从数组中删除第一个元素，并返回该元素的值，此方法更改数组的长度
 * @return 被删除的值
 */

// const arr = [1, 2, 3, 4, 5, 6]
// arr.shift()
// [2, 3, 4, 5, 6], 1



/**
 * sort(compareFunction)
 * 用原地算法对数组的元素进行排序，并返回数组。排序算法现在是稳定的。默认排序顺序是根据字符串Unicode码点，会修改数组本身
 * @param {Function} compareFunction 排序函数，默认会传入相连的两个对比元素，函数返回1则表示不修改两个元素的位置，函数返回-1则调换两个元素的位置，返回0则表示保持原样
 * @return 排序后的数组
 */

// const arr = [23, 53, 12, 45, 28, 1, 66, 91, 52, 18]
// arr.sort()
// [1, 12, 18, 23, 28, 45, 52, 53, 66, 91]

// arr.sort((next, prev) => {
//     if (next > prev) {
//         return -1
//     } else {
//         return 1
//     }
// })
// [91, 66, 53, 52, 45, 28, 23, 18, 12, 1]



/**
 * splice(start, deleteCount, ..element)
 * 通过删除现有元素和/或添加新元素来修改数组，并以数组返回原数组中被修改的内容，会修改数组本身
 * @param {Number} start 准备修改(移除)的元素的开始索引值
 * @param {Number} deleteCount 需要移除的元素个数，默认是length - start，值为0或负数则不删除任何元素
 * @param {Any} element 任意个待添加的元素
 * @return 被删除的元素组成的数组
 */

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// arr.splice(2)
// [1, 2]
// arr.splice(2, 4)
// [1, 2, 7, 8, 9]
// arr.splice(2, 4, 0, 0, 0)
// [1, 2, 0, 0, 0, 7, 8, 9]
// arr.splice(2, 4, 0, 0, 0, 0, 0, 0, 0)
// [1, 2, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9]



/**
 * unshift(...element)
 * 将一个或多个元素添加到数组的开头，并返回该数组的新长度，会改变原数组
 * @param {Any} element 任意个任何类型的元素，添加到数组最前面
 * @return 返回新数组的长度
 */

const arr = [1, 2, 3, 4, 5, 6]
arr.unshift(0, 0, 0, 0)
// [0, 0, 0, 0, 1, 2, 3, 4, 5, 6], 10
 


/**
 * concat()
 * 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
 * @
 */