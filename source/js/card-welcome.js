window.IP_CONFIG = {
    API_KEY: '',
    BLOG_LOCATION: {
        lng: 116.487767,
        lat: 39.756987
    },
    CACHE_DURATION: 1000 * 60 * 10,
    HOME_PAGE_ONLY: true,
};

const insertAnnouncementComponent = () => {
    const announcementCards = document.querySelectorAll('.card-widget.card-announcement');
    if (!announcementCards.length) return;

    if (IP_CONFIG.HOME_PAGE_ONLY && !isHomePage()) {
        announcementCards.forEach(card => card.remove());
        return;
    }

    if (!document.querySelector('#welcome-info')) return;
    fetchIpInfo();
};

const getWelcomeInfoElement = () => document.querySelector('#welcome-info');

/* ---------- 地名中译层 ---------- */
const provinceMapCN = {
    "Beijing": "北京市",
    "Tianjin": "天津市",
    "Hebei": "河北省",
    "Shanxi": "山西省",
    "Inner Mongolia": "内蒙古自治区",
    "Liaoning": "辽宁省",
    "Jilin": "吉林省",
    "Heilongjiang": "黑龙江省",
    "Shanghai": "上海市",
    "Jiangsu": "江苏省",
    "Zhejiang": "浙江省",
    "Anhui": "安徽省",
    "Fujian": "福建省",
    "Jiangxi": "江西省",
    "Shandong": "山东省",
    "Henan": "河南省",
    "Hubei": "湖北省",
    "Hunan": "湖南省",
    "Guangdong": "广东省",
    "Guangxi": "广西壮族自治区",
    "Hainan": "海南省",
    "Sichuan": "四川省",
    "Guizhou": "贵州省",
    "Yunnan": "云南省",
    "Tibet": "西藏自治区",
    "Shaanxi": "陕西省",
    "Gansu": "甘肃省",
    "Qinghai": "青海省",
    "Ningxia": "宁夏回族自治区",
    "Xinjiang": "新疆维吾尔自治区",
    "Taiwan": "台湾省",
    "Hong Kong": "香港特别行政区",
    "Macau": "澳门特别行政区"
};

const cityMapCN = {
    // 国内常见
    "Beijing": "北京市",
    "Nanjing": "南京市",
    "Suzhou": "苏州市",
    "Hangzhou": "杭州市",
    "Guangzhou": "广州市",
    "Shenzhen": "深圳市",
    "Yangjiang": "阳江市",
    "Zhengzhou": "郑州市",
    "Xinyang": "信阳市",
    "Nanyang": "南阳市",
    "Zhumadian": "驻马店市",
    "Kaifeng": "开封市",
    "Luoyang": "洛阳市",
    "Huanggang": "黄冈市",
    // 港澳台
    "Hong Kong": "香港",
    "Macau": "澳门",
    "Taipei": "台北市",
    // 国际城市常见映射（补常用）
    "New York": "纽约",
    "Los Angeles": "洛杉矶",
    "San Francisco": "旧金山",
    "Washington": "华盛顿",
    "Tokyo": "东京",
    "Osaka": "大阪",
    "Seoul": "首尔",
    "Paris": "巴黎",
    "London": "伦敦",
    "Moscow": "莫斯科",
    "Berlin": "柏林",
    "Sydney": "悉尼",
    "Toronto": "多伦多",
    "Vancouver": "温哥华"
};

const countryAliasCN = {
    "United States": "美国",
    "United Kingdom": "英国",
    "South Korea": "韩国",
    "North Korea": "朝鲜",
    "Russia": "俄罗斯",
    "Japan": "日本",
    "France": "法国",
    "Germany": "德国",
    "Australia": "澳大利亚",
    "Canada": "加拿大",
    "China": "中国",
    "Hong Kong": "中国",
    "Macau": "中国",
    "Taiwan": "中国"
};

