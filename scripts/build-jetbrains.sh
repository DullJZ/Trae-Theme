#!/bin/bash

# JetBrains插件构建脚本

# 确保在脚本所在目录执行
cd "$(dirname "$0")"

# 先同步颜色
echo "Syncing colors..."
node ./sync-colors.js

# 构建JetBrains插件
echo -e "\nBuilding JetBrains plugin..."
cd ../jetbrains

# 使用Gradle构建插件
echo "Running Gradle build..."
./gradlew clean buildPlugin

# 检查构建是否成功
if [ $? -ne 0 ]; then
  echo "Error: JetBrains plugin build failed"
  exit 1
fi

# 创建dist目录
mkdir -p ../dist

# 复制插件到dist目录
ZIP_FILE=$(find build/distributions -name "*.zip" -type f)
if [ -n "$ZIP_FILE" ]; then
  cp "$ZIP_FILE" ../dist/
  echo "JetBrains plugin built successfully: ../dist/$(basename "$ZIP_FILE")"
else
  echo "Error: Could not find built plugin zip file"
  exit 1
fi 