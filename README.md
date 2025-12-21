### React + TypeScript + Vite

### 1 项目创建
##### 1.1 使用Vite创建项目
```shell
# test-admin-ui 表示项目名称，react-ts表示创建React+TypeScript项目
$ npm create vite@latest test-admin-ui -- --template react-ts
```

##### 1.2 删除ESLint相关以及清空App.css和index.css文件内容
##### 1.3 安装依赖
```shell
$ npm install
```
##### 1.4 配置TailwindCSS 4.0 [官方文档](https://tailwindcss.com/docs/installation/using-vite)
##### 1.5 配置Shadcn-UI [官方文档](https://ui.shadcn.com/docs/installation/vite)

### 2 项目安装
```shell
# 安装依赖
$ npm install
# 初始化 Shadcn-UI（注意：这个命令会提示输入一些配置，直接使用默认的即可）
$ npx shadcn@latest init
```

### 3 Shadcn-UI添加组件简单使用
```shell
# 命令执行完成后会在src/components/ui目录下生成对应代码
$ npx shadcn@latest add button
```