function translateCountryToCN(rawCountry) {
    if (!rawCountry) return '';
    // 如果是国家代码（CN/US），尝试用 Intl.DisplayNames
    try {
        const code = String(rawCountry).trim();
        // 尝试检测是否是2字母国家码
        if (/^[A-Za-z]{2}$/.test(code)) {
            const dn = new Intl.DisplayNames(['zh'], { type: 'region' });
            const nameCN = dn.of(code.toUpperCase());
            if (nameCN) return nameCN;
        }
    } catch (e) {}
    // 直接按 alias 或者基本映射处理
    const s = String(rawCountry).trim();
    if (countryAliasCN[s]) return countryAliasCN[s];
    // 常见英文名首字母大小写差异
    const normalized = s.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    if (countryAliasCN[normalized]) return countryAliasCN[normalized];
    // 最后尝试 Intl with full string (works if input is English country name)
    try {
        const dn2 = new Intl.DisplayNames(['zh'], { type: 'region' });
        // Intl expects region code; but sometimes it can accept names? If not, fallback to original.
        // We'll try to find a region code by brute force (rarely necessary).
        return normalized;
    } catch (e) {
        return normalized;
    }
}

function translateProvince(provRaw, countryCN) {
    if (!provRaw) return '';
    const prov = String(provRaw).trim();
    // 如果国家判定为中国（或包含“中国”），优先用 provinceMapCN
    if (countryCN && countryCN.includes('中国')) {
        // 常见英文 province 名称直接命中
        if (provinceMapCN[prov]) return provinceMapCN[prov];
        // 有些数据可能是小写或带 suffix 的，尝试简单匹配
        const key = Object.keys(provinceMapCN).find(k => k.toLowerCase() === prov.toLowerCase());
        if (key) return provinceMapCN[key];
        // 另外尝试去掉 "Province/State" 后缀
        const p2 = prov.replace(/( Province| province| State| state| Region| region)$/i, '').trim();
        const key2 = Object.keys(provinceMapCN).find(k => k.toLowerCase() === p2.toLowerCase());
        if (key2) return provinceMapCN[key2];
        // 如无法识别，尝试把单词首字母大写并加上省后缀（兜底）
        return prov + "省";
    } else {
        // 非中国地区，直接返回原值（或已被 country 转换为中文时无需改）
        return prov;
    }
}

function translateCity(cityRaw, provCN, countryCN) {
    if (!cityRaw) return '';
    const city = String(cityRaw).trim();
    // 先查 cityMapCN
    if (cityMapCN[city]) return cityMapCN[city];
    const key = Object.keys(cityMapCN).find(k => k.toLowerCase() === city.toLowerCase());
    if (key) return cityMapCN[key];

    // 对港澳台或中国内地尝试补后缀（例如 "Beijing" -> "北京市"）
    if (countryCN && countryCN.includes('中国')) {
        // 如果省份是北京市/上海市之类，城市可能为空或同名，直接返回省名第一段
        if (provCN && /(市|自治区|特别行政区)/.test(provCN)) {
            return provCN.replace(/省|自治区|特别行政区|市$/, '') + "市";
        }
        // 尝试添加“市”后缀作为兜底
        if (!/市|县|区|镇|乡/.test(city)) return city + "市";
    }

    // 国际城市，如 New York -> 纽约 的映射已经有限，未命中则返回原文（尽量保留可读性）
    return city;
}

