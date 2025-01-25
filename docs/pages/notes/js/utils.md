---
title: 代码片段
---

# 代码片段

## 是否在某环境(微信/支付宝...)

```js
export interface EnvList {
  [key: string]: RegExp;
}
/**
 * 是否在某环境
 * @params str 环境标识
 * @returns boolean 环境判断
 */
export const isEnv = (str: string): boolean => {
  const envList: EnvList = {
    weixin: /MicroMessenger/i,
    alipay: /AlipayClient/i,
    qq: /\bqq\/([\d\.]+)/i,
    bestpay: /Bestpay/i,
    unionpay: /unionpay/i,
    ios: /iphone|ipad|ipod/i,
    android: /android/i,
  };
  return envList[str].test(window.navigator.userAgent.toLowerCase());
};
```

## 节流防抖

### 节流 throttle

```js
let timer;
let flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof func === "function" && func();
    }, wait);
  }
}
export default throttle;
```

### 防抖 debounce

```js
let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
}

export default debounce;
```

## guid

```js
/**
 * @param {Number} len uuid的长度
 * @param {string} first 将返回的首字母置为指定字符
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid(len = 32, string = "", radix = null) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用指定字符替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (first && first.length === 1) {
    uuid.shift();
    return `${first}${uuid.join("")}`;
  }
  return uuid.join("");
}
```

```js
/**
 * 生成指定长度和类型的UUID。
 * @param {number} [length=32] - UUID的长度，默认为32。
 * @param {"digits" | "letters" | "alphanumeric"} [type="alphanumeric"] - UUID的字符类型，默认为"alphanumeric"。
 * @returns {string} 生成的UUID字符串。
 */
export const uuid = (
  length: number = 32,
  type: "digits" | "letters" | "alphanumeric" = "alphanumeric"
): string => {
  let result = "";
  const characters =
    type === "digits"
      ? "0123456789"
      : type === "letters"
      ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      : "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
```

## deepClone

```js
/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (cache.has(obj)) return cache.get(obj);
  let clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(
      Array.from(obj, ([key, value]) => [key, deepClone(value, cache)])
    );
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
  } else if (Array.isArray(obj)) {
    clone = obj.map((value) => deepClone(value, cache));
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}
```

## 打乱数组

```js
/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
function randomArray(array = []) {
  return array.sort(() => Math.random() - 0.5);
}
```

```js
/**
 * 对数组进行洗牌操作。
 * @param {any[]} array - 需要洗牌的数组。
 * @returns {any[]} 洗牌后的数组。
 */
  export const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  },
```

## 对象转 url 参数

```js
/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  const prefix = isPrefix ? "?" : "";
  const _result = [];
  if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
    arrayFormat = "brackets";
  for (const key in data) {
    const value = data[key];
    // 去掉为空的参数
    if (["", undefined, null].indexOf(value) >= 0) {
      continue;
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case "indices":
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`);
          }
          break;
        case "brackets":
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
          break;
        case "repeat":
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`);
          });
          break;
        case "comma":
          // 结果: ids=1,2,3
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(`${key}=${commaStr}`);
          break;
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
      }
    } else {
      _result.push(`${key}=${value}`);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
```

## 生成指定范围内的随机整数

```js
/**
 * 生成指定范围内的随机整数。
 * @param {number} min - 随机数的最小值（包含）。
 * @param {number} max - 随机数的最大值（包含）。
 * @returns {number} 随机生成的整数。
 */

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
```

## class Store

&emsp;&emsp;定义了一个名为 Store 的类,提供一个简单的状态管理机制，类似于 Vuex，但没有 Vuex 那么复杂和功能丰富。
它允许你定义 state、getters、mutations 和 actions，并通过 commit 和 dispatch 方法来修改和获取状态。

```js
// 以下是一个简单的 JavaScript 类，类似于 Vuex，用于管理数据状态
export default class Store {
  constructor(options) {
    // 初始化 state：如果 options 中提供了 state，则将其赋值给 this.state，否则初始化为空对象。
    this.state = options.state || {};

    // 初始化 getters：遍历 options 中的 getters 对象，为每个 getter 定义一个属性，并通过 Object.defineProperty 定义一个 getter 函数，该函数调用 getters[key](this.state) 来获取计算属性的值。
    this.getters = {};
    const { getters } = options;
    if (getters) {
      Object.keys(getters).forEach((key) => {
        Object.defineProperty(this.getters, key, {
          get: () => getters[key](this.state),
          enumerable: true,
        });
      });
    }

    // 初始化 mutations：遍历 options 中的 mutations 对象，为每个 mutation 定义一个方法，该方法调用 mutations[key](this.state, payload) 来修改 state。
    this.mutations = {};
    const { mutations } = options;
    if (mutations) {
      Object.keys(mutations).forEach((key) => {
        this.mutations[key] = (payload) => {
          mutations[key](this.state, payload);
        };
      });
    }

    // 初始化 actions：遍历 options 中的 actions 对象，为每个 action 定义一个方法，该方法调用 actions[key](this, payload) 来执行异步操作或复杂逻辑。
    this.actions = {};
    const { actions } = options;
    if (actions) {
      Object.keys(actions).forEach((key) => {
        this.actions[key] = (payload) => {
          actions[key](this, payload);
        };
      });
    }
  }

  // commit 方法:用于触发一个 mutation。如果 mutationName 对应的 mutation 存在且是一个函数，则调用该函数并传入 payload。否则，打印错误信息。
  commit(mutationName, payload) {
    if (typeof this.mutations[mutationName] === "function") {
      this.mutations[mutationName](payload);
    } else {
      console.error(`Mutation "${mutationName}" does not exist.`);
    }
  }

  // dispatch 方法: 用于触发一个 action。如果 actionName 对应的 action 存在且是一个函数，则调用该函数并传入 payload。否则，打印错误信息。
  dispatch(actionName, payload) {
    if (typeof this.actions[actionName] === "function") {
      this.actions[actionName](payload);
    } else {
      console.error(`Action "${actionName}" does not exist.`);
    }
  }
}
```

