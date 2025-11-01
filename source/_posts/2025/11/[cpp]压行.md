---
title: 压行
cover: '/img/blog/[cpp]压行/cover.webp'
tags:
  - cpp
  - 压行
  - 笔记
  - 总结
categories:
  - 教程
date: 2025-11-01 17:10:23
---

# 压行

压行，指的是将多行代码压成一行并省略某些符号，多数情况下用于简化代码。

例如：

```cpp
for(int i=0;i<n;i++){
    cin>>a[i];
}
```

可以压为一行

```cpp
for(int i=0;i<n;i++)cin>>a[i];
```

# 压行的一些操作

## 循环

for/while循环在循环内只有一行或多行简短代码（如 `l++` 等）且 **没有（或只有单个）“break”,"return"** 这种关键字时可以压行

```cpp
for(int i=0;i<n;i++)cin>>a[i],i++,i--;
while(q--)// 循环内代码
```

## 条件判断

if-else在条件执行内只有一行或多行简短代码（如 `l++` 等）且 **没有（或只有单个）“break”,"return"** 这种关键字时可以压行

```cpp
if(n%2==0)cout<<"1";
else cout<<"0";
```

## 函数

```cpp
bool cmp(int a, int b){return a>b;}// 别忘了分号
```

## 反回合并

当某些要求“**没有（或只有单个）"return"** ”才可以压行时，如果你只有一个输出（或一些有返回值的运行函数）时且执行后要return，可以写作

```cpp
return printf("hello world");
```

完美的压行(￣▽￣)"

# 尾

若您的项目需长期/多人维护，尽量不要压行，以免为他人或以后的你带来困扰。
规范代码，你我同行！