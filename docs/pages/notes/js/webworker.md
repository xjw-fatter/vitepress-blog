# Web Worker 详解

## 基本概念

Web Worker 是 HTML5 提供的一项重要特性，它允许网页在后台线程中运行脚本，而不会影响页面的响应性。通过 Web Worker，我们可以将耗时的计算任务从主线程移到后台线程，从而提升应用的性能和用户体验。

### 主要特点

1. **并行执行**：Worker 在独立线程中运行，不会阻塞主线程
2. **独立环境**：Worker 有自己的全局上下文，无法直接访问 DOM
3. **消息通信**：通过消息机制与主线程进行数据交换
4. **资源隔离**：拥有独立的内存空间，不与主线程共享

## 使用场景

### 1. 复杂计算

适用于需要大量计算的场景，如：
- 大数据处理
- 图像/视频处理
- 复杂算法运算

### 2. 数据处理

- 文件解析
- 数据加密/解密
- 数据压缩/解压

### 3. 实时数据更新

- WebSocket 数据处理
- 定时任务执行
- 后台数据同步

## 基本用法

### 创建 Worker

```javascript
// main.js
const worker = new Worker('worker.js');

// 发送消息给 Worker
worker.postMessage({ type: 'compute', data: [1, 2, 3, 4, 5] });

// 接收 Worker 返回的消息
worker.onmessage = function(e) {
    console.log('计算结果：', e.data);
};

// 错误处理
worker.onerror = function(error) {
    console.error('Worker error:', error);
};
```

### Worker 线程代码

```javascript
// worker.js
self.onmessage = function(e) {
    if (e.data.type === 'compute') {
        const result = computeData(e.data.data);
        self.postMessage(result);
    }
};

function computeData(data) {
    // 执行复杂计算
    return data.map(x => x * x);
}
```

## 实践示例

### 示例1：大数据排序

```javascript
// main.js
const sortWorker = new Worker('sort-worker.js');

// 生成大量随机数据
const data = Array.from({ length: 1000000 }, () => Math.random());

sortWorker.postMessage(data);

sortWorker.onmessage = function(e) {
    console.log('排序完成：', e.data.slice(0, 10)); // 显示前10个数据
};

// sort-worker.js
self.onmessage = function(e) {
    const sortedData = e.data.sort((a, b) => a - b);
    self.postMessage(sortedData);
};
```

### 示例2：图像处理

```javascript
// main.js
const imageWorker = new Worker('image-worker.js');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 获取图像数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

imageWorker.postMessage({
    imageData: imageData,
    filter: 'grayscale'
});

imageWorker.onmessage = function(e) {
    ctx.putImageData(e.data, 0, 0);
};

// image-worker.js
self.onmessage = function(e) {
    const { imageData, filter } = e.data;
    const pixels = imageData.data;
    
    if (filter === 'grayscale') {
        for (let i = 0; i < pixels.length; i += 4) {
            const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
            pixels[i] = avg;     // R
            pixels[i + 1] = avg; // G
            pixels[i + 2] = avg; // B
        }
    }
    
    self.postMessage(imageData);
};
```

## 最佳实践

### 1. Worker 池管理

```javascript
class WorkerPool {
    constructor(workerScript, poolSize = 4) {
        this.workers = [];
        this.queue = [];
        this.activeWorkers = 0;
        
        for (let i = 0; i < poolSize; i++) {
            this.workers.push(new Worker(workerScript));
        }
    }
    
    runTask(data) {
        return new Promise((resolve, reject) => {
            const task = { data, resolve, reject };
            
            if (this.activeWorkers < this.workers.length) {
                this.assignTask(task);
            } else {
                this.queue.push(task);
            }
        });
    }
    
    assignTask(task) {
        const worker = this.workers[this.activeWorkers++];
        
        worker.onmessage = (e) => {
            task.resolve(e.data);
            this.activeWorkers--;
            
            if (this.queue.length > 0) {
                this.assignTask(this.queue.shift());
            }
        };
        
        worker.onerror = (error) => {
            task.reject(error);
            this.activeWorkers--;
        };
        
        worker.postMessage(task.data);
    }
}
```

### 2. 错误处理和终止

```javascript
const worker = new Worker('worker.js');

// 完整的错误处理
worker.onerror = function(error) {
    console.error('Worker error:', error.message);
    worker.terminate(); // 终止 Worker
};

worker.onmessageerror = function(error) {
    console.error('Message error:', error);
};

// 优雅终止
function terminateWorker() {
    worker.postMessage({ type: 'cleanup' }); // 通知 Worker 清理资源
    
    setTimeout(() => {
        worker.terminate();
    }, 1000);
}
```

### 3. 数据传输优化

```javascript
// 使用 TransferableObjects
const buffer = new ArrayBuffer(1024 * 1024); // 1MB 数据
worker.postMessage({ data: buffer }, [buffer]); // 转移所有权，避免复制

// 使用 SharedArrayBuffer 共享内存
const sharedBuffer = new SharedArrayBuffer(1024 * 1024);
worker.postMessage({ data: sharedBuffer }); // 共享内存访问
```

## 注意事项

1. **浏览器支持**：确保目标浏览器支持 Web Worker
2. **资源限制**：Worker 数量应适度，避免创建过多
3. **通信开销**：频繁的消息传递可能影响性能
4. **调试难度**：Worker 代码调试相对复杂
5. **安全限制**：必须遵守同源策略

## 总结

Web Worker 是提升 Web 应用性能的强大工具，特别适合处理计算密集型任务。通过合理使用 Worker，我们可以：

1. 提升应用响应性
2. 优化用户体验
3. 充分利用多核处理器
4. 实现更复杂的后台处理功能

在实际开发中，应根据具体需求选择合适的使用方式，并注意遵循最佳实践，以获得最佳的性能提升效果。