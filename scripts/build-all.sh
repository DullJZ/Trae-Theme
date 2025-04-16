#!/bin/bash

# 主构建脚本 - 构建VSCode和JetBrains插件

# 确保在脚本所在目录执行
cd "$(dirname "$0")"

# 创建dist目录
mkdir -p ../dist

# 同步资源
echo "Syncing resources between platforms..."
echo "- Syncing colors"
node ./sync-colors.js
echo "- Syncing icons"
bash ./sync-icons.sh

# 构建VSCode插件
echo -e "\n========== Building VSCode Extension =========="
node ./build-vscode.js
if [ $? -ne 0 ]; then
  echo "Error: VSCode extension build failed"
fi

# 构建JetBrains插件
echo -e "\n========== Building JetBrains Plugin =========="
bash ./build-jetbrains.sh
if [ $? -ne 0 ]; then
  echo "Error: JetBrains plugin build failed"
fi

echo -e "\n========== Build Summary =========="
echo "Build artifacts can be found in the 'dist' directory:"
ls -la ../dist/

echo -e "\nBuild process completed!" 