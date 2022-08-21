import WSchedule from "./weekSchedule";

const Components = {
    WSchedule
}
const install = function (Vue) {
    // 遍历注册全局组件
    Object.keys(Components).forEach(name => {
        Vue.component(name, Components[name])
    })

    // 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }

}

export default {
    install
}