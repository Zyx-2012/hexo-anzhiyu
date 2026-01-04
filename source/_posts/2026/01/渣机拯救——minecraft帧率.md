---
title: 渣机拯救——minecraft帧率
cover: /img/blog/渣机拯救——minecraft帧率/cover.webp
tags:
  - 优化
  - minecraft
  - Intel
  - 核显
categories:
  - 教程
abbrlink: 3c839649
date: 2026-01-04 19:11:29
---

# 前言

本篇博客皆在拯救那些轻薄本电脑配置差没有独显却还想玩Minecraft高版本的人。

本篇教程仅以我的配置作为参考，我优化成功并不保证你优化成功，但是如果你有问题很欢迎再评论区提问。

{% note warning no-icon %}

请您在执行本篇博客所说的操作前先备份！！！先备份！！！先备份！！！
若因您自身原因导致您的个人财产损失，本博客作者以及相关平台不负任何责任

{% endnote %}

## 我的配置

### 硬件

CPU: 12th Gen Intel(R) Core(TM) i7-1260P
GPU: Intel(R) Iris(R) Xe Graphics  __其实算核显，也就是处理器显卡。即用CPU模拟出的GPU__
RAM: 16GB

### 软件

启动器: PCL2 v2.12.1
Java: JDK 24.0.1
客户端: Minecraft Java 1.21.6  __算是高版本了，我平常也玩这个__
Mod加载器: Fabric  __致敬我们的神……__

# 正篇

我优化渣机，总共分为3各部分，效果强弱循序渐进。建议你先进行弱优化，如果还不满意再进行强优化

{% note warning no-icon %}
接下来的操作在不开光影、服务器内的前提下，当然如果你开了光影或不在服务器内，你的结果肯定会查一下。而且因为我们大概率不在一个服务器，所以你的帧率肯定与我有差别
{% endnote %}

## 游戏内优化

### Mod

首先，玩fabric的不可能不知道sodium。它非常逆天，可以大幅提升帧率。如果你想加光影，可以将Iris一起安装。
我的建议是跟sodium有关的都装上（包括什么sodium扩展啥的）

其次，还有lithium也装上，这个也可以优化帧率。

entity-desync-viewer可以优化实体渲染，能大幅提升帧率。

内存优化最著名的就是铁氧体磁芯了，装这个就行。还有一个modernfix也能优化内存。

{% folding 这是我的Mod列表 %}

我的所有mod（现在的）都在这里，可以看着装。当然如果懒的话文章结尾还有我制作的整合包可以直接下载

```
├── RoughlyEnoughItems-20.0.811-fabric.jar
├── CustomSkinLoader_Fabric-14.27.jar
├── architectury-17.0.6-fabric.jar
├── autoreconnectrf-fabric-2.0.1+1.21.8.jar
├── badpackets-fabric-0.9.0.jar
├── baritone-standalone-fabric-1.14.0-1-g2fd2369b.jar
├── BetterF3-15.0.0-Fabric-1.21.6.jar
├── BetterGrassify-1.8.3+fabric.1.21.10.jar
├── bettermounthud-1.2.6.jar
├── BorderlessWindowedVulkan-1.0.0+1.21.6.jar.disabled
├── chat_heads-0.14.2-fabric-1.21.6.jar
├── chatanimation-1.0.7.jar
├── cloth-config-19.0.147-fabric.jar
├── continuity-3.0.1-beta.1+1.21.6.jar
├── Controlling-fabric-1.21.6-24.0.2.jar
├── cullleaves-fabric-4.1.1+1.21.8.jar
├── Debugify-1.21.5+1.0.jar
├── dynamic-fps-3.9.6+minecraft-1.21.6-fabric.jar
├── dynamiccrosshair-9.11+1.21.6-fabric.jar
├── dynamiccrosshaircompat-4.4+1.21.6-fabric.jar
├── e4mc_minecraft-fabric-5.4.1.jar
├── entity-desync-viewer-1.0.3+1.21.5.jar
├── entity-view-distance-1.5.0+1.21.6.jar
├── entityculling-fabric-1.8.2-mc1.21.6.jar
├── essential_commands-0.37.4-mc1.21.6.jar
├── fabric-api-0.128.2+1.21.6.jar
├── fabric-language-kotlin-1.13.8+kotlin.2.3.0.jar
├── fabrishot-1.16.2.jar
├── fast-chest-revived-1.2.jar
├── fastquit-3.1.1+mc1.21.6.jar
├── ferritecore-8.0.0-fabric.jar
├── ForgeConfigAPIPort-v21.6.4-1.21.6-Fabric.jar
├── Gamma-Utils-2.3.6+mc1.21.8.jar
├── IMBlocker-5.4.6-fabric+1.17-1.21.8.jar
├── ImmediatelyFast-Fabric-1.10.1+1.21.6.jar
├── InventoryProfilesNext-fabric-1.21.6-2.2.3.jar
├── iris-fabric-1.9.6+mc1.21.8.jar
├── Jade-1.21.8-Fabric-19.3.2.jar
├── kotlinforforge-5.9.0-all.jar.disabled
├── krypton-0.2.9.jar
├── lambdynamiclights-4.8.7+1.21.8.jar
├── language-reload-1.7.4+1.21.6.jar
├── libIPN-fabric-1.21.6-6.6.2.jar
├── litematica-fabric-1.21.8-0.23.5.jar
├── litematica-printer-1.21.6-3.2.1-sakura.6.jar
├── lithium-fabric-0.17.0+mc1.21.6.jar
├── main-menu-credits-1.2.0.jar
├── malilib-fabric-1.21.8-0.25.7.jar
├── mixintrace-1.1.1+1.17.jar
├── modelfix-1.21.5-1.12.jar
├── modernfix-fabric-5.20.4-1.21.6.jar
├── modmenu-15.0.0.jar
├── morechathistory-1.3.1.jar
├── moreculling-fabric-1.21.6-1.4.0-beta.1.jar
├── NoChatReports-FABRIC-1.21.6-v2.13.0.jar
├── open-parties-and-claims-fabric-1.21.6-0.24.4.jar
├── optigui-2.3.0-beta.7+1.21.6.jar
├── PaginatedAdvancements-2.7.0+1.21.7-neoforge.jar.disabled
├── placeholder-api-2.7.1+1.21.6.jar
├── puzzle-fabric-2.1.1+1.21.6.jar
├── reeses-sodium-options-fabric-1.8.4+mc1.21.6.jar
├── renderscale-fabric-1.21.8-1.3.3.jar
├── rrls-5.1.8+mc1.21.6-fabric.jar
├── Searchables-fabric-1.21.6-1.0.3.jar
├── silk-all-1.11.2.jar
├── sodium-extra-fabric-0.6.6+mc1.21.6.jar
├── sodium-fabric-0.7.3+mc1.21.8.jar
├── syncmatica-fabric-1.21.8-0.3.15.jar
├── tick-predictor-1.0.7.jar
├── tickrate-0.5.0-1.21.6.jar
├── tweakeroo-fabric-1.21.8-0.25.6.jar
├── veinminer-fabric-2.5.0.jar
├── Xaeros_Minimap_25.2.7_Fabric_1.21.6.jar
├── yet_another_config_lib_v3-3.7.1+1.21.6-fabric.jar
├── yosbr-0.1.2.jar
└── Zoomify-2.14.4+1.21.6.jar
```

