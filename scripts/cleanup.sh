#!/bin/bash

# 清理旧目录和文件

echo "Cleaning up old directories and files..."

# 删除旧的src目录（已经移动到jetbrains/src）
if [ -d "src" ]; then
  rm -rf src
  echo "Removed old src directory"
fi

# 删除旧的themes目录（内容已经移动到vscode/themes）
if [ -d "themes" ]; then
  rm -rf themes
  echo "Removed old themes directory"
fi

# 删除旧的fileicons目录（内容已经移动到vscode/fileicons）
if [ -d "fileicons" ]; then
  rm -rf fileicons
  echo "Removed old fileicons directory"
fi

# 删除旧的gradle目录（内容已经移动到jetbrains/gradle）
if [ -d "gradle" ]; then
  rm -rf gradle
  echo "Removed old gradle directory"
fi

echo "Cleanup completed!" 