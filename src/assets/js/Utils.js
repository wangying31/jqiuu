
/**
 * 公共类
 */
var Utils = {
  _data: function (key, value, type) {
    var storage = type === 'session' ? sessionStorage : localStorage
    var getItemValue = function () {
      var data
      try {
        data = storage.getItem(key)
      } catch (e) {
        console.log(e.message)
        return
      }
      try {
        data = JSON.parse(data)
      } catch (e) {
        console.log(e.message)
      }
      return data
    }
    if (key && value === undefined) {
      return getItemValue()
    } else if (key && value === null) {
      try {
        storage.removeItem(key)
      } catch (e) {
        console.log(e.message)
      }
    } else {
      try {
        storage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  getParameter: function (param) {
    var reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i')
    var valueArr = reg.exec(location.href)
    /* eslint-disable one-var */
    var value = valueArr ? valueArr[1] : '', decodeValue = value, i = 0
    while (decodeValue !== decodeURIComponent(decodeValue)) {
      decodeValue = decodeURIComponent(decodeValue)
      if (++i > 10) { break }
    }

    if (decodeValue.match(/(?=<.*>)<\/.*>/) || i >= 11) {
      /* eslint-disable no-throw-literal */
      throw '系统异常，请稍后再试'
    } else {
      return value
    }
  }

  // return {
  //     _data: _data,
  //     getParameter: getParameter
  // }
}

export default Utils
