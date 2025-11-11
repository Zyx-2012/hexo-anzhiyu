---
title: ST表
cover: '/img/blog/[cpp]ST表/cover.webp'
tags:
  - c++
  - ST表
  - 编程
  - NOI
  - 笔记
categories:
  - 算法
abbrlink: 351efd99
date: 2025-10-01 13:02:34
updated: 2025-10-22 22:02:04
---

# 关于ST表

## 用于

ST表（即稀疏表，以下称ST表）可以用于频繁求区间最值的问题，普通算法每次请求复杂度为 ``O(n)``，ST表预处理复杂度为 ``O(n+m)`` ，每次请求复杂度为 ``O(1)`` 

## 原理

ST表是将一个数组二分成很多小段，每一段求一个最值。若给出两个端点（ ``l,r`` ），一定可以给出两个ST表中预处理过的区间，使得这两个区间覆盖了 ``l,r`` 间所有的端点，此时将这两个预处理过的区间的最值取一个最值，即可求得 ``l,r`` 间的最值

# 练习&实战

## 题目

[模板题](https://www.luogu.com.cn/problem/P1816)

{% folding 题目描述 %}

> # P1816 忠诚
>
> ## 题目描述
>
> 老管家是一个聪明能干的人。他为财主工作了整整 $10$ 年。财主为了让自已账目更加清楚，要求管家每天记  $k$ 次账。由于管家聪明能干，因而管家总是让财主十分满意。
>
> 但是由于一些人的挑拨，财主还是对管家产生了怀疑。于是他决定用一种特别的方法来判断管家的忠诚。他把每次的账目按 $1, 2, 3, \ldots$ 编号，然后不定时地问管家这样的问题：在 $a$ 到 $b$ 号账中最少的一笔是多少？
>
> 为了让管家没时间作假，他总是一次问多个问题。
>
> ## 输入格式
>
> 第一行输入两个数 $m, n$，表示有 $m$ 笔账和 $n$ 个问题。  
> 第二行输入 $m$ 个数，分别表示账目的钱数。  
> 接下来 $n$ 行分别输入 $n$ 个问题，每行 $2$ 个数字，分别表示开始的账目编号 $a$ 和结束的账目编号 $b$。
>
> ## 输出格式
>
> 第一行输出每个问题的答案，每个答案中间以一个空格分隔。
>
> ## 输入输出样例 #1
>
> ### 输入 #1
>
> ```
> 10 3
> 1 2 3 4 5 6 7 8 9 10
> 2 7
> 3 9
> 1 10
> ```
>
> ### 输出 #1
>
> ```
> 2 3 1
> ```
>
> ## 说明/提示
>
> 对于 $100\%$ 的数据，$1 \leq m \leq 10^5$，$1 \leq n \leq 10^5$。

{% endfolding %}

## 代码思路

首先，这是一个 ``RMQ`` 题，所以要用到ST表。既然要用到ST表，那就要快读快写

{% del 拿走不谢 %}

{% tabs fastio %}
<!-- tab 代码 -->
```cpp
/* ------------------------------- FastIO ------------------------------- */
char ibuf[1<<20], *p1=ibuf, *p2=ibuf;
#define gc() (p1==p2 && (p2=(p1=ibuf)+fread(ibuf,1,1<<20,stdin), p1==p2) ? EOF : *p1++)

inline int read(){
    int x=0,f=1; char ch=gc();
    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }
    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }
    return x*f;
}

inline ll readLL(){
    ll x=0,f=1; char ch=gc();
    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }
    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }
    return x*f;
}

char obuf[1<<20]; int op=0;
inline void flushOut(){ fwrite(obuf,1,op,stdout); op=0; }
struct Flusher{ ~Flusher(){ flushOut(); } }flusher;

inline void print(int x, char endch='\n'){
    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }
    if(x<0){ obuf[op++]='-'; x=-x; }
    char s[12]; int n=0;
    while(x){ s[n++]=x%10+'0'; x/=10; }
    while(n--) obuf[op++]=s[n];
    obuf[op++]=endch;
    if(op>(1<<20)-50) flushOut();
}

inline void printLL(ll x, char endch='\n'){
    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }
    if(x<0){ obuf[op++]='-'; x=-x; }
    char s[25]; int n=0;
    while(x){ s[n++]=x%10+'0'; x/=10; }
    while(n--) obuf[op++]=s[n];
    obuf[op++]=endch;
    if(op>(1<<20)-50) flushOut();
}
/* ----------------------------- FastIO End ----------------------------- */
```
<!-- endtab -->

<!-- tab vscode代码片段 -->
```json
{
	"生成 cpp 初始状态": {
		"scope": "cpp",
		"prefix": "fastio",
		"body": [
			"/* ------------------------------- FastIO ------------------------------- */",
			"char ibuf[1<<20], *p1=ibuf, *p2=ibuf;",
			"#define gc() (p1==p2 && (p2=(p1=ibuf)+fread(ibuf,1,1<<20,stdin), p1==p2) ? EOF : *p1++)",
			"",
			"inline int readInt(){",
			"    int x=0,f=1; char ch=gc();",
			"    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }",
			"    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }",
			"    return x*f;",
			"}",
			"",
			"inline ll readLL(){",
			"    ll x=0,f=1; char ch=gc();",
			"    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }",
			"    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }",
			"    return x*f;",
			"}",
			"",
			"char obuf[1<<20]; int op=0;",
			"inline void flushOut(){ fwrite(obuf,1,op,stdout); op=0; }",
			"struct Flusher{ ~Flusher(){ flushOut(); } }flusher;",
			"",
			"inline void printInt(int x, char endch='\\n'){",
			"    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }",
			"    if(x<0){ obuf[op++]='-'; x=-x; }",
			"    char s[12]; int n=0;",
			"    while(x){ s[n++]=x%10+'0'; x/=10; }",
			"    while(n--) obuf[op++]=s[n];",
			"    obuf[op++]=endch;",
			"    if(op>(1<<20)-50) flushOut();",
			"}",
			"",
			"inline void printLL(ll x, char endch='\\n'){",
			"    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }",
			"    if(x<0){ obuf[op++]='-'; x=-x; }",
			"    char s[25]; int n=0;",
			"    while(x){ s[n++]=x%10+'0'; x/=10; }",
			"    while(n--) obuf[op++]=s[n];",
			"    obuf[op++]=endch;",
			"    if(op>(1<<20)-50) flushOut();",
			"}",
			"/* ----------------------------- FastIO End ----------------------------- */"
		],
		"description": "生成 cpp 快读快写"
	}
}
```
<!-- endtab -->
{% endtabs %}

然后，我们要初始化一下：

```cpp
const int N = 1e5+5;//开大点
const int Log = 20;//{2^20}>(int)(1e5+5)，够了

int a[N];//输入数组
int st[N][Log];//st[i][j] 表示区间 [i, i+2^j-1] 的最大值
int log_2[N];//预处理log
```

输入及初始ST表

```cpp
for (int i = 1; i <= n; i++) {
    a[i] = read();
    st[i][0] = a[i];
}
```

预处理 ``log_2`` 

```cpp
log_2[1] = 0;
for (int i = 2; i <= n; i++) {
    log_2[i] = log_2[i / 2] + 1;
}
```

构建ST表

```cpp
for (int j = 1; j < Log; j++) {
    for (int i = 1; i + (1 << j) - 1 <= n; i++) {
        st[i][j] = max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
    }
}
```

查询

```cpp
while (m--) {
    int l, r;
    l = read();
    r = read();
    int k = log_2[r - l + 1];
    printf("%d\n", max(st[l][k], st[r - (1 << k) + 1][k]));
}
```

结尾

```cpp
return 0;
```

## 代码完整版

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

/* ------------------------------- FastIO ------------------------------- */
char ibuf[1<<20], *p1=ibuf, *p2=ibuf;
#define gc() (p1==p2 && (p2=(p1=ibuf)+fread(ibuf,1,1<<20,stdin), p1==p2) ? EOF : *p1++)

inline int read(){
    int x=0,f=1; char ch=gc();
    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }
    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }
    return x*f;
}

