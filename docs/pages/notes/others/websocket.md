# WebSocket技术详解

## WebSocket基础

### 什么是WebSocket

WebSocket是一种在单个TCP连接上进行全双工通信的协议。它提供了在Web浏览器和服务器之间建立持久连接的标准方法，使得服务器可以主动向客户端推送数据。

### 与HTTP的区别

1. 连接特点
   - HTTP是非持久的、单向的
   - WebSocket是持久的、双向的

2. 数据格式
   - HTTP基于请求-响应模式
   - WebSocket支持双向实时数据传输

3. 协议标识
   - HTTP: `http://`、`https://`
   - WebSocket: `ws://`、`wss://`

### 应用场景

- 实时通讯（聊天室、即时消息）
- 实时数据展示（股票行情、体育赛事）
- 在线游戏
- 协同编辑
- 实时监控

## WebSocket API

### 基础用法

```js
// 创建WebSocket连接
const ws = new WebSocket('ws://example.com/socketserver');

// 连接建立时触发
ws.onopen = function() {
  console.log('连接已建立');
  // 发送数据
  ws.send('Hello Server!');
};

// 接收消息
ws.onmessage = function(event) {
  console.log('收到消息:', event.data);
};

// 连接关闭时触发
ws.onclose = function() {
  console.log('连接已关闭');
};

// 发生错误时触发
ws.onerror = function(error) {
  console.error('WebSocket错误:', error);
};
```

### 数据格式

WebSocket支持发送多种类型的数据：

```js
// 发送文本
ws.send('Hello');

// 发送JSON对象
ws.send(JSON.stringify({ type: 'message', content: 'Hello' }));

// 发送二进制数据
const buffer = new ArrayBuffer(8);
ws.send(buffer);

// 发送Blob对象
const blob = new Blob(['Hello'], { type: 'text/plain' });
ws.send(blob);
```

## WebSocket客户端封装

### 基础封装

```js
class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;
    this.status = 'CLOSED';
    this.messageCallbacks = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectInterval = options.reconnectInterval || 3000;
    
    this.init();
  }

  init() {
    this.ws = new WebSocket(this.url);
    this.bindEvents();
  }

  bindEvents() {
    this.ws.onopen = () => {
      this.status = 'OPEN';
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      this.options.onOpen?.();
    };

    this.ws.onclose = () => {
      this.status = 'CLOSED';
      this.stopHeartbeat();
      this.options.onClose?.();
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      this.options.onError?.(error);
    };

    this.ws.onmessage = (event) => {
      const data = this.parseMessage(event.data);
      if (data.type === 'pong') {
        this.handlePong();
      } else {
        this.handleMessage(data);
      }
    };
  }

  parseMessage(message) {
    try {
      return JSON.parse(message);
    } catch (e) {
      return message;
    }
  }

  send(data) {
    if (this.status !== 'OPEN') {
      throw new Error('WebSocket is not connected');
    }
    
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    this.ws.send(message);
  }

  close() {
    this.status = 'CLOSING';
    this.stopHeartbeat();
    this.ws.close();
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
    
    setTimeout(() => {
      this.init();
    }, this.reconnectInterval);
  }

  on(event, callback) {
    this.messageCallbacks.set(event, callback);
  }

  off(event) {
    this.messageCallbacks.delete(event);
  }

  handleMessage(data) {
    if (data.type && this.messageCallbacks.has(data.type)) {
      this.messageCallbacks.get(data.type)(data);
    }
    this.options.onMessage?.(data);
  }
}
```

### 心跳检测机制

```js
class WebSocketClient {
  // ... 前面的代码 ...

  constructor(url, options = {}) {
    // ... 其他初始化代码 ...
    this.heartbeatInterval = options.heartbeatInterval || 30000;
    this.heartbeatTimeout = options.heartbeatTimeout || 5000;
    this.heartbeatTimer = null;
    this.heartbeatTimeoutTimer = null;
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.status === 'OPEN') {
        this.send({ type: 'ping', timestamp: Date.now() });
        this.waitForPong();
      }
    }, this.heartbeatInterval);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  waitForPong() {
    this.heartbeatTimeoutTimer = setTimeout(() => {
      console.error('Heartbeat timeout');
      this.ws.close();
    }, this.heartbeatTimeout);
  }

  handlePong() {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }
}
```

