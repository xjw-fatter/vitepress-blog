# JS内置对象和内置类

## 内置对象概述

JavaScript提供了许多内置对象，它们是语言核心功能的基础。这些对象包含了丰富的属性和方法，能够帮助我们更高效地进行开发。本文将详细介绍常用的内置对象和内置类，包括它们的基本用法、高级特性以及实践应用。

## Object对象

`Object`是JavaScript中最基础的对象，所有其他对象都继承自它。

### 常用静态方法

```js
// 创建对象
const obj = {
  name: '张三',
  age: 25
};

// Object.keys() - 获取对象的所有可枚举属性名
console.log(Object.keys(obj)); // ['name', 'age']

// Object.values() - 获取对象的所有可枚举属性值
console.log(Object.values(obj)); // ['张三', 25]

// Object.entries() - 获取对象的可枚举属性键值对数组
console.log(Object.entries(obj)); // [['name', '张三'], ['age', 25]]

// Object.assign() - 合并对象
const newObj = Object.assign({}, obj, { gender: '男' });
console.log(newObj); // { name: '张三', age: 25, gender: '男' }

// Object.freeze() - 冻结对象（不可修改、添加、删除属性）
Object.freeze(obj);
obj.name = '李四'; // 严格模式下会报错
console.log(obj.name); // '张三'

// Object.seal() - 密封对象（不可添加删除属性，但可以修改现有属性）
const sealedObj = { x: 1 };
Object.seal(sealedObj);
sealedObj.x = 2; // 允许
sealedObj.y = 3; // 无效
```

### 实例方法

```js
// hasOwnProperty() - 检查属性是否为对象自身的属性
console.log(obj.hasOwnProperty('name')); // true

// toString() - 将对象转换为字符串
console.log(obj.toString()); // [object Object]

// valueOf() - 返回对象的原始值
console.log(obj.valueOf()); // { name: '张三', age: 25 }
```

## Array对象

`Array`对象用于存储和操作数组数据。

### 创建数组

```js
// 字面量方式
const arr1 = [1, 2, 3];

// 构造函数方式
const arr2 = new Array(1, 2, 3);

// Array.from() - 从类数组对象创建数组
const arr3 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// Array.of() - 创建具有可变数量参数的新数组
const arr4 = Array.of(1); // [1]
const arr5 = Array.of(1, 2, 3); // [1, 2, 3]
```

### 常用方法

```js
const numbers = [1, 2, 3, 4, 5];

// map() - 映射数组元素
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - 过滤数组元素
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// reduce() - 归并数组元素
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15

// forEach() - 遍历数组元素
numbers.forEach(num => console.log(num));

// find() - 查找满足条件的第一个元素
const found = numbers.find(num => num > 3);
console.log(found); // 4

// some() - 检查是否至少有一个元素满足条件
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - 检查是否所有元素都满足条件
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// flat() - 数组扁平化
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap() - 先映射再扁平化
const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'world', 'How', 'are', 'you']
```

## String对象

`String`对象用于处理文本数据。

### 常用方法

```js
const str = 'Hello, World!';

// 获取字符串长度
console.log(str.length); // 13

// 字符串查找
console.log(str.indexOf('World')); // 7
console.log(str.includes('Hello')); // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('!')); // true

// 字符串截取
console.log(str.substring(0, 5)); // 'Hello'
console.log(str.slice(7)); // 'World!'
console.log(str.substr(7, 5)); // 'World'

// 字符串替换
console.log(str.replace('World', 'JavaScript')); // 'Hello, JavaScript!'
console.log(str.replaceAll(',', ';')); // 'Hello; World!'

// 字符串分割
console.log(str.split(', ')); // ['Hello', 'World!']

// 字符串转换
console.log(str.toLowerCase()); // 'hello, world!'
console.log(str.toUpperCase()); // 'HELLO, WORLD!'

// 去除空白
const paddedStr = '  Hello, World!  ';
console.log(paddedStr.trim()); // 'Hello, World!'
console.log(paddedStr.trimStart()); // 'Hello, World!  '
console.log(paddedStr.trimEnd()); // '  Hello, World!'

// 重复字符串
console.log('abc'.repeat(3)); // 'abcabcabc'

// 填充字符串
console.log('5'.padStart(3, '0')); // '005'
console.log('5'.padEnd(3, '0')); // '500'
```

## Number对象

`Number`对象提供了处理数值的方法和属性。

### 常用属性和方法

