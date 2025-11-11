---
title: 图论
cover: '/img/blog/[cpp]图论/cover.webp'
katex: true
tags:
  - cpp
  - 图论
  - NOI
  - Prim算法
  - Dijkstra算法
  - Kahn算法
  - Tarjan算法
categories:
  - 教程
abbrlink: 10f14ed7
date: 2025-11-09 12:41:45
updated: 2025-11-09 13:33:21
---

# 首

图论，是OI中一个非常重要的分类，涵盖多种算法、题型

包括但不限于

{% folding cyan open, %}
图的存储
DFS(图论)
BFS(图论)
树上问题
有向无环图拓扑排序
最短路问题
生成树问题
斯坦纳树
拆点
连通性相关
环计数问题
最小环
2-SAT
欧拉图
哈密顿图
二分图
平面图
弦图
图的着色
网络流
图的匹配
Prüfer 序列
矩阵树定理
LGV 引理
最大团搜索算法
支配树
......
{% endfolding %}

但是，这篇文章提到的，也是CSP-S复赛中涵盖的考点，只有

- 最小生成树
- 最短路
- 拓扑排序
- 最近公共祖先

其中，最短路问题可以通过最小生成树改写，就不过多赘述了。

# 最小生成树

{% tip info %}
我们定义无向连通图的 最小生成树（Minimum Spanning Tree，MST）为边权和最小的生成树。
注意：只有连通图才有生成树，而对于非连通图，只存在生成森林。
{% endtip %}



