---
title: 友链
date: 2025-09-13 22:14:35
type: "link"
aside: false
top_img: false
---

# 友情链接申请相关

{% folding 原则方面 %}

本人自开学以来在线强度呈滑梯式减少，没有及时加到的友链请见谅~

{% del 被大佬博客通过友链的网站更容易过审本站友链 %}

默认分类为 ``常规`` ，与博主认识的会被分到 ``朋友``

{% endfolding %}

{% folding open, 免责声明 %}

## 免责声明

[本博客](https://blog.zyx-2012.cn)遵守中华人民共和国现行法律法规，所有内容均以学习与技术交流为目的，不得用于任何非法用途。

博客中包含部分由他人原创、转载或友链推荐的内容与链接（包括但不限于“**好文推荐**”、“**友情链接**”等），这些内容**均来源于互联网公开信息**，本站作者无法完全逐条审核其内容安全性、合法性或时效性。因此：

在我力所能及的范围内，我将：

- 对收录内容进行基本的标题**筛选**，**尽力排查**明显的违法或风险内容；
- 定期检查已收录链接，**发现问题**将及时移除或更正；
- 鼓励用户举报疑似违法或违规链接内容，以便及时处理。

但请注意，以下情况可能仍会发生，本站无法承担由此带来的任何直接或间接责任：

- 原站点更换或篡改链接内容；
- 原作者服务器被攻击、被注入恶意代码；
- 域名被他人注册并用于违法用途；
- 原文被修改，加入钓鱼、广告或其他误导性内容；
- 第三方站点存在隐私收集、信息泄露等潜在风险；

若您在浏览本站内容或跳转到其他站点后造成了任何损失，我们对此深表遗憾，并建议您第一时间通过邮箱联系我：``1051270035@qq.com``，我们将在核实后尽快处理问题链接。

也欢迎在评论区留言反馈，感谢您的理解与支持。
{% endfolding %}

{% folding open,我的友链 %}

### 我的友链

{% tabs FLink %}

<!-- tab Butterfly -->

```yml
- name: 折腾日记
  link: https://blog.zyx-2012.cn/
  avatar: https://blog.zyx-2012.cn/favicon.ico
  descr: 专注于笔记、分享的博客
  siteshot: https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.zyx-2012.cn/
```

<!-- endtab -->

<!-- tab Fuild -->

```yml
- {
    title: "折腾日记",
    intro: "专注于笔记、分享的博客",
    link: "https://blog.zyx-2012.cn/",
    image: "https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.zyx-2012.cn/",
  }
```

<!-- endtab -->

<!-- tab html -->

```HTML
<a href="https://blog.zyx-2012.cn/" rel="external nofollow">折腾日记</a>
```

<!-- endtab -->

{% endtabs %}

我的rss: [atom.xml](https://blog.zyx-2012.cn/atom.xml)

{% endfolding %}

自行确认以上条件都符合就可以申请友链了

我在看到后会马上加，如果没及时添加请见谅，可能在忙没看到，可以发邮件给我催催 QaQ {% del 当然就算发邮箱了我也可能看不到 %}

> 注：
> 未提供站点预览图的，本站会根据贵站链接调用以下 API 自动获取贵站的站点截图。**(该API没有延迟截图)**
> **温馨提示：有加载动画或开屏弹窗等，建议自行截图**
> 
> ```url
> https://image.thum.io/get/width/800/crop/1600/allowJPG/wait/20/anheyu.com/https://<你的域名>/
> ```

## 申请格式

```yml
- name: 网站名
  link: 网站链接
  avatar: 网站ico
  descr: 网站描述
  siteshot: 网站首页图(若分类是“常规”该选项可忽略，不会用到)的 **URL**
  color: 你想要的颜色的16进制格式 ，例如 `#123456`，若不选则填 `vip`
  tag: 你想要的标签内容，可选
```

## 注意事项

- ``siteshot`` 不能直接粘贴图片，要填URL
- 一切资源确保可以访问
- 链接要加 ``http://`` / ``https://``

## 友链添加条件

{% folding open,条件 %}

<p  style="padding: 0px 0px 0px 0.8rem;">
请<strong>勾选</strong>你符合的条件：
</p>

<div id="friendlink_checkboxs" style="padding: 0px 0px 0px 1.6rem">
  <p>
    <label chass="checkbox"><input type="checkbox" id="checkbox1" onclick="checkForm()">我已添加 <a href="https://blog.zyx-2012.cn">Zyx_2012</a> 的友情链接
  </p>
  <p>
    <label chass="checkbox"><input type="checkbox" id="checkbox2" onclick="checkForm()">我的链接主体为 <b>个人</b>，网站类型为 <b>博客</b>
  </p>
  <p>
    <label chass="checkbox"><input type="checkbox" id="checkbox3" onclick="checkForm()">我的网站可以在 <b>中国大陆</b> 内访问
  </p>
  <p>
    <label chass="checkbox"><input type="checkbox" id="checkbox4" onclick="checkForm()">我的网站内容 <b>积极向上正能量</b> 并 <b>符合中华人民共和国法律</b>
  </p>
  <p>
    <label chass="checkbox"><input type="checkbox" id="checkbox5" onclick="checkForm()">我的网站可以在 <b>1分钟内</b> 加载完成 <b>首屏</b>
  </p>
</div>

{% endfolding %}

<script>
    var twikooSubmit = document.getElementsByClassName("tk-submit")[0];
    if(twikooSubmit) {
      twikooSubmit.style.opacity = "0";
    }
    function checkForm() {
        var checkbox1 = document.getElementById("checkbox1");
        var checkbox2 = document.getElementById("checkbox2");
        var checkbox3 = document.getElementById("checkbox3");
        var checkbox4 = document.getElementById("checkbox4");
        var checkbox5 = document.getElementById("checkbox5");
        var twikooSubmit = document.getElementsByClassName("tk-submit")[0];
        if (checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked) {
            twikooSubmit.style.opacity = "1";
            twikooSubmit.style.height = "auto";
            twikooSubmit.style.overflow = "auto";
            var input = document.getElementsByClassName('el-textarea__inner')[0];
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', true, true);
            input.value = '```yml\n- name: 网站名\n  link: 网站链接\n  avatar: 网站ico\n  descr: 网站描述\n  siteshot: 网站首页图(若分类是“常规”该选项可忽略，不会用到)的 **URL**\n  color: 你想要的颜色的16进制格式 ，例如 `#123456`，若不选则填 `vip`\n  tag: 你想要的标签内容，可选\n```';
            input.dispatchEvent(evt);
            input.focus();
            input.setSelectionRange(-1, -1);
        } else {
            twikooSubmit.style.opacity = "0";
            twikooSubmit.style.height = "0";
            twikooSubmit.style.overflow = "hidden";
        }
    }
</script>

<style>
.tk-comments > .tk-submit {
  opacity: 0;
  height: 0;
  transition: opacity 0.5s, height 0.5s;
  overflow: hidden;
}
</style>