const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    // 检查源目录是否存在
    if (!fs.existsSync(src)) {
        console.error(`源目录 ${src} 不存在`);
        return;
    }

    // 创建目标目录
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    // 读取源目录下的所有文件和目录
    const entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isFile()) {
            // 如果是文件，直接复制
            fs.copyFileSync(srcPath, destPath);
        } else if (entry.isDirectory()) {
            // 如果是目录，递归复制
            copyDir(srcPath, destPath);
        }
    });
}

// 源目录
const sourceDir = path.resolve(__dirname, 'docs/.vitepress/dist');

function toBlog() {
    const args = process.argv.slice(2); // 去掉前两个元素，只保留命令和参数
    const command = args[0]; // 第一个参数是命令
    const targetDir = path.join(__dirname, `blog/${command || 'vitepress-blog'}`);
    console.log('源目录:', sourceDir);
    console.log(`开始复制文件到${targetDir}`);
    copyDir(sourceDir, targetDir);
}

toBlog();