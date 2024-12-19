const fs = require('fs').promises;
const path = require('path');
const chalk = require("chalk"); // 颜色

/**
 * 验证路径并规范化
 * @param {string} dirPath - 路径
 * @returns {string} 规范化后的路径
 */
function validateAndNormalizePath(dirPath) {
    if (typeof dirPath !== 'string') {
        throw new Error('路径必须是字符串');
    }
    return path.normalize(dirPath);
}

/**
 * 复制目录及其内容
 * @param {string} src - 源目录路径
 * @param {string} dest - 目标目录路径
 */
async function copyDir(src, dest) {
    // 验证和规范化路径
    src = validateAndNormalizePath(src);
    dest = validateAndNormalizePath(dest);

    // 检查源目录是否存在
    try {
        await fs.access(src, fs.constants.R_OK);
    } catch (err) {
        console.error(`源目录 ${src} 不存在或无法访问`);
        return;
    }

    // 创建目标目录
    try {
        await fs.mkdir(dest, { recursive: true });
    } catch (err) {
        console.error(`创建目标目录 ${dest} 失败: ${err.message}`);
        return;
    }

    // 读取源目录下的所有文件和目录
    try {
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isFile() && !entry.name.endsWith('.user.ini')) {
                // 如果是文件，直接复制
                // console.log(`复制文件: ${srcPath} -> ${destPath}`);
                await fs.copyFile(srcPath, destPath);
            } else if (entry.isDirectory()) {
                // 如果是目录，递归复制
                await copyDir(srcPath, destPath);
            }
        }
    } catch (err) {
        console.error(`读取源目录 ${src} 失败: ${err.message}`);
    }
}

// 源目录
const sourceDir = path.resolve(__dirname, 'docs/.vitepress/dist');

/**
 * 将构建后的文件复制到博客目录
 */
async function toBlog() {
    const args = process.argv.slice(2); // 去掉前两个元素，只保留命令和参数
    const command = args[0]; // 第一个参数是命令
    const targetDir = path.join(__dirname, `blog/${command || 'vitepress-blog'}`);
    console.log(chalk.grey(`复制😊${sourceDir}😊 => 😊${targetDir}😊`));
    await copyDir(sourceDir, targetDir);
    console.log(chalk.green("复制成功😊"));
}

toBlog().catch(err => {
    console.error(`复制文件时发生错误: ${err.message}`);
});