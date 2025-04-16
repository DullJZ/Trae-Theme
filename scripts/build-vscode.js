#!/usr/bin/env node

/**
 * VSCode插件构建脚本
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 确保先同步颜色
console.log('Syncing colors...');
try {
  require('./sync-colors');
} catch (error) {
  console.error('Error syncing colors:', error);
  process.exit(1);
}

// 复制LICENSE文件到VSCode目录
const licensePath = path.join(__dirname, '../LICENSE.txt');
const vscodeLicensePath = path.join(__dirname, '../vscode/LICENSE.txt');
if (fs.existsSync(licensePath) && !fs.existsSync(vscodeLicensePath)) {
  fs.copyFileSync(licensePath, vscodeLicensePath);
  console.log('Copied LICENSE.txt to VSCode directory');
}

// 构建VSCode插件
console.log('\nBuilding VSCode extension...');
try {
  // 切换到VSCode目录
  process.chdir(path.join(__dirname, '../vscode'));
  
  // 检查是否安装了vsce
  try {
    execSync('vsce --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('Installing vsce...');
    execSync('npm install -g @vscode/vsce', { stdio: 'inherit' });
  }
  
  // 生成vsix包
  console.log('Packaging extension...');
  execSync('vsce package', { stdio: 'inherit' });
  
  // 移动生成的vsix到项目根目录
  const distDir = path.join(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // 查找并移动生成的vsix文件
  const files = fs.readdirSync('.');
  const vsixFile = files.find(file => file.endsWith('.vsix'));
  if (vsixFile) {
    const targetPath = path.join(distDir, vsixFile);
    fs.copyFileSync(vsixFile, targetPath);
    console.log(`VSCode extension packaged successfully: ${targetPath}`);
  } else {
    console.error('No .vsix file found after packaging');
  }
} catch (error) {
  console.error('Error building VSCode extension:', error.message);
  process.exit(1);
} 