我们这里主要说 [Prim 算法](https://oi-wiki.org/graph/mst/#prim-%E7%AE%97%E6%B3%95)

## Prim算法

Prim算法的基本思想是从一个结点开始，不断加点（而不是 [Kruskal 算法](https://oi-wiki.org/graph/mst/#kruskal-%E7%AE%97%E6%B3%95)的加边）。

### 具体做法

{% folding 算法步骤及总结 %}

初始化

输入图的顶点数 n 和边数 m。

使用 邻接表 adj 存储图的边，adj[i] 存储从顶点 i 出发的所有边（以对 (v, w) 形式存储，其中 v 是邻接点，w 是边的权重）。

2. 数据结构定义

d 数组：用来存储从起点到每个节点的最短距离，初始化为 INF（表示不可达）。

vis 数组：标记每个节点是否已经访问过，防止重复访问。

pq（优先队列）：一个最小堆，用来选择当前距离最小的节点。

res：最小生成树的总权重。

cnt：最小生成树包含的边数。

3. 输入边信息

使用 cin 输入每一条边的信息：端点 u 和 v，边的权值 w。

由于是无向图，我们将边的两端都存储在邻接表中：adj[u].push_back({v, w}) 和 adj[v].push_back({u, w})。

4. Dijkstra 风格的 Prim 算法过程

起点设为节点 1，将其最短距离 d[1] 初始化为 0，并将其加入优先队列 pq。

每次从队列中取出一个距离最小的节点 u，并进行以下操作：

如果节点 u 已经被访问过，跳过。

标记 u 为已访问。

将 u 的最短距离加入最小生成树的总权值 res，并增加边数 cnt。

遍历所有与 u 相连的边 (u, v)，如果节点 v 没有被访问且通过 u 到 v 的距离更短，则更新 d[v]，并将新更新的距离 w 和节点 v 推入队列 pq。

5. 判断图的连通性

如果最小生成树包含的边数 cnt 等于 n - 1，说明图是连通的，输出最小生成树的总权值 res。

否则，图不连通，输出 "orz"。

6. 代码总结

Prim 算法通过每次选择当前距离最小的节点，不断更新周围节点的最短路径，最终生成一个最小生成树。由于使用了优先队列，时间复杂度为 O((n + m) log n)，适用于稠密图和稀疏图。

{% endfolding %}

### 题目及分析

[最小生成树模板题](https://www.luogu.com.cn/problem/P3366)

也是一道非常简单的题目

># P3366 【模板】最小生成树
>
>## 题目描述
>
>如题，给出一个无向图，求出最小生成树，如果该图不连通，则输出 `orz`。
>
>## 输入格式
>
>第一行包含两个整数 $N,M$，表示该图共有 $N$ 个结点和 $M$ 条无向边。
>
>接下来 $M$ 行每行包含三个整数 $X_i,Y_i,Z_i$，表示有一条长度为 $Z_i$ 的无向边连接结点 $X_i,Y_i$。
>
>## 输出格式
>
>如果该图连通，则输出一个整数表示最小生成树的各边的长度之和。如果该图不连通则输出 `orz`。
>
>## 输入输出样例 #1
>
>### 输入 #1
>
>```
4 5
1 2 2
1 3 2
1 4 3
2 3 4
3 4 3
>```
>
>### 输出 #1
>
>```
7
>```
>
>## 说明/提示
>
>数据规模：
>
>对于 $20%$ 的数据，$N\le 5$，$M\le 20$。
>
>对于 $40%$ 的数据，$N\le 50$，$M\le 2500$。
>
>对于 $70%$ 的数据，$N\le 500$，$M\le 10^4$。
>
>对于 $100%$ 的数据：$1\le N\le 5000$，$1\le M\le 2\times 10^5$，$1\le Z_i \le 10^4$，$1\le X_i,Y_i\le N$。
>
>
>样例解释：
>
>![](https://cdn.luogu.com.cn/upload/pic/2259.png) 
>
>所以最小生成树的总边权为 $2+2+3=7$。

### 思路及解法

模板题，思路刚才讲过了，直接看代码

```cpp
#include <bits/stdc++.h>
#define ll long long
using namespace std;

const int INF = INT_MAX; // 定义 INF 为最大整数，用于初始化最短距离，代表不可达的距离

int main() {
    int n, m;  // n: 顶点数，m: 边数
    cin >> n >> m;  // 输入图的顶点数 n 和边数 m

    // 使用邻接表存储图，adj[i] 存储从顶点 i 出发的所有边 (v, w)，其中 v 是邻接点，w 是边的权重
    vector<vector<pair<int, int>>> adj(n + 1);

    // 输入每条边的信息
    for (int i = 0; i < m; i++) {
        int u, v, w; // u 和 v 为边的两个端点，w 为边的权值
        cin >> u >> v >> w;
        adj[u].push_back({ v, w });  // 从 u 到 v 的边，权值为 w
        adj[v].push_back({ u, w });  // 因为是无向图，从 v 到 u 的边也有，权值为 w
    }

    // d 数组存储每个顶点的最短距离，初始化为 INF（代表不可达）
    vector<int> d(n + 1, INF);
    // vis 数组标记每个顶点是否已经访问过，防止重复访问
    vector<bool> vis(n + 1, 0);

    d[1] = 0;  // 起点 1 到自身的距离为 0

    // 优先队列 pq，存储待处理的顶点和其对应的最短距离
    // 使用 greater<pair<int, int>> 保证队列是按照距离从小到大排序
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({ 0, 1 });  // 将起点 1 和距离 0 推入队列

    int res = 0;  // 最小生成树的总权值
    int cnt = 0;  // 最小生成树包含的边数

    // Dijkstra 算法的主体部分，使用优先队列来寻找最短路径
    while (!pq.empty()) {
        // 取出队列中距离最小的顶点
        auto s_d = pq.top().first;  // s_d 是当前顶点的最短距离
        auto u = pq.top().second;  // u 是当前顶点的编号
        pq.pop();  // 弹出队列中的顶点
        if (vis[u]) continue;// 如果顶点 u 已经被访问过，跳过它
        vis[u] = 1;// 标记顶点 u 为已访问
        res += s_d;// 将当前顶点的最短距离 s_d 加到最小生成树的总权值 res 上
        cnt++;// 增加边数
        // 遍历当前顶点 u 的所有邻接边
        for (auto ed : adj[u]) {
            int v = ed.first;  // v 是邻接点
            int w = ed.second; // w 是边 u -> v 的权值
            // 如果 v 没有被访问过，并且通过 u 到 v 的距离比当前已知的距离短，更新最短距离
            if (!vis[v] && w < d[v]) {
                d[v] = w;  // 更新 v 的最短距离
                pq.push({ w, v });  // 将新的距离和顶点 v 推入队列
            }
        }
    }
    // 如果最小生成树包含的边数等于顶点数 - 1，说明图是连通的；否则，图是非连通的
    if (cnt == n - 1)cout << res;  // 输出最小生成树的总权值
    else cout << "orz";  // 如果图不连通，输出 "orz"
    return 0;
}
```