## 使用示例

### 基础使用

```js
// 创建WebSocket客户端实例
const wsClient = new WebSocketClient('ws://example.com/ws', {
  heartbeatInterval: 30000,
  heartbeatTimeout: 5000,
  maxReconnectAttempts: 5,
  reconnectInterval: 3000,
  onOpen: () => {
    console.log('连接已建立');
  },
  onClose: () => {
    console.log('连接已关闭');
  },
  onError: (error) => {
    console.error('发生错误:', error);
  },
  onMessage: (data) => {
    console.log('收到消息:', data);
  }
});

// 监听特定类型的消息
wsClient.on('chat', (data) => {
  console.log('收到聊天消息:', data.content);
});

// 发送消息
wsClient.send({
  type: 'chat',
  content: 'Hello!'
});

// 关闭连接
wsClient.close();
```

### 实际应用场景

#### 聊天室示例

```js
class ChatRoom {
  constructor() {
    this.wsClient = new WebSocketClient('ws://chat.example.com/ws', {
      onOpen: this.handleConnect.bind(this),
      onMessage: this.handleMessage.bind(this)
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.wsClient.on('chat', this.displayMessage.bind(this));
    this.wsClient.on('user_join', this.handleUserJoin.bind(this));
    this.wsClient.on('user_leave', this.handleUserLeave.bind(this));
  }

  handleConnect() {
    console.log('已连接到聊天室');
    this.wsClient.send({
      type: 'join',
      username: this.username
    });
  }

  handleMessage(data) {
    switch (data.type) {
      case 'chat':
        this.displayMessage(data);
        break;
      case 'system':
        this.displaySystemMessage(data);
        break;
    }
  }

  sendMessage(content) {
    this.wsClient.send({
      type: 'chat',
      content,
      timestamp: Date.now()
    });
  }

  displayMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.content}`;
    document.getElementById('messages').appendChild(messageElement);
  }

  displaySystemMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.className = 'system-message';
    messageElement.textContent = data.content;
    document.getElementById('messages').appendChild(messageElement);
  }

  handleUserJoin(data) {
    this.displaySystemMessage({
      content: `${data.username} 加入了聊天室`
    });
  }

  handleUserLeave(data) {
    this.displaySystemMessage({
      content: `${data.username} 离开了聊天室`
    });
  }
}

// 使用聊天室
const chatRoom = new ChatRoom();

// 发送消息
document.getElementById('sendButton').onclick = () => {
  const input = document.getElementById('messageInput');
  chatRoom.sendMessage(input.value);
  input.value = '';
};
```

## 最佳实践

1. 错误处理
   - 实现完善的错误处理机制
   - 记录错误日志
   - 提供用户友好的错误提示

2. 重连策略
   - 使用指数退避算法
   - 设置最大重连次数
   - 在适当时机重置重连计数

3. 心跳机制
   - 合理设置心跳间隔
   - 实现超时检测
   - 在连接不稳定时主动重连

4. 消息处理
   - 实现消息队列
   - 处理消息乱序
   - 支持消息重发

5. 安全性
   - 使用wss安全连接
   - 实现消息加密
   - 添加身份验证

## 注意事项

1. 连接管理
   - 及时关闭不需要的连接
   - 处理页面卸载时的连接关闭
   - 避免创建过多的连接实例

2. 性能优化
   - 控制心跳频率
   - 合理设置重连间隔
   - 优化消息格式

3. 兼容性
   - 处理不同浏览器的实现差异
   - 提供降级方案
   - 考虑移动端的特殊情况

4. 调试与监控
   - 添加日志记录
   - 实现性能监控
   - 提供调试工具