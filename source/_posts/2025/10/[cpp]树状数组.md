---
title: 树状数组
cover: '/img/blog/[cpp]树状数组/cover.webp'
tags:
  - c++
  - 树状数组
  - 编程
  - NOI
  - 笔记
categories:
  - 算法
abbrlink: 59a0de58
date: 2025-10-02 12:32:18
updated: 2025-10-12 11:44:23
---

# 树状数组介绍

## 是什么

一种统计数据的方式（结构为数组）

## 用处

大数据的 ``点增 & 前缀和``

# 上手实操

## 基本代码

{% tabs code %}

<!-- tab 初始化 -->

```cpp
// ------------初始化------------
const int N;// 范围
int n;
ll tr[N];
```

<!-- endtab -->

<!-- tab lowbit -->

```cpp
// -----------lowbit------------
inline int lowbit(int x){return x & -x;}

// 求x在二进制下是1的位数的最低位
/**
 *  x = 11001000 , lowbit(x) = 4
 *      ~~~~^~~~
 *
 *  x = 10010010 , lowbit(x) = 2
 *      ~~~~~~^~
 *
 */
```

<!-- endtab -->

<!-- tab 点增 -->

```cpp
// ------------ 点增 ------------
void add(int x,int k){// 第x个数加上k
    for(int i=1;i<=x;i+=lowbit(i)){
        tr[i]+=k;
    }
}
```

<!-- endtab -->

<!-- tab 前缀和 -->

```cpp
//------------ 前缀和 ------------
ll sum(int x){// 第1个数到第x个数的和
    ll s=0;
    for(int i=x;i>0;i-=lowbit(i)){
        s+=tr[i];
    }
    return s;
}
```

<!-- endtab -->

<!-- tab 全部 -->

```cpp
const int N;// 范围
int n;
ll tr[N];

// -----------lowbit------------
inline int lowbit(int x){return x & -x;}

// 求x在二进制下是1的位数的最低位
/**
 *  x = 11001000 , lowbit(x) = 4
 *      ~~~~^~~~
 *
 *  x = 10010010 , lowbit(x) = 2
 *      ~~~~~~^~
 *
 */

// ------------ 点增 ------------
void add(int x,int k){// 第x个数加上k
    for(int i=1;i<=x;i+=lowbit(i)){
        tr[i]+=k;
    }
}

//------------ 前缀和 ------------
ll sum(int x){// 第1个数到第x个数的和
    ll s=0;
    for(int i=x;i>0;i-=lowbit(i)){
        s+=tr[i];
    }
    return s;
}
```

<!-- endtab -->

{% endtabs %}

## 模板题

[P3374 树状数组1](https://www.luogu.com.cn/problem/P3374)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int N = 5e5 + 5;
int n, m;
int a[N];
ll tr[N];

inline int lowbit(int x){return x & -x;}

void add(int x, int k) {
    for (int i = x;i <= n;i += lowbit(i))tr[i] += k;
}

ll sum(int x) {
    ll res = 0;
    for (int i = x;i > 0;i -= lowbit(i)) {
        res += tr[i];
    }
    return res;
}

int main() {
    // https://www.luogu.com.cn/problem/P3374
    cin >> n >> m;
    for (int i = 1;i <= n;i++) {
        cin >> a[i];
        add(i, a[i]);
    }

    for (int i = 1;i <= m;i++) {
        int q, x, y;
        cin >> q >> x >> y;
        if (q == 1) {
            add(x, y);
        }
        else {
            cout << sum(y) - sum(x - 1) << endl;
        }
    }
    return 0;
}
```

很简单 ({% del 毕竟是模板题 %}) ，把上面的基本代码背下来就行了（点增，前缀和，lowbit）。

接下来，你可以试试 [这道题(模板2)](https://www.luogu.com.cn/problem/P3368) 和 [这道题(逆序对)](https://www.luogu.com.cn/problem/P1908)

逆序对答案：

{% folding 只有不爱动脑的人才会打开我QvQ %}

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long

const int N = 5e5 + 5;
int n;
int a[N], b[N];
int tr[N];

inline int lowbit(int x) { return x & -x; }

void add(int x, int k, int m) {
    for (int i = x;i <= m;i += lowbit(i))tr[i] += k;
}

ll sum(int x) {
    ll res = 0;
    for (int i = x;i > 0;i -= lowbit(i)) {
        res += tr[i];
    }
    return res;
}

int main() {
    // https://www.luogu.com.cn/problem/P1908
    cin >> n;
    for (int i = 1;i <= n;i++) {
        cin >> a[i];
        b[i] = a[i];
    }
    sort(b + 1, b + n + 1);
    int m = unique(b + 1, b + n + 1) - (b + 1);
    for (int i = 1;i <= n;i++) {// 离散化，不然会超
        a[i] = lower_bound(b + 1, b + m + 1, a[i]) - b;
    }
    ll ans = 0;
    for (int i = 1;i <= n;i++) {
        ans += (i - 1) - sum(a[i]);
        add(a[i], 1, m);
    }
    cout << ans;
    return 0;
}
```

{% endfolding %}

然后再去看 [P4378](https://www.luogu.com.cn/problem/P4378) ({% del 这道题其实模拟就能过，用树状数组还不知道要多麻烦。就当放松心情了 %})

{% folding 答案 %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // https://www.luogu.com.cn/problem/P4378
    int n;
    cin >> n;
    vector<pair<int, int>> v(n);
    for (int i = 0;i < n;i++) {
        int x;
        cin >> x;
        v[i] = { x,i };
    }
    sort(v.begin(), v.end());

        int maxx = 0;
    for (int i = 0;i < n;i++) {
        maxx = max(maxx, v[i].second - i);
    }
    cout << maxx + 1 << '\n';
}
```

{% endfolding %}

# 尾

希望本篇文章对你有帮助 QWQ ，有任何问题都可以在评论区提出哦~ 