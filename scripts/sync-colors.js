#!/usr/bin/env node

/**
 * 同步颜色脚本 - 将common/colors目录中的公共颜色定义同步到VSCode和JetBrains主题文件
 */

const fs = require('fs');
const path = require('path');

// 路径定义
const COMMON_COLORS_DIR = path.join(__dirname, '../common/colors');
const VSCODE_THEMES_DIR = path.join(__dirname, '../vscode/themes');
const JETBRAINS_THEMES_DIR = path.join(__dirname, '../jetbrains/src/main/resources/themes');

// 主题映射
const THEME_MAPPING = {
  'dark_plus.json': {
    vscode: 'dark_plus.json',
    jetbrains: 'dark_plus.theme.json'
  },
  'dark_blue.json': {
    vscode: 'dark_blue.json',
    jetbrains: 'dark_blue.theme.json'
  },
  'light.json': {
    vscode: 'light.json',
    jetbrains: 'light.theme.json'
  }
};

// 读取公共颜色文件
function readCommonColors() {
  const colors = {};
  fs.readdirSync(COMMON_COLORS_DIR).forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(COMMON_COLORS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      colors[file] = JSON.parse(content);
    }
  });
  return colors;
}

// 更新VSCode主题
function updateVSCodeThemes(commonColors) {
  Object.keys(THEME_MAPPING).forEach(commonFile => {
    const vsCodeFile = THEME_MAPPING[commonFile].vscode;
    const vsCodeFilePath = path.join(VSCODE_THEMES_DIR, vsCodeFile);
    
    if (!fs.existsSync(vsCodeFilePath)) {
      console.log(`VSCode theme file not found: ${vsCodeFilePath}`);
      return;
    }
    
    try {
      const vsCodeTheme = JSON.parse(fs.readFileSync(vsCodeFilePath, 'utf8'));
      const commonColor = commonColors[commonFile];
      
      // 更新颜色
      if (vsCodeTheme.colors) {
        Object.entries(commonColor.colors).forEach(([key, value]) => {
          // 根据VSCode主题格式映射颜色键
          // 这里需要根据实际情况调整映射规则
          if (key === 'background') vsCodeTheme.colors['editor.background'] = value;
          if (key === 'foreground') vsCodeTheme.colors['editor.foreground'] = value;
          // 添加更多映射...
        });
      }
      
      // 更新代码着色
      if (vsCodeTheme.tokenColors && commonColor.tokenColors) {
        // 更新代码着色，需要根据实际情况调整
      }
      
      // 写回文件
      fs.writeFileSync(vsCodeFilePath, JSON.stringify(vsCodeTheme, null, 2), 'utf8');
      console.log(`Updated VSCode theme: ${vsCodeFilePath}`);
    } catch (error) {
      console.error(`Error updating VSCode theme ${vsCodeFilePath}:`, error);
    }
  });
}

// 更新JetBrains主题
function updateJetBrainsThemes(commonColors) {
  Object.keys(THEME_MAPPING).forEach(commonFile => {
    const jetbrainsFile = THEME_MAPPING[commonFile].jetbrains;
    const jetbrainsFilePath = path.join(JETBRAINS_THEMES_DIR, jetbrainsFile);
    
    if (!fs.existsSync(jetbrainsFilePath)) {
      console.log(`JetBrains theme file not found: ${jetbrainsFilePath}`);
      return;
    }
    
    try {
      const jetbrainsTheme = JSON.parse(fs.readFileSync(jetbrainsFilePath, 'utf8'));
      const commonColor = commonColors[commonFile];
      
      // 更新UI颜色
      if (jetbrainsTheme.ui && jetbrainsTheme.ui['*']) {
        jetbrainsTheme.ui['*'].background = commonColor.colors.background;
        jetbrainsTheme.ui['*'].foreground = commonColor.colors.foreground;
        jetbrainsTheme.ui['*'].selectionBackground = commonColor.colors.selection;
        jetbrainsTheme.ui['*'].selectionForeground = commonColor.colors.selectionForeground;
        // 添加更多映射...
      }
      
      // 写回文件
      fs.writeFileSync(jetbrainsFilePath, JSON.stringify(jetbrainsTheme, null, 2), 'utf8');
      console.log(`Updated JetBrains theme: ${jetbrainsFilePath}`);
    } catch (error) {
      console.error(`Error updating JetBrains theme ${jetbrainsFilePath}:`, error);
    }
  });
}

// 主函数
function main() {
  console.log('Starting color sync...');
  const commonColors = readCommonColors();
  updateVSCodeThemes(commonColors);
  updateJetBrainsThemes(commonColors);
  console.log('Color sync completed.');
}

main(); 