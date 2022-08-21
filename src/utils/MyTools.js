/**
 * 唯一的随机字符串，用来区分每条数据
 * @returns {string}
 */
export function getUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * 计算时间差
 * @param beginTime：2022-01-13
 * @param endTime：2022-01-13
 * @returns {{hours: number, seconds: number, minutes: number, day: number}}
 */
export function dealTime(beginTime, endTime) {
    var dateBegin = new Date(beginTime);
    var dateEnd = new Date(endTime);
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var day = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    return {
        day,
        hours,
        minutes,
        seconds
    }
}

/**
 * 获取当天时间
 * @returns {string}
 */
export function getCurDay() {
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return `${year}-${month}-${date}`
}

// 日期格式处理
export function formatDate(date) {
    var year = date.getFullYear();
    var months = date.getMonth() + 1;
    var month = (months < 10 ? '0' + months : months).toString();
    var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    return {
        year: year.toString(),
        month,
        day
    }
}

/**
 * 数组中，某个属性相同的数据放在一块，如把某个日期相同的相连一起
 * @param list 传入的数组
 * @param prop 那个属性相同的数据
 * @returns {*[]}
 */
export function margePropData(list = [], prop) {
    let arr = [], tempArr = {};
    list.forEach(item => {
        if (!tempArr[item[prop]]) {
            tempArr[item[prop]] = [item]
        } else {
            tempArr[item[prop]].push(item)
        }
    })
    for (const tempArrKey in tempArr) {
        arr = [...arr, ...tempArr[tempArrKey]]
    }
    return arr
}

/**
 * 合并行
 * @param list
 * @param prop
 */
export function mergeRows(list = [], prop) {
    list.forEach(ele => {
        ele.rowspan = 1
    })
    const len = list.length
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (list[i][prop] === list[j][prop]) {
                list[i].rowspan++
                list[j].rowspan--
            }
        }
        // 这里跳过已经重复的数据
        i = i + list[i].rowspan - 1
    }
    return list
}

/**
 * 根据当前数据的位置，在数组中插入数据
 * 如数组【1，2，4，5】想要在2后面插入3，
 *1：首先获取到2的下标，
 *2：然后获取要插入之前的数据，获取要插入之后的数据，中间就是插入的位置
 *3：最后把这三个按顺序合并就得到在想要的位置插入数据
 * @param list
 * @param index
 * @param target
 */
export function insertArrPositionOfIndex(list = [], index = 0, target = {}) {
    //根据index 找出小于index的数据放在左边
    const leftList = list.filter((t, i) => i < index);
    //根据index 找出大于index的数据放在右边
    const rightList = list.filter((t, i) => i >= index);
    // 最终合并数据
    return [...leftList, target, ...rightList]
}

/**
 * 校验规则
 */
export function verifyRules(list = [], require = []) {
    let message = null
    for (const key of require) {
        const isEmpty = list.every(it => !it[key.prop])
        if (isEmpty) {
            message = key.message
            break;
        }
    }
    return message
}

/**
 * 获取元素下标
 * @param dir 为 1：得到正序遍历方法；为 -1： 得到逆序遍历方法。
 * @returns {(function(*, *, *=): (number|number|number))|*}
 */
export function findArrIndex(dir = 1) {
    return function (array, cb, context) {
        let length = array.length;
        // 控制初始 index，0 或者 length-1
        let index = dir >= 0 ? 0 : length - 1;

        // 条件： 在数组范围内；
        // 递增或递减：递加 1 或者 -1； 妙啊~
        for (; index >= 0 && index <= length - 1; index += dir) {
            if (cb.call(context, array[index], index)) return index
        }
        return -1
    }
}

/**
 * map转换成数组
 * @param target
 * @returns {*[]}
 * @constructor
 */
export function MapConvertArr(target = {}) {
    let list = [];
    for (let key in target) {
        list.push(target[key]);
    }
    return list;
}

/**
 * 对象数组去重
 * @param arr 数组
 * @param prop 根据什么字段去重
 * @returns {any[]}
 */
export function arrayDeduplication(arr, prop) {
    let map = new Map();
    return arr.filter(item => !map.has(item[prop]) && map.set(item[prop], 1));
}

/**
 * 获取当前天时间
 * @param param 【Y:年；M:月；D:日；h:小时；m:分钟；s:秒；】 默认精确到秒
 * @returns {*}
 */
export function getCurrentDate(param = 's') {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;

    const arr = {
        'Y': year,
        'M': year + "-" + month,
        'D': year + "-" + month + "-" + date,
        'h': year + "-" + month + "-" + date + " " + hour,
        'm': year + "-" + month + "-" + date + " " + hour + ":" + minu,
        's': year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec
    }
    return arr[param];
}

/**
 * 获取当天时间前后七天时间
 * @param day day>0 当天时间的后几天 day<0 当天时间前几天
 * @returns {string}
 */
export function getRecentDate(day) {
    var date1 = new Date(),
        time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + day);
    const y = date2.getFullYear();
    const m = (date2.getMonth() + 1) > 9 ? (date2.getMonth() + 1) : '0' + (date2.getMonth() + 1)
    const d = date2.getDate() > 9 ? date2.getDate() : '0' + date2.getDate()
    return y + "-" + m + "-" + d;
}

export function MyDebounce(fn, duration = 100) {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args);
        }, duration)

    }
}

export function MyThrottle(fn, duration = 100) {
    let target = true;
    return (...arg) => {
        if (!target) {
            return false;
        }
        target = false;
        setTimeout(() => {
            fn(...arg);
            target = true
        }, duration)
    }
}