/* ---------- 从 ip.sb 获取并转换为原 nsmao 风格 ---------- */
const fetchIpData = async () => {
    const url = 'https://api.ip.sb/geoip';
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) throw new Error('网络响应不正常：' + resp.status);
    const raw = await resp.json();

    const ip = raw.ip || raw.query || raw.ip_address || '';
    const lon = raw.longitude ?? raw.lon ?? raw.lng ?? raw.longitude_deg ?? raw.long;
    const lat = raw.latitude ?? raw.lat ?? raw.latitude_deg;
    const rawCountry = raw.country || raw.country_name || raw.country_name_en || raw.countryCode || raw.country_code || '';
    const rawRegion = raw.region || raw.regionName || raw.province || raw.state || raw.region_name || '';
    const rawCity = raw.city || raw.city_name || raw.town || raw.locality || '';

    // 先把国家转成中文（尽量可靠）
    const countryCN = translateCountryToCN(rawCountry);

    // 再把省/地区、城市转成中文
    const provCN = translateProvince(rawRegion, countryCN);
    const cityCN = translateCity(rawCity, provCN, countryCN);

    const data = {
        lng: typeof lon === 'number' ? lon : (parseFloat(lon) || 0),
        lat: typeof lat === 'number' ? lat : (parseFloat(lat) || 0),
        country: countryCN || '',
        prov: provCN || '',
        city: cityCN || ''
    };

    return { data, ip };
};

/* ---------- 其余显示/缓存等逻辑（保留并复用你原来的逻辑） ---------- */
const showWelcome = ({
    data,
    ip
}) => {
    if (!data) return showErrorMessage();

    const {
        lng,
        lat,
        country,
        prov,
        city
    } = data;
    const welcomeInfo = getWelcomeInfoElement();
    if (!welcomeInfo) return;

    let dist = '未知';
    if (Number.isFinite(lng) && Number.isFinite(lat) && (lng !== 0 || lat !== 0)) {
        dist = calculateDistance(lng, lat);
    }

    const ipDisplay = formatIpDisplay(ip || '');
    const pos = formatLocation(country, prov, city);

    welcomeInfo.style.display = 'block';
    welcomeInfo.style.height = 'auto';
    welcomeInfo.innerHTML = generateWelcomeMessage(pos, dist, ipDisplay, country, prov, city);
};

const calculateDistance = (lng, lat) => {
    const R = 6371;
    const rad = Math.PI / 180;
    const dLat = (lat - IP_CONFIG.BLOG_LOCATION.lat) * rad;
    const dLon = (lng - IP_CONFIG.BLOG_LOCATION.lng) * rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(IP_CONFIG.BLOG_LOCATION.lat * rad) * Math.cos(lat * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
const formatIpDisplay = (ip) => {
    if (!ip) return '未知IP';
    return ip.includes(":") ? "<br>好复杂，咱看不懂~(ipv6)" : ip;
};
const formatLocation = (country, prov, city) => {
    if (!country) return '神秘地区';
    return country === "中国" ? `${prov || ''} ${city || ''}`.trim() || '中国' : country;
};

const generateWelcomeMessage = (pos, dist, ipDisplay, country, prov, city) => `
    欢迎来自 <b>${pos}</b> 的小友💖<br>
    ${dist === '未知' ? '' : `你当前距博主约 <b>${dist}</b> 公里！<br>`}
    你的IP地址：<b class="ip-address">${ipDisplay}</b><br>
    ${getTimeGreeting()}<br>
    Tip：<b>${getGreeting(country, prov, city)}🍂</b>
`;

const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        #welcome-info {
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 212px;
            padding: 10px;
            margin-top: 5px;
            border-radius: 12px;
            background-color: var(--anzhiyu-background);
            outline: 1px solid var(--anzhiyu-card-border);
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 3px solid var(--anzhiyu-main);
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .ip-address {
            filter: blur(5px);
            transition: filter 0.3s ease;
        }
        .ip-address:hover {
            filter: blur(0);
        }
        .error-message {
            color: #ff6565;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .error-message p,
        .permission-dialog p {
            margin: 0;
        }
        .error-icon {
            font-size: 3rem;
        }
        #retry-button {
            margin: 0 5px;
            color: var(--anzhiyu-main);
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        #retry-button:hover {
            transform: rotate(180deg);
        }
        .permission-dialog {
            text-align: center;
        }
        .permission-dialog button {
            margin: 10px 5px;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: var(--anzhiyu-main);
            color: white;
            transition: opacity 0.3s ease;
            cursor: pointer;
        }
        .permission-dialog button:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
};

const checkLocationPermission = () => localStorage.getItem('locationPermission') === 'granted';
const saveLocationPermission = (permission) => {
    localStorage.setItem('locationPermission', permission);
};
const showLocationPermissionDialog = () => {
    const welcomeInfoElement = document.getElementById("welcome-info");
    if (!welcomeInfoElement) return;
    welcomeInfoElement.innerHTML = `
        <div class="permission-dialog">
            <div class="error-icon">❓</div>
            <p>是否允许访问您的位置信息？</p>
            <button data-action="allow">允许</button>
            <button data-action="deny">拒绝</button>
        </div>
    `;

    welcomeInfoElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.dataset.action;
            const permission = action === 'allow' ? 'granted' : 'denied';
            handleLocationPermission(permission);
        }
    }, { once: true });
};
const handleLocationPermission = (permission) => {
    saveLocationPermission(permission);
    if (permission === 'granted') {
        showLoadingSpinner();
        fetchIpInfo();
    } else {
        showErrorMessage('您已拒绝访问位置信息');
    }
};

