---
title: Notion-File-Management
cover: '/img/blog/NFM--将你的Notion变成网盘/cover.webp'
tags:
  - 工具
  - 自创
  - 项目
categories:
  - 分享
date: 2026-01-02 12:42:54
---

首先，祝大家新年快乐！

# NFM介绍及灵感

[Notion-File-Management](https://github.com/RuibinNingh/Notion-Files-Management)（下文简称 NFM ） 是一个可以将你的Notion变成不限存储的网盘的工具，由 Zyx_2012 （本人）和 [Ruibin_Ningh](https://www.ruibin-ningh.top/) 合作开发。

该设计灵感由 Ruibin_Ningh 提出，利用 Notion 的无限存储和它上传下载文件的 API ，组建成一个不限存储、不限速的“网盘”（{%del 挺出生的其实…… %}）

# 具体做法

我们的技术栈采用 **纯Py** （万能的Python）实现。
目前只有TUI页面，后续功能完善后会推出GUI版本。

使用 Notion 官方的 API 实现上传和下载功能。由于 Notion 限制上传单个文件最大5GB（Plus会员情况下，通过教育邮箱注册 Notion 账号即可开通教育Plus），所以对于大于5GB的文件，我们做了自动检测切片处理，将文件切成20MB的多份，并依次上传。考虑到 Notion 网络连接可能不稳定，上传部分做了重试功能，当前切片若连接超时或上传失败，可重试上传，每次重试描述呈指数级增长，最高增长至 $2^{6}$

对于不支持上传的文件格式（后缀），我们做了伪装处理。即通过给文件名尾添加 `.txt` 伪装成txt文件，下载时也会自动识别是否做伪装处理（结尾是否有 `.xx.txt` 形式），若有则删除 `.txt` 。

# 态度

## 收费

目前 NFM 工具完全免费（我们是共产主义接班人！！！）且开源，任何人都可以使用。

## 协议

使用 [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) 协议。

# 关于该工具

目前仅Windows版是编译好的，即在github下载压缩包（不是源码压缩包）后解压，需将里面的文件放在同一目录下，并运行 main.exe 即可。

MacOS和Linux需要按照项目 README.md 中说的自行配置环境（很惨，但只能这样，因为我和Ruibin_Ningh的电脑都是Win11），可自行编译也可每次用的时候运行解释。

# 使用教程及 **更全** 思路过程

{% link 点击进入,Ruibin_Ningh的博客文章,https://www.ruibin-ningh.top/archives/Notion-Files-Management %}

# 别白嫖

我们都开源且完全免费了，你真的不给颗 Star 吗？：）