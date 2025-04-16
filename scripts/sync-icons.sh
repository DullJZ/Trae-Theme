#!/bin/bash

# 图标同步脚本 - 将common/icons目录中的图标同步到VSCode和JetBrains插件

# 确保在脚本所在目录执行
cd "$(dirname "$0")"

# 定义路径
COMMON_ICONS_DIR="../common/icons"
JETBRAINS_ICONS_DIR="../jetbrains/src/main/resources/META-INF"
VSCODE_ICONS_DIR="../vscode"

echo "Syncing icons between platforms..."

# 确保目标目录存在
mkdir -p "$JETBRAINS_ICONS_DIR"
mkdir -p "$VSCODE_ICONS_DIR"

# 同步pluginIcon.svg到JetBrains
if [ -f "$COMMON_ICONS_DIR/pluginIcon.svg" ]; then
  cp "$COMMON_ICONS_DIR/pluginIcon.svg" "$JETBRAINS_ICONS_DIR/"
  echo "Synced pluginIcon.svg to JetBrains plugin"
else
  echo "Warning: pluginIcon.svg not found in common icons directory"
fi

# 同步icon.png到VSCode（如果存在）
if [ -f "$COMMON_ICONS_DIR/icon.png" ]; then
  cp "$COMMON_ICONS_DIR/icon.png" "$VSCODE_ICONS_DIR/"
  echo "Synced icon.png to VSCode extension"
else
  echo "Note: No icon.png found in common icons directory"
fi

echo "Icon sync completed!" 