```js
// 数值范围
console.log(Number.MAX_VALUE); // 最大数值
console.log(Number.MIN_VALUE); // 最小数值
console.log(Number.MAX_SAFE_INTEGER); // 最大安全整数
console.log(Number.MIN_SAFE_INTEGER); // 最小安全整数
console.log(Number.EPSILON); // 最小精度

// 数值判断
console.log(Number.isInteger(5)); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// 数值格式化
const num = 123.456;
console.log(num.toFixed(2)); // '123.46'
console.log(num.toPrecision(4)); // '123.5'
console.log(num.toExponential(2)); // '1.23e+2'

// 数值转换
console.log(Number.parseInt('123.45')); // 123
console.log(Number.parseFloat('123.45')); // 123.45

// 进制转换
const decimal = 42;
console.log(decimal.toString(2)); // 二进制：'101010'
console.log(decimal.toString(8)); // 八进制：'52'
console.log(decimal.toString(16)); // 十六进制：'2a'
```

## Date类

`Date`类用于处理日期和时间。

### 创建日期对象

```js
// 当前时间
const now = new Date();

// 指定日期时间
const date1 = new Date('2023-12-25');
const date2 = new Date(2023, 11, 25); // 月份从0开始
const date3 = new Date(1703433600000); // 时间戳
```

### 日期操作

```js
const date = new Date();

// 获取日期组成部分
console.log(date.getFullYear()); // 年份
console.log(date.getMonth()); // 月份（0-11）
console.log(date.getDate()); // 日期
console.log(date.getDay()); // 星期（0-6）
console.log(date.getHours()); // 小时
console.log(date.getMinutes()); // 分钟
console.log(date.getSeconds()); // 秒
console.log(date.getMilliseconds()); // 毫秒
console.log(date.getTime()); // 时间戳

// 设置日期
date.setFullYear(2024);
date.setMonth(0); // 设置为1月
date.setDate(1);
date.setHours(12);
date.setMinutes(30);
date.setSeconds(0);

// 日期计算
const tomorrow = new Date(date);
tomorrow.setDate(date.getDate() + 1);

const diffTime = tomorrow - date; // 毫秒差
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 天数差

// 格式化日期
console.log(date.toLocaleDateString()); // 本地日期格式
console.log(date.toLocaleTimeString()); // 本地时间格式
console.log(date.toISOString()); // ISO格式
console.log(date.toUTCString()); // UTC格式

// 使用Intl.DateTimeFormat进行本地化格式化
const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short'
});

console.log(formatter.format(date));
```

## RegExp类

`RegExp`类用于处理正则表达式。

### 创建正则表达式

```js
// 字面量方式
const regex1 = /pattern/flags;

// 构造函数方式
const regex2 = new RegExp('pattern', 'flags');

// 常用标志
// i - 忽略大小写
// g - 全局匹配
// m - 多行匹配
// s - 允许.匹配换行符
// u - Unicode模式
// y - 粘性匹配
```

### 常用方法和示例

```js
const text = 'Hello, my phone number is 123-456-7890 and 098-765-4321';
const phoneRegex = /\d{3}-\d{3}-\d{4}/g;

// test() - 测试是否匹配
console.log(phoneRegex.test(text)); // true

// exec() - 执行匹配
let match;
while ((match = phoneRegex.exec(text)) !== null) {
  console.log(match[0]); // 输出每个匹配的电话号码
}

// String方法中使用正则
console.log(text.match(phoneRegex)); // 返回所有匹配
console.log(text.matchAll(phoneRegex)); // 返回迭代器
console.log(text.replace(phoneRegex, 'XXX-XXX-XXXX'));
console.log(text.search(phoneRegex)); // 返回首次匹配的索引

// 常用正则表达式示例
const patterns = {
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  url: /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  ipv4: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|
```

## Map类

`Map`类提供了键值对集合的功能。

### 基本操作

```js
// 创建Map
const map = new Map();

// 添加键值对
map.set('name', '张三');
map.set('age', 25);

// 获取值
console.log(map.get('name')); // '张三'

// 检查键是否存在
console.log(map.has('age')); // true

// 删除键值对
map.delete('age');

// 获取Map大小
console.log(map.size); // 1

// 遍历Map
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

## Set类

`Set`类提供了唯一值集合的功能。

### 基本操作

```js
// 创建Set
const set = new Set([1, 2, 2, 3, 3, 4]);

// 添加值
set.add(5);

// 检查值是否存在
console.log(set.has(2)); // true

// 删除值
set.delete(3);

// 获取Set大小
console.log(set.size); // 4

// 遍历Set
set.forEach(value => {
  console.log(value);
});

// 数组去重
const array = [1, 2, 2, 3, 3, 4];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4]
```

## 实践应用

### 组合使用示例

```js
// 处理用户数据
const users = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
];

// 使用Map存储用户信息
const userMap = new Map(users.map(user => [user.id, user]));

// 使用Set存储唯一年龄
const uniqueAges = new Set(users.map(user => user.age));

// 数据处理
const processedUsers = users
  .filter(user => user.age > 25)
  .map(user => ({
    ...user,
    birthYear: new Date().getFullYear() - user.age
  }));

console.log(processedUsers);
```

## Promise对象

Promise是JavaScript中处理异步操作的标准方式。

### 基本用法

```js
// 创建Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('成功');
    } else {
      reject('失败');
    }
  }, 1000);
});