inline ll readLL(){
    ll x=0,f=1; char ch=gc();
    while(ch<'0'||ch>'9'){ if(ch=='-') f=-1; ch=gc(); }
    while(ch>='0'&&ch<='9'){ x=x*10+(ch^48); ch=gc(); }
    return x*f;
}

char obuf[1<<20]; int op=0;
inline void flushOut(){ fwrite(obuf,1,op,stdout); op=0; }
struct Flusher{ ~Flusher(){ flushOut(); } }flusher;

inline void print(int x, char endch='\n'){
    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }
    if(x<0){ obuf[op++]='-'; x=-x; }
    char s[12]; int n=0;
    while(x){ s[n++]=x%10+'0'; x/=10; }
    while(n--) obuf[op++]=s[n];
    obuf[op++]=endch;
    if(op>(1<<20)-50) flushOut();
}

inline void printLL(ll x, char endch='\n'){
    if(x==0){ obuf[op++]='0'; obuf[op++]=endch; if(op>(1<<20)-50) flushOut(); return; }
    if(x<0){ obuf[op++]='-'; x=-x; }
    char s[25]; int n=0;
    while(x){ s[n++]=x%10+'0'; x/=10; }
    while(n--) obuf[op++]=s[n];
    obuf[op++]=endch;
    if(op>(1<<20)-50) flushOut();
}
/* ----------------------------- FastIO End ----------------------------- */

const int Log = 20;
const int N = 1e5 + 5;

int a[N];
int st[N][Log];
int log_2[N];

int main() {
    // https://www.luogu.com.cn/problem/P1816
    /*****************************************************

        该代码出自 折腾日记 @ Zyx_2012 © 2025 知识著作权
        转载请注明出处 https://blog.zyx-2012.cn/posts/p351efd99/
        侵权者必究

        人话：代码里要有关于出处的注释，别人看到这个注释能找到我就行

    *****************************************************/
    int n, q;
    n = read();
    q = read();
    for (int i = 1; i <= n; i++) {
        a[i] = read();
        st[i][0] = a[i];
    }

    log_2[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_2[i] = log_2[i / 2] + 1;
    }

    for (int j = 1; j < Log; j++) {
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }

    while (q--) {
        int l, r;
        l = read();
        r = read();
        int k = log_2[r - l + 1];
        print(min(st[l][k], st[r - (1 << k) + 1][k]),' ');
    }
    return 0;
}
```