const showLoadingSpinner = () => {
    const welcomeInfoElement = document.querySelector("#welcome-info");
    if (!welcomeInfoElement) return;
    welcomeInfoElement.innerHTML = '<div class="loading-spinner"></div>';
};

const IP_CACHE_KEY = 'ip_info_cache';
const getIpInfoFromCache = () => {
    const cached = localStorage.getItem(IP_CACHE_KEY);
    if (!cached) return null;

    try {
        const { data, timestamp } = JSON.parse(cached);
        if (!data || !timestamp) { localStorage.removeItem(IP_CACHE_KEY); return null; }
        if (Date.now() - timestamp > IP_CONFIG.CACHE_DURATION) {
            localStorage.removeItem(IP_CACHE_KEY);
            return null;
        }
        return data;
    } catch (e) {
        localStorage.removeItem(IP_CACHE_KEY);
        return null;
    }
};
const setIpInfoCache = (data) => {
    localStorage.setItem(IP_CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
};

const fetchIpInfo = async () => {
    if (!checkLocationPermission()) {
        showLocationPermissionDialog();
        return;
    }

    showLoadingSpinner();

    const cachedData = getIpInfoFromCache();
    if (cachedData) {
        if (cachedData.data && cachedData.ip) {
            showWelcome(cachedData);
        } else {
            showWelcome({ data: cachedData, ip: cachedData.ip || '' });
        }
        return;
    }

    try {
        const result = await fetchIpData();
        if (!result || !result.data) throw new Error('无效的返回数据');
        setIpInfoCache(result);
        showWelcome(result);
    } catch (error) {
        console.error('获取IP信息失败:', error);
        showErrorMessage();
    }
};

/* ---------- 原有 greetings / getGreeting / getTimeGreeting / showErrorMessage 等保持不变 ---------- */
const greetings = {
    "中国": {
        "北京市": "北——京——欢迎你~~~",
        "天津市": "讲段相声吧",
        "河北省": "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山",
        "山西省": "展开坐具长三尺，已占山河五百余",
        "内蒙古自治区": "天苍苍，野茫茫，风吹草低见牛羊",
        "辽宁省": "我想吃烤鸡架！",
        "吉林省": "状元阁就是东北烧烤之王",
        "黑龙江省": "很喜欢哈尔滨大剧院",
        "上海市": "众所周知，中国只有两个城市",
        "江苏省": {
            "南京市": "这是我挺想去的城市啦",
            "苏州市": "上有天堂，下有苏杭",
            "其他": "散装是必须要散装的"
        },
        "浙江省": {
            "杭州市": "东风渐绿西湖柳，雁已还人未南归",
            "其他": "望海楼明照曙霞,护江堤白蹋晴沙"
        },
        "河南省": {
            "郑州市": "豫州之域，天地之中",
            "信阳市": "品信阳毛尖，悟人间芳华",
            "南阳市": "臣本布衣，躬耕于南阳此南阳非彼南阳！",
            "驻马店市": "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！",
            "开封市": "刚正不阿包青天",
            "洛阳市": "洛阳牡丹甲天下",
            "其他": "可否带我品尝河南烩面啦？"
        },
        "安徽省": "蚌埠住了，芜湖起飞",
        "福建省": "井邑白云间，岩城远带山",
        "江西省": "落霞与孤鹜齐飞，秋水共长天一色",
        "山东省": "遥望齐州九点烟，一泓海水杯中泻",
        "湖北省": {
            "黄冈市": "红安将军县！辈出将才！",
            "其他": "来碗热干面~"
        },
        "湖南省": "74751，长沙斯塔克",
        "广东省": {
            "广州市": "看小蛮腰，喝早茶了嘛~",
            "深圳市": "今天你逛商场了嘛~",
            "阳江市": "阳春合水！博主家乡~ 欢迎来玩~",
            "其他": "来两斤福建人~"
        },
        "广西壮族自治区": "桂林山水甲天下",
        "海南省": "朝观日出逐白浪，夕看云起收霞光",
        "四川省": "康康川妹子",
        "贵州省": "茅台，学生，再塞200",
        "云南省": "玉龙飞舞云缠绕，万仞冰川直耸天",
        "西藏自治区": "躺在茫茫草原上，仰望蓝天",
        "陕西省": "来份臊子面加馍",
        "甘肃省": "羌笛何须怨杨柳，春风不度玉门关",
        "青海省": "牛肉干和老酸奶都好好吃",
        "宁夏回族自治区": "大漠孤烟直，长河落日圆",
        "新疆维吾尔自治区": "驼铃古道丝绸路，胡马犹闻唐汉风",
        "台湾省": "我在这头，大陆在那头",
        "香港特别行政区": "永定贼有残留地鬼嚎，迎击光非岁玉",
        "澳门特别行政区": "性感荷官，在线发牌",
        "其他": "带我去你的城市逛逛吧！"
    },
    "美国": "Let us live in peace!",
    "日本": "よろしく、一緒に桜を見ませんか",
    "俄罗斯": "Водка в горюче :)",
    "法国": "C'est La Vie",
    "德国": "Die Zeit verging im Fluge.",
    "澳大利亚": "一起去大堡礁吧！",
    "加拿大": "拾起一片枫叶赠予你",
    "其他": "带我去你的国家逛逛吧"
};

const getGreeting = (country, province, city) => {
    const countryGreeting = greetings[country] || greetings["其他"];
    if (typeof countryGreeting === 'string') {
        return countryGreeting;
    }
    const provinceGreeting = countryGreeting[province] || countryGreeting["其他"];
    if (typeof provinceGreeting === 'string') {
        return provinceGreeting;
    }
    return provinceGreeting[city] || provinceGreeting["其他"] || countryGreeting["其他"];
};
const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "早上好🌤️ ，一日之计在于晨";
    if (hour < 13) return "中午好☀️ ，记得午休喔~";
    if (hour < 17) return "下午好🕞 ，饮茶先啦！";
    if (hour < 19) return "即将下班🚶‍♂️，记得按时吃饭~";
    return "晚上好🌙 ，夜生活嗨起来！";
};

const showErrorMessage = (message = '抱歉，无法获取信息') => {
    const welcomeInfoElement = document.getElementById("welcome-info");
    if (!welcomeInfoElement) return;
    welcomeInfoElement.innerHTML = `
        <div class="error-message">
            <div class="error-icon">😕</div>
            <p>${message}</p>
            <p>请<i id="retry-button" class="fa-solid fa-arrows-rotate"></i>重试或检查网络连接</p>
        </div>
    `;

    const retry = document.getElementById('retry-button');
    if (retry) retry.addEventListener('click', fetchIpInfo);
};

const isHomePage = () => {
    return window.location.pathname === '/' || window.location.pathname === '/index.html';
};

document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    insertAnnouncementComponent();
    document.addEventListener('pjax:complete', insertAnnouncementComponent);
});
