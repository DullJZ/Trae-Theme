# icube 主题

这是一个为VS Code/Cursor和JetBrains IDE设计的主题插件，提供了以下主题选项：

- **Dark+**：深色主题，提供良好的对比度
- **Deep Blue**：深蓝色主题，带有蓝色调
- **Light**：浅色主题，明亮清晰

## 目录结构

项目采用模块化结构，同时支持VS Code和JetBrains IDE平台：

```
/
├── vscode/                  # VSCode插件相关文件
├── jetbrains/               # JetBrains插件相关文件
├── common/                  # 共享资源和颜色定义
└── scripts/                 # 构建和同步脚本
```

## 安装方法

### VSCode/Cursor

#### 从VSIX安装
1. 下载最新的发布版本(.vsix文件)
2. 在VS Code/Cursor中，选择"从VSIX安装..."选项
3. 选择下载的VSIX文件

#### 通过命令行安装
```bash
# VS Code
code --install-extension icube-themes-x.x.x.vsix

# Cursor
cursor --install-extension icube-themes-x.x.x.vsix
```

### JetBrains IDE

#### 从磁盘安装
1. 下载最新的发布版插件文件(.zip)
2. 在JetBrains IDE中，打开 Settings/Preferences (Ctrl+Alt+S / ⌘,)
3. 选择 Plugins
4. 点击齿轮图标，选择 "Install Plugin from Disk..."
5. 选择下载的插件文件
6. 重启IDE

## 应用主题

### VSCode/Cursor
1. 打开命令面板 (Cmd+Shift+P 或 Ctrl+Shift+P)
2. 输入 "Color Theme"
3. 选择一个icube主题

### JetBrains IDE
1. 在JetBrains IDE中，打开 Settings/Preferences (Ctrl+Alt+S / ⌘,)
2. 导航至 Appearance & Behavior > Appearance
3. 在"Theme"下拉菜单中选择以下主题之一：
   - icube Dark+
   - icube Deep Blue
   - icube Light
4. 点击 Apply 或 OK

## 开发

### 环境设置
1. 克隆仓库
2. 安装Node.js (用于VSCode插件和同步脚本)
3. 安装JDK 11+ (用于JetBrains插件)

### 修改主题
主题颜色定义位于 `common/colors/` 目录，修改这些文件后运行同步脚本即可更新两个平台的主题：

```bash
node scripts/sync-colors.js
```

### 构建插件

#### 构建全部平台插件
```bash
# Linux/macOS
./scripts/build-all.sh

# Windows
# 请在bash环境中运行，如Git Bash
bash scripts/build-all.sh
```

#### 仅构建VSCode插件
```bash
node scripts/build-vscode.js
```

#### 仅构建JetBrains插件
```bash
# Linux/macOS
./scripts/build-jetbrains.sh

# Windows
# 请在bash环境中运行，如Git Bash
bash scripts/build-jetbrains.sh
```

生成的插件文件将保存在 `dist/` 目录中。

## 免责声明
**重要提示**：此主题是移植版本。仅供学习和个人使用，不建议在商业环境中使用。

使用本主题可能涉及版权问题，使用者需自行承担所有法律责任和后果。

**使用前请确保您了解并接受这些条款。** 