// 解密app.js文件的脚本
const fs = require('fs');
const path = require('path');

// 读取app.js文件
const appJsPath = path.join(__dirname, 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

console.log('开始解密app.js文件...');

// 创建一个模拟的浏览器环境
const window = {};
global.window = window;
global.document = {
    createElement: () => ({}),
    getElementsByTagName: () => ([]),
    body: {}
};

try {
    // 尝试执行加密的代码
    eval(appJsContent);
    
    console.log('解密成功！');
    console.log('\n全局变量：');
    console.log(Object.keys(window));
    
    // 检查是否有弹窗内容相关的变量
    if (window.popupMessages) {
        console.log('\n弹窗内容数组 (popupMessages)：');
        console.log(window.popupMessages);
    }
    
    if (window.messages) {
        console.log('\n弹窗内容数组 (messages)：');
        console.log(window.messages);
    }
    
    // 检查其他可能存储弹窗内容的变量
    for (const key in window) {
        if (Array.isArray(window[key]) && window[key].length > 0 && typeof window[key][0] === 'string') {
            console.log(`\n可能的弹窗内容数组 (${key})：`);
            console.log(window[key]);
        }
    }
    
} catch (error) {
    console.error('解密失败：', error.message);
    console.error('错误堆栈：', error.stack);
}