// 处理Promise
promise
  .then(result => {
    console.log('成功:', result);
  })
  .catch(error => {
    console.log('错误:', error);
  })
  .finally(() => {
    console.log('完成');
  });

// Promise.all() - 等待所有Promise完成
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

Promise.all(promises)
  .then(results => {
    console.log(results); // [1, 2, 3]
  });

// Promise.race() - 返回最先完成的Promise结果
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 500))
]).then(result => {
  console.log(result); // 2
});

// Promise.allSettled() - 等待所有Promise完成，无论成功失败
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error')
]).then(results => {
  console.log(results);
  // [{ status: 'fulfilled', value: 1 },
  //  { status: 'rejected', reason: 'error' }]
});

// Promise.any() - 返回第一个成功的Promise结果
Promise.any([
  Promise.reject('错误1'),
  Promise.resolve('成功'),
  Promise.reject('错误2')
]).then(result => {
  console.log(result); // '成功'
});
```

### 实际应用示例

```js
// 封装异步操作
class API {
  static async fetchUser(id) {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('用户不存在');
      return await response.json();
    } catch (error) {
      throw new Error(`获取用户失败: ${error.message}`);
    }
  }

  static async fetchUserPosts(userId) {
    try {
      const response = await fetch(`/api/users/${userId}/posts`);
      if (!response.ok) throw new Error('获取文章失败');
      return await response.json();
    } catch (error) {
      throw new Error(`获取文章失败: ${error.message}`);
    }
  }
}

// 使用async/await处理多个异步操作
async function getUserData(userId) {
  try {
    const [user, posts] = await Promise.all([
      API.fetchUser(userId),
      API.fetchUserPosts(userId)
    ]);

    return {
      ...user,
      posts
    };
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}
```

## WeakMap和WeakSet

### WeakMap

WeakMap是一种特殊的Map，它的键必须是对象，并且键是弱引用的。

```js
// 创建WeakMap
const wm = new WeakMap();

// 使用WeakMap存储私有数据
class User {
  #data;

  constructor() {
    this.#data = new WeakMap();
  }

  setPrivateData(key, value) {
    this.#data.set(key, value);
  }

  getPrivateData(key) {
    return this.#data.get(key);
  }
}

// 使用WeakMap实现缓存
const cache = new WeakMap();

function memoize(fn) {
  return function(obj) {
    if (!cache.has(obj)) {
      cache.set(obj, fn(obj));
    }
    return cache.get(obj);
  };
}
```

### WeakSet

WeakSet是一种特殊的Set，它只能存储对象，并且这些对象是弱引用的。

```js
// 创建WeakSet
const ws = new WeakSet();

// 使用WeakSet跟踪对象
const visited = new WeakSet();

function trackObject(obj) {
  if (visited.has(obj)) {
    console.log('对象已被访问');
  } else {
    visited.add(obj);
    console.log('首次访问对象');
  }
}

// 使用WeakSet实现对象池
class ObjectPool {
  #available;
  #inUse;

  constructor() {
    this.#available = [];
    this.#inUse = new WeakSet();
  }

  acquire() {
    const obj = this.#available.pop() || this.createObject();
    this.#inUse.add(obj);
    return obj;
  }

  release(obj) {
    if (this.#inUse.has(obj)) {
      this.#inUse.delete(obj);
      this.#available.push(obj);
    }
  }

  createObject() {
    // 创建新对象的逻辑
    return {};
  }
}
```

## 性能优化建议

### 数据结构选择

1. 使用`Set`代替数组进行唯一值存储和查找
2. 使用`Map`代替对象进行频繁的键值对操作
3. 使用`WeakMap`和`WeakSet`避免内存泄漏

### Promise使用技巧

1. 合理使用`Promise.all()`处理并行任务
2. 使用`Promise.race()`实现超时控制
3. 避免Promise嵌套，使用async/await提高代码可读性

### 内存管理

```js
// 使用WeakMap/WeakSet管理对象引用
const cache = new WeakMap();
let obj = { data: 'some data' };
cache.set(obj, 'cached data');

// obj = null 后，WeakMap中的键值对会被自动回收
obj = null;

// 使用对象池模式复用对象
class Pool {
  #objects = [];

  acquire() {
    return this.#objects.pop() || this.create();
  }

  release(obj) {
    this.#objects.push(obj);
  }

  create() {
    return { /* 对象初始化 */ };
  }
}
```

## 总结

JavaScript的内置对象和内置类提供了丰富的功能，掌握它们的使用方法对于提高开发效率至关重要。在实际开发中，我们应该根据具体需求选择合适的对象和方法，并注意性能优化和代码可维护性。特别是要注意：

1. 合理使用Promise处理异步操作
2. 使用WeakMap/WeakSet管理对象引用
3. 选择合适的数据结构提升性能
4. 注意内存管理和垃圾回收
5. 使用新特性提高代码质量和可维护性