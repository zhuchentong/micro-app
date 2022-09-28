# STEP1: 构建基础镜像
FROM node:16-alpine AS base
# -设置环境变量
ENV APP_PATH=/app
# -设置工作目录
WORKDIR $APP_PATH
# -安装pnpm
RUN  npm config set registry https://registry.npm.taobao.org \
  && npm install -g pnpm

# STEP2: 构建依赖镜像
FROM base as installer
# -复制依赖相关目录
COPY package.json .npmrc .pnpm-lock.yaml ./
# -安装依赖
RUN pnpm i


# STEP3: 构建运行镜像
FROM base as builder
# -复制代码文件
COPY . .
# -复制依赖文件
COPY --from=installer $APP_PATH/node_modules ./node_modules
# -运行编译
RUN pnpm run build


# STEP4: 运行Nginx服务
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/nginx.conf

COPY --from=builder /builder/dist/ /usr/share/nginx/html/
COPY --from=builder /builder/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