{% endfolding %}

### 设置

{% note warning no-icon %}
这是依据我电脑配置进行的设置，如果你的电脑与我的不同，建议求助AI以获得更合理、更适合你设备的设置
{% endnote %}

#### Java启动参数

```bash
-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1
```

#### 内存设置

3~4 GB

#### 其它设置

进程优先级：高

## 游戏外优化/电脑优化

### 杂

下载一个 `memreduct` 工具清理内存（虽然没啥卵用）

清后台

插电源适配器

开高性能模式

(额这些优化大家可能已经试过了)

### 显卡驱动升级

这个非常重要，我电脑一开始默认的是22年的驱动，大版本号30，不开光影平均40FPS；升级后是25年的驱动，大版本号32，不开光影平均120FPS。翻了4倍。

这里只说一下Intel的，Intel大多数是核显（毕竟能买独显谁买Intel），点击[这里]()打开Intel官网搜索你的显卡型号，最终会出现一个类似“英特尔XX-XX代处理器显卡”，点击打开，会有一个蓝色的按钮，点击下载exe文件（很大，差不多1GB左右）。

下载后，用解压工具将它解压，会有一个文件夹，进入Graphics文件夹，会有一个 `iigd_dch.inf` 文件（反正我这个版本有）。

`Win+x` ，按 `M` ，打开设备管理器，下滑找到“显示适配器”，展开，双击你显卡型号，会出现一个类似于这样的窗口

![窗口](/img/blog/渣机拯救——minecraft帧率/image1.png)

点击“驱动程序”选项卡，点击“更新驱动程序”，点击“浏览我的电脑以查找驱动程序”，点击“让我从计算机上的可用驱动程序列表中选取”，点击“从磁盘安装”，选择刚才的 `iigd_dch.inf` 文件，点击确认，不断的确认。如果有警告直接无视即可。

安装好驱动以后在设备管理器中看一下你驱动程序的版本是不是更新了，若更新了则代表安装成功。

## 试试

你现在可以试试，不出意外你的帧率会有很大的提升

# 尾

这篇文章的灵感来源于前两天我闲的没事想优化minecraft帧率，主要是30的帧率太感人了……

我就问Gemini3Pro，结果还真让它把ChatGPT5都没解决的问题解决了。

现在我可以享受不开光影120+，开光影50左右的帧率了。

## 整合包

{% btns circle center grid5 %}
<a href='/zip/整合包/1.21.6-Fabric 2.1.0.zip' class="no-text-decoration">
<i class='anzhiyufont anzhiyu-icon-mc-package'></i>
<b>我的渣机整合包</b>
{% p green, v2.1.0 %}
<img src=''>
</a>
{% endbtns %}