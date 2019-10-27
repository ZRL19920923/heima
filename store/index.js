const Key = 'blackhorse'
export default {
  setUser (user) {
    window.sessionStorage.setItem(Key, JSON.stringify(user))
  },
  getUser () {
    //   不存在为null 若向null取值会报错 所以没有就设置为'{}'
    const jsonStr = window.sessionStorage.getItem(Key) || '{}'
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(Key)
  }
}
