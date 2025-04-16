#!/usr/bin/env node

/**
 * SVG转PNG脚本
 * 
 * 此脚本用于将common/icons目录中的SVG图标转换为PNG格式
 * 需要安装node包：npm install sharp
 */

console.log('To convert SVG to PNG, please install the following packages:');
console.log('npm install sharp');
console.log('\nThen run this script again:');
console.log('node scripts/svg-to-png.js');

/*
// 取消下面的注释并安装依赖包后运行

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const COMMON_ICONS_DIR = path.join(__dirname, '../common/icons');

// 将SVG转换为PNG
async function convertSvgToPng(svgPath, pngPath, size = 128) {
  try {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    console.log(`Converted ${path.basename(svgPath)} to ${path.basename(pngPath)}`);
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error);
  }
}

// 主函数
async function main() {
  console.log('Converting SVG icons to PNG...');
  
  // 查找SVG文件
  const files = fs.readdirSync(COMMON_ICONS_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  if (svgFiles.length === 0) {
    console.log('No SVG files found in common/icons directory.');
    return;
  }
  
  // 转换每个SVG文件
  for (const svgFile of svgFiles) {
    const svgPath = path.join(COMMON_ICONS_DIR, svgFile);
    const pngPath = path.join(COMMON_ICONS_DIR, svgFile.replace('.svg', '.png'));
    await convertSvgToPng(svgPath, pngPath);
  }
  
  console.log('Conversion completed!');
}

main().catch(console.error);
*/ 