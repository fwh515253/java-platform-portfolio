#!/usr/bin/env bash

set -Eeuo pipefail

# 可通过环境变量覆盖默认值：
# APP_DIR=/var/www/portfolio-site APP_NAME=portfolio-site BRANCH=main bash deploy.sh
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$SCRIPT_DIR}"
APP_NAME="${APP_NAME:-portfolio-site}"
BRANCH="${BRANCH:-main}"

log() {
  printf '\n[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1"
}

fail() {
  printf '\n部署失败：%s\n' "$1" >&2
  exit 1
}

command -v git >/dev/null 2>&1 || fail "未找到 git"
command -v npm >/dev/null 2>&1 || fail "未找到 npm"
command -v pm2 >/dev/null 2>&1 || fail "未找到 pm2"

cd "$APP_DIR" || fail "项目目录不存在：$APP_DIR"

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "不是 Git 仓库：$APP_DIR"

if [[ -n "$(git status --porcelain)" ]]; then
  fail "工作区存在未提交改动，请先处理后再部署"
fi

log "拉取 origin/$BRANCH 最新代码"
git pull --ff-only origin "$BRANCH"

log "安装项目依赖"
npm ci

log "构建生产版本"
npm run build

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  log "重启 PM2 应用：$APP_NAME"
  pm2 restart "$APP_NAME" --update-env
else
  log "首次创建 PM2 应用：$APP_NAME"
  pm2 start npm --name "$APP_NAME" -- start
fi

pm2 save

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files nginx.service >/dev/null 2>&1; then
  log "重新加载 Nginx 配置"
  sudo systemctl reload nginx
fi

log "部署完成"
printf '提交版本：%s\n' "$(git rev-parse --short HEAD)"
printf '应用状态：\n'
pm2 status "$APP_NAME"