例:

```js
  import Store from "./store";
  import { getUUID } from "./utils/utils";
  import { commonService } from "./service/common.service";

// 定义 state
const state = {
	info: {
		name: "", // 姓名
    sex: "", // 性别
    age: "", // 年龄
	},
	detail: {}, // 详情
};

// 定义 getters
const getters = {
	info() {
		return state.info;
	},
	detail() {
		return state.detail;
	},
};

// 定义 mutations
const mutations = {
	updateInfo(state, payload) {
		state.info = payload;
	},
	updateDetail(state, payload) {
		state.detail = payload;
	},
};

// 定义 actions
const actions = {
	initInfo(store, payload) {
    try{
      const res = await commonService.$initInfo({ ...payload.params, traceNo: getUUID()}
      if (!res.data.success) {
        payload.callback && payload.callback(res);
        console.log("初始化失败", res.data.message);
        return;
      }
      store.commit("updateInfo", res.data);
      payload.callback && payload.callback(res);
    } catch(e) {
      console.log("初始化失败", e);
      payload.callback && payload.callback({success:false,message:"初始化失败"});
    }
	},
};

// 创建一个新的 Store 实例
export default new Store({
	state,
	getters,
	mutations,
	actions,
});
```

```js
const info = store.getters.info;
store.commit("updateInfo", {
  name: "zs",
  sex: "男",
  age: "18",
});
store.dispatch("initInfo", {
  params: {},
  callback: (res) => {
    // ...
  },
});
```

## 对象键名转换

只转换第一层键名，键名单词全大写的不支持。

```json
{
  "FIRST_NAME": "John",
  "HOBBIES": ["READING", "TRAVELLING"],
  "user Name_Str": '张三',
  "userName": '张三',
  "user_age": 30,
  "user_+age-str": 30,
  "userAddress": {
    city: '北京',
  },
  "UserAddressStr": {
    "city": '北京',
    "street+name-Str2": '长安街'
  },
}
// =>
{
  "fIRSTNAME":"John", // 不兼容，转换错误
  "userNameStr":"张三",
  "userName":"张三",
  "userAge":30,
  "userAgeStr":30,
  "userAddress":{
    "city":"北京"
  },
  "userAddressStr":{
    "city":"北京",
    "street+name-Str2":"长安街"
  }
}
// =>
{
  "f_i_r_s_t_n_a_m_e":"John", // 不兼容，转换错误
  "user_name_str":"张三",
  "user_name":"张三",
  "user_age":30,
  "user_age_str":30,
  "user_address":{
    "city":"北京"
  },
  "user_address_str":{
    "city":"北京",
    "street+name-Str2":"长安街"
  }
}
```

```js
/**
 * 将对象的所有键转换为小写驼峰命名法。
 * 如果传入的不是对象，则直接返回原值。
 * @param {Object} obj - 需要转换键名的对象
 * @returns {Object} - 键名已转换为小写驼峰命名法的新对象
 */
convertKeysToLowerCaseCamelCase(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj;
  }
  const convertToLowerCaseCamelCase = (str) => {
    // 第一步：将首字母转换为小写
    let transStr = str.charAt(0).toLowerCase() + str.slice(1);
    // 第二步：将非字母数字的字符去除并将其后的第一个字符大写
    transStr = transStr.replace(/[^a-zA-Z0-9]+(.)/g, (match, letter) => letter.toUpperCase());
    return transStr;
  };

  const newObj = {};
  Object.keys(obj).forEach(key => {
    const newKey = convertToLowerCaseCamelCase(key);
    // newObj[newKey] = this.convertKeysToLowerCaseCamelCase(obj[key]);
    newObj[newKey] = obj[key];
  });
  return newObj;
},

```

```js
/**
 * 将对象的键转换为使用指定分隔符的小写形式。
 * @param {Object} obj - 需要转换键的对象。
 * @param {string} [separator='_'] - 用于连接单词的分隔符，默认为下划线。
 * @returns {Object} - 返回一个新对象，其键已被转换为使用指定分隔符的小写形式。
 *
 * 转换过程包括：
 * 1. 将键的首字母转换为小写。
 * 2. 将键中的大写字母前添加分隔符并转换为小写。
 * 3. 将键中的所有非字母数字字符替换为分隔符。
 */
convertKeysBySeparator(obj, separator = '_') {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj;
  }
  const convertToSeparator = (str) => {
    // 第一步：将首字母转换为小写
    let transStr = str.charAt(0).toLowerCase() + str.slice(1);
    // 第二步：将大写字母拼接指定字符并小写
    transStr = transStr.replace(/([A-Z])/g, (match) => separator + match.toLowerCase());
    // 第三步：将所有非字母数字字符替换为指定字符
    return transStr.replace(/[^a-zA-Z0-9]+/g, separator);
  };
  const transformedEntries = Object.entries(obj).map(([key, value]) => {
    // return [convertToSeparator(key), this.convertKeysBySeparator(value, separator)]);
    return [convertToSeparator(key), value];
  });
  return Object.fromEntries(transformedEntries);
}
```


## [await-to-js](https://github.com/scopsy/await-to-js.git)

```ts
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;
```
