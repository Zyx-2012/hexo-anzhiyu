/**
 * 友链状态监测脚本
 * 支持多种友链样式：anzhiyu、telescopic、flexcard
 * 支持跳转链接解析和状态缓存
 */

class SiteStatusMonitor {
    constructor() {
        this.statusCache = new Map();
        this.cacheExpiry = 30 * 60 * 1000; // 30分钟缓存
        this.checkInterval = 5 * 60 * 1000; // 5分钟检查一次
        this.statusIndicators = new Map();
        
        this.init();
    }

    init() {
        console.log('🚀 友链状态监测器启动');
        this.addStatusStyles();
        this.startMonitoring();
        this.observeNewLinks();
    }

    // 添加状态指示器样式
    addStatusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .site-status-indicator {
                position: absolute;
                bottom: 8px;
                right: 8px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid var(--anzhiyu-card-bg);
                z-index: 10;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            
            .site-status-indicator.online {
                background-color: #52c41a;
                animation: pulse-green 2s infinite;
            }
            
            .site-status-indicator.offline {
                background-color: #ff4d4f;
                animation: pulse-red 2s infinite;
            }
            
            .site-status-indicator.checking {
                background-color: #1890ff;
                animation: pulse-blue 1s infinite;
            }
            
            .site-status-indicator.unknown {
                background-color: #d9d9d9;
            }
            
            @keyframes pulse-green {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
            
            @keyframes pulse-red {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
            
            @keyframes pulse-blue {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
            
            /* 为不同样式适配 */
            .anzhiyu-flink-list .flink-list-item,
            .telescopic-site-card-group .site-card,
            .flexcard-flink-list .flink-list-card {
                position: relative;
            }
            
            /* 状态标签样式 */
            .site-status-tag {
                position: absolute;
                bottom: 4px;
                left: 4px;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: bold;
                color: white;
                z-index: 10;
                opacity: 0.9;
            }
            
            .site-status-tag.online {
                background-color: #52c41a;
            }
            
            .site-status-tag.offline {
                background-color: #ff4d4f;
            }
            
            .site-status-tag.checking {
                background-color: #1890ff;
            }
            
            .site-status-tag.unknown {
                background-color: #d9d9d9;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }

    // 解析跳转链接
    parseRedirectUrl(url) {
        try {
            // 处理 cf-href 属性
            if (url.includes('cf-href=')) {
                const cfHrefMatch = url.match(/cf-href="([^"]+)"/);
                if (cfHrefMatch) {
                    return cfHrefMatch[1];
                }
            }
            
            // 处理 /go.html?u= 格式的跳转链接
            if (url.includes('/go.html?u=')) {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const encodedUrl = urlParams.get('u');
                if (encodedUrl) {
                    try {
                        const decodedUrl = atob(encodedUrl);
                        return decodedUrl;
                    } catch (e) {
                        console.warn('Base64解码失败:', encodedUrl);
                    }
                }
            }
            
            return url;
        } catch (error) {
            console.error('解析跳转链接失败:', url, error);
            return url;
        }
    }

    // 检查URL是否有效
    isValidUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    // 获取友链元素
    getLinkElements() {
        const elements = [];
        
        // anzhiyu 样式
        document.querySelectorAll('.anzhiyu-flink-list .flink-list-item').forEach(el => {
            const link = el.querySelector('a[href]');
            if (link) {
                elements.push({
                    element: el,
                    link: link.href,
                    name: el.querySelector('.flink-item-name, .cf-friends-name')?.textContent?.trim() || '未知'
                });
            }
        });
        
        // telescopic 样式
        document.querySelectorAll('.telescopic-site-card-group .site-card').forEach(el => {
            const link = el.querySelector('a[href]');
            if (link) {
                elements.push({
                    element: el,
                    link: link.href,
                    name: el.querySelector('.title, .cf-friends-name')?.textContent?.trim() || '未知'
                });
            }
        });
        
        // flexcard 样式
        document.querySelectorAll('.flexcard-flink-list .flink-list-card').forEach(el => {
            const link = el.querySelector('a[href]');
            if (link) {
                elements.push({
                    element: el,
                    link: link.href,
                    name: el.querySelector('.flink-sitename, .cf-friends-name')?.textContent?.trim() || '未知'
                });
            }
        });
        
        return elements;
    }

    // 添加状态指示器
    addStatusIndicator(element, status = 'unknown') {
        // 移除现有的指示器
        const existingIndicator = element.querySelector('.site-status-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.className = `site-status-indicator ${status}`;
        indicator.title = this.getStatusText(status);
        
        element.appendChild(indicator);
        return indicator;
    }

    // 获取状态文本
    getStatusText(status) {
        const statusTexts = {
            'online': '在线',
            'offline': '离线',
            'checking': '检查中',
            'unknown': '状态未知'
        };
        return statusTexts[status] || '未知';
    }

    // 检查单个网站状态
    async checkSiteStatus(url, name) {
        const realUrl = this.parseRedirectUrl(url);
        
        if (!this.isValidUrl(realUrl)) {
            console.warn('无效URL:', realUrl);
            return 'unknown';
        }
        
        // 检查缓存
        const cacheKey = realUrl;
        const cached = this.statusCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.status;
        }
        
        try {
            console.log(`🔍 检查网站状态: ${name} (${realUrl})`);
            
            // 使用 fetch 检查网站状态
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
            
            const response = await fetch(realUrl, {
                method: 'HEAD',
                mode: 'no-cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            // 由于 no-cors 模式，我们无法获取响应状态
            // 但如果没有抛出异常，说明网站可达
            const status = 'online';
            
            // 更新缓存
            this.statusCache.set(cacheKey, {
                status: status,
                timestamp: Date.now()
            });
            
            console.log(`✅ ${name} 状态: ${status}`);
            return status;
            
        } catch (error) {
            console.log(`❌ ${name} 检查失败:`, error.message);
            
            const status = 'offline';
            
            // 更新缓存
            this.statusCache.set(cacheKey, {
                status: status,
                timestamp: Date.now()
            });
            
            return status;
        }
    }

    // 更新所有友链状态（并发执行）
    async updateAllStatuses() {
        const linkElements = this.getLinkElements();
        console.log(`📊 找到 ${linkElements.length} 个友链`);
        
        // 先为所有友链添加检查中状态
        linkElements.forEach(({ element }) => {
            this.addStatusIndicator(element, 'checking');
        });
        
        // 并发检查所有友链状态
        const checkPromises = linkElements.map(async ({ element, link, name }, index) => {
            // 添加延迟避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, index * 200));
            
            // 检查状态
            const status = await this.checkSiteStatus(link, name);
            
            // 更新状态指示器
            this.addStatusIndicator(element, status);
            
            // 添加状态标签
            this.addStatusTag(element, status);
            
            return { element, status };
        });
        
        // 等待所有检查完成
        const results = await Promise.all(checkPromises);
        
        console.log(`✅ 完成 ${results.length} 个友链状态检查`);
        
        // 统计结果
        const stats = this.getStatusStats();
        console.log('📈 状态统计:', stats);
    }

    // 添加状态标签
    addStatusTag(element, status) {
        // 移除现有的状态标签
        const existingTag = element.querySelector('.site-status-tag');
        if (existingTag) {
            existingTag.remove();
        }
        
        const tag = document.createElement('div');
        tag.className = `site-status-tag ${status}`;
        tag.textContent = this.getStatusText(status);
        
        element.appendChild(tag);
    }

    // 开始监测
    startMonitoring() {
        // 初始检查
        this.updateAllStatuses();
        
        // 定期检查
        setInterval(() => {
            this.updateAllStatuses();
        }, this.checkInterval);
    }

    // 监听新添加的友链
    observeNewLinks() {
        const observer = new MutationObserver((mutations) => {
            let hasNewLinks = false;
            
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 检查是否包含友链元素
                        if (node.classList?.contains('flink-list-item') || 
                            node.classList?.contains('site-card') || 
                            node.classList?.contains('flink-list-card') ||
                            node.querySelector?.('.flink-list-item, .site-card, .flink-list-card')) {
                            hasNewLinks = true;
                        }
                    }
                });
            });
            
            if (hasNewLinks) {
                console.log('🆕 检测到新友链，更新状态');
                setTimeout(() => this.updateAllStatuses(), 1000);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 手动刷新状态
    refreshStatus() {
        console.log('🔄 手动刷新友链状态');
        this.statusCache.clear();
        this.updateAllStatuses();
    }

    // 获取状态统计
    getStatusStats() {
        const linkElements = this.getLinkElements();
        const stats = {
            total: linkElements.length,
            online: 0,
            offline: 0,
            unknown: 0,
            checking: 0
        };
        
        linkElements.forEach(({ element }) => {
            const indicator = element.querySelector('.site-status-indicator');
            if (indicator) {
                const status = indicator.className.split(' ')[1];
                stats[status] = (stats[status] || 0) + 1;
            }
        });
        
        return stats;
    }
}

// 初始化状态监测器
let siteStatusMonitor;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    siteStatusMonitor = new SiteStatusMonitor();
});

// PJAX 页面切换后重新初始化
document.addEventListener('pjax:complete', () => {
    if (siteStatusMonitor) {
        siteStatusMonitor.refreshStatus();
    } else {
        siteStatusMonitor = new SiteStatusMonitor();
    }
});

// 暴露到全局作用域，方便调试
window.siteStatusMonitor = siteStatusMonitor;

// 添加控制台命令
console.log(`
🎯 友链状态监测器已加载
可用命令:
- siteStatusMonitor.refreshStatus() - 手动刷新状态
- siteStatusMonitor.getStatusStats() - 获取状态统计
- siteStatusMonitor.statusCache - 查看缓存
`);
