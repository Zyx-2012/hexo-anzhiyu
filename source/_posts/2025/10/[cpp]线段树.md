---
title: 线段树
cover: '/img/blog/[cpp]线段树/cover.webp'
tags:
  - c++
  - 线段树
  - 编程
  - NOI
  - 笔记
categories:
  - 算法
abbrlink: 8893d943
date: 2025-10-03 10:35:21
updated: 2025-10-12 11:44:23
---

### 线段树简介

## 什么是线段树

线段树是一种数据结构，通常用于处理区间范围内的查询和更新问题。它的主要优点是能够以对数时间复杂度处理区间查询与区间更新。我们通常使用结构体（或数组）来模拟线段树的数据结构。

### 线段树能干什么

线段树主要有两个基本操作：

1. **区间查询**（例如：区间求和、区间最值、区间最大公约数等）: 时间复杂度为 `O(log n)`。
2. **区间更新**（例如：区间加法、区间赋值等）: 时间复杂度为 `O(log n)`。

线段树比树状数组更强大，因为它支持**区间更新**，而树状数组仅支持单点更新或单点查询。

---

### 洛谷P3372【线段树1】例题讲解

题目描述：

* 给定一个长度为 `n` 的数组 `a[]`，支持两种操作：

  1. **区间加法**：对区间 `[l, r]` 中的每个元素增加一个常数 `k`。
  2. **区间求和**：查询区间 `[l, r]` 中所有元素的和。

#### 线段树解决方案

我们可以使用**线段树**来解决此问题，其中：

* **每个节点**存储一个区间的和（例如：区间 `[l, r]` 的和）。
* **每个节点**还存储一个懒标记（`add`），用于记录该区间需要被加上的常数值。

### 关键操作

1. **懒标记（Lazy Propagation）**：为了优化区间更新操作，使用懒标记推迟更新。每次更新操作并不会立刻更新整棵树，而是标记某些节点需要更新，等到需要查询或更新时，再通过**懒更新**的方式进行推送。

2. **区间更新与查询**：

   * **区间加法**：当操作范围完全包含当前节点时，将该区间的每个元素加上 `k`，并将其标记为需要更新的节点。
   * **区间查询**：当查询某区间时，使用懒标记推迟的更新操作，确保查询的是最新的值。

#### 代码实现

{% tabs code %}

<!-- tab 代码 -->

以下是解决该问题的线段树代码，采用了懒标记来实现区间更新：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define int long long
const int N = 1e5 + 5;

int a[N];
struct Node {
    int l, r;
    long long sum;
    long long add;
} tree[N << 2];

// 向上更新节点
void pushup(int pos) {
    tree[pos].sum = tree[pos << 1].sum + tree[pos << 1 | 1].sum;
}

// 向下传播懒标记
void pushdown(int pos) {
    if (tree[pos].add) {
        int ll = pos << 1, rr = pos << 1 | 1;
        tree[ll].sum += tree[pos].add * (tree[ll].r - tree[ll].l + 1);
        tree[ll].add += tree[pos].add;
        tree[rr].sum += tree[pos].add * (tree[rr].r - tree[rr].l + 1);
        tree[rr].add += tree[pos].add;
        tree[pos].add = 0;
    }
}

// 建树函数
void build(int pos, int l, int r) {
    tree[pos].l = l;
    tree[pos].r = r;
    tree[pos].add = 0;
    if (l == r) {
        tree[pos].sum = a[l];
        return;
    }
    int mid = (l + r) >> 1;
    build(pos << 1, l, mid);
    build(pos << 1 | 1, mid + 1, r);
    pushup(pos);
}

// 区间加法
void addd(int pos, int l, int r, int k) {
    if (l <= tree[pos].l && tree[pos].r <= r) {
        tree[pos].sum += (long long)k * (tree[pos].r - tree[pos].l + 1);
        tree[pos].add += k;
        return;
    }
    pushdown(pos);
    int mid = (tree[pos].l + tree[pos].r) >> 1;
    if (l <= mid) addd(pos << 1, l, r, k);
    if (r > mid) addd(pos << 1 | 1, l, r, k);
    pushup(pos);
}

// 区间求和
long long sum(int pos, int l, int r) {
    if (l <= tree[pos].l && tree[pos].r <= r) {
        return tree[pos].sum;
    }
    pushdown(pos);
    int mid = (tree[pos].l + tree[pos].r) >> 1;
    long long s = 0;
    if (l <= mid) s += sum(pos << 1, l, r);
    if (r > mid) s += sum(pos << 1 | 1, l, r);
    return s;
}

signed main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    build(1, 1, n);
    while (m--) {
        int x;
        cin >> x;
        if (x == 1) {
            int lll, rrr, k;
            cin >> lll >> rrr >> k;
            addd(1, lll, rrr, k);
        } else if (x == 2) {
            int lll, rrr;
            cin >> lll >> rrr;
            cout << sum(1, lll, rrr) << endl;
        }
    }
    return 0;
}
```

<!-- endtab -->

<!-- tab 解析 -->

### 代码讲解：

1. **建树函数** `build`：通过递归将数组分段，并构建线段树。
2. **区间加法函数** `addd`：在区间 `[l, r]` 上加上一个常数 `k`，并进行懒标记。
3. **区间求和函数** `sum`：查询区间 `[l, r]` 的和，并通过懒标记推迟更新。

### 操作解析：

1. **区间加法**：对于区间 `[l, r]`，如果当前节点完全覆盖该区间，就直接在该节点上加上常数 `k`，并标记为懒更新。否则，向下传播，更新子树。
2. **区间求和**：对于查询区间 `[l, r]`，如果当前节点完全在查询范围内，直接返回该节点的值；否则，向下传播懒标记，查询左右子树的结果。

<!-- endtab -->

{% endtabs %}

---

### 总结

线段树通过**懒标记**优化了区间更新操作，使得在处理大量区间更新和查询时依然能保持高效性。通过这个例题，我们可以看到线段树不仅能快速处理区间求和，还能灵活应对动态区间更新的需求。
