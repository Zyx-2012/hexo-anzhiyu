---
title: Hexo建站教程
cover: '/img/blog/[笔记]Hexo建站教程-完整/cover.webp'
abbrlink: 7f189df5
date: 2025-09-17 22:00:31
updated: 2025-10-12 11:44:23
---

# 前言

本教程以win11电脑为本地环境，netlify+zeabur为云环境，目前可做到除域名外全免费

{% folding 点击打开 %}

网上有很多教程，当然也有很多自称详细的教程，但是我认为仍然有些点不够详细易懂，而且有些点较为罗嗦，评论后又无人应答。所以，我将在本期博客写一个详细的、长期维护的教程

{% endfolding %}

# 步骤

## 准备

### 账号及云服务

一个常用邮箱（github账号用邮箱注册，其他账号均使用github账号注册）

一个[github](https://github.com)账号

一个[netlify](https://netlify.com)账号

一个[zeabur](https://zeabur.com)账号

一个[域名](https://aliyun.com)（可选，推荐）

一个提供域名解析的DNS服务器

### 其他

git（可选， **强烈推荐** ，已配置好的。可以参考其他教程）

一个在你电脑中的文件夹，需保证你有足够权限（即增删改查）

npm包管理器（可在 `cmd` 输入 `npm -v` 来确认）

## 开始

### 初始运行

首先，打开 `cmd` ，输入:

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
```

然后你就会发现你的文件夹中多了个 `blog` 文件夹，将 `blog` 文件夹拖到vscode（使用vscode打开）

然后 `` ctrl+shift+` `` 打开终端，输入 `git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu` ，安装 `anzhiyu` 主题（这一步如果有问题，看 [官方文档](https://docs.anheyu.com/initall.html) ，（{% del 如果还有问题，别找我，因为我也不会 :| %}）

安装完成后，控制台输入 `hexo server` ，然后访问 `http://localhost:4000`

你会发现，显示出来这样一个页面

![anzhiyu初始画面](/img/blog/[笔记]Hexo建站教程-完整/anzhiyu主题初始图片-模糊.png)

### 基本配置

这个看[官方文档](https://docs.anheyu.com)即可

### 部署云端

当本地都配置好后，将文件上传至github仓库（使用git）

在[Netlify](https://netlify.com)使用github登录后，添加项目->从github添加->选择你上传的项目->起名（用于生成 `.netlify.app` 为一级域名的二级域名）->部署项目

如果部署成功，等几分钟访问看看，能不能进得去。
如果可以，配置DNS即可

### 优选DNS配置

当netlify的DNS好了，且netlify给你配置的SSL证书已经添加好了（通常不超过24小时），你可将CNAME记录值改为 `netlify-cname.xingpingcn.top` 。
然后等几分钟，就会发现国内的访问速度从最高10秒降低到了5秒以下

# 未完待续

未完待续

有什么不懂的可以评论，我将在有时间的情况下根据评论的建议维护该文章