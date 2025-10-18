---
title: BFS广度优先搜索
cover: '/img/blog/[cpp]BFS广搜/cover.webp'
tags:
  - c++
  - BFS
  - 广度优先搜索
  - 编程
  - NOI
  - 笔记
categories:
  - 算法
abbrlink: e98a5348
date: 2025-10-18 10:49:32
---

# 关于BFS

BFS，广搜，是一种寻找最短路、连通块的常用算法。我通常用队列实现

# 框架

连通块为例

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int dx[8] = {-1,-1,-1,0,0,1,1,1};// 方向，需要遍历的邻居
const int dy[8] = {-1,0,1,-1,1,-1,0,1};

int main() {
    // 
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n,m;
    cin>>n>>m;
    vector<string>g(n);// 表
    for(int i=0;i<n;i++)cin>>g[i];

    int ans = 0;
    queue<int>q;// 队列

    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(g[i][j]!='W')continue;// 是否达到过，通常用vis[i][j]==1来判断
            ans++;// 连通块
            g[i][j] = '.';// 标记为达到过，通常用vis[i][j]=1
            q.push(i*m+j);
            while(!q.empty()){
                int pos = q.front();
                q.pop();// 出队
                int x = pos / m;
                int y = pos % m;
                for(int d=0;d<8;d++){// 依次遍历每个方向
                    int nx=x+dx[d];// 邻居的x
                    int ny=y+dy[d];// 邻居的y
                    if(nx>=0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 'W'){// 判断该节点的每个需遍历邻居是否符合要求（存在且未达到）
                        g[nx][ny] = '.';// 标记为达到过，通常用vis[nx][ny]=1
                        q.push(nx*m+ny);// 入队
                    }
                }
            }
        }
    }
    cout<<ans;
    return 0;
}
```

大多数题目只需要在它的基础上加以改进即可

# 题目

[连通块](http://180.76.190.156/contest/402/problem/1)

{% del ps:有兴趣的可以去洛谷找找，我懒得找了 %}

## 题目原文

>#### 题目描述
>>题意：有一块N×M的土地，雨后积起了水，有水标记为‘W’，干燥为‘.’。八连通的积水被认为是连接在一起的。请求出院子里共有多少水洼？

>#### 输入格式
>>第一行为N,M(1≤N,M≤110)。
>>下面为N*M的土地示意图。

>#### 输出格式
>>一行，共有的水洼数。

>#### 样例
>##### 输入 1
>>10 12
>>W........WW.
>>.WWW.....WWW
>>....WW...WW.
>>.........WW.
>>.........W..
>>..W......W..
>>.W.W.....WW.
>>W.W.W.....W.
>>.W.W......W.
>>..W.......W.
>##### 输出 1
>>3
>#### 数据范围与提示
>>无

代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int dx[8] = {-1,-1,-1,0,0,1,1,1};
const int dy[8] = {-1,0,1,-1,1,-1,0,1};

int main() {
    // 
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n,m;
    cin>>n>>m;
    vector<string>g(n);
    for(int i=0;i<n;i++)cin>>g[i];

    int ans = 0;
    queue<int>q;

    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(g[i][j]!='W')continue;
            ans++;
            g[i][j] = '.';
            q.push(i*m+j);
            while(!q.empty()){
                int pos = q.front();
                q.pop();
                int x = pos / m;
                int y = pos % m;
                for(int d=0;d<8;d++){
                    int nx=x+dx[d];
                    int ny=y+dy[d];
                    if(nx>=0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 'W'){
                        g[nx][ny] = '.';
                        q.push(nx*m+ny);
                    }
                }
            }
        }
    }
    cout<<ans;
    return 0;
}
```

ps:最近有点累，加上生病了，博客更的比较少，见谅