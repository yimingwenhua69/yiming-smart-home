export type EvidenceLevel = "official" | "documented" | "community" | "lab-tested" | "field-tested";
export type CatalogSource = {
  id: string;
  publisher: string;
  title: string;
  url: string;
  sourceType: "official-product-catalog" | "official-specification" | "official-compatibility" | "open-database" | "standard";
  evidenceLevel: EvidenceLevel;
  checkedAt: string;
  region: "CN" | "GLOBAL";
  notes: string;
};

export type Manufacturer = {
  id: string;
  name: string;
  englishName: string;
  website: string;
  productCenter: string;
  country: string;
  status: "active" | "researching";
  note: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  subcategories: string[];
};

export type Brand = {
  id: string;
  name: string;
  manufacturerId: string;
  website: string;
  note: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  manufacturerId: string;
  brandId: string;
  categoryId: string;
  summary: string;
  modelIds: string[];
};

export type DeviceModel = {
  id: string;
  productId: string;
  modelCode: string | null;
  hardwareRevision: string | null;
  protocolIds: string[];
  platformIds: string[];
  capabilityIds: string[];
  sourceIds: string[];
  evidenceLevel: EvidenceLevel;
  verificationStatus: "official-listing" | "official-specification" | "needs-model-verification";
  lastVerified: string;
  region: "CN";
  price: null;
  image: null;
  threeDAsset: null;
  specifications: { name: string; value: string; sourceId: string }[];
  limitations: string[];
};

type ProductModelSeed = {
  id: string;
  slug: string;
  name: string;
  model: string | null;
  manufacturerId: string;
  brandId: string;
  categoryId: string;
  summary: string;
  protocolIds: string[];
  platformIds: string[];
  capabilityIds: string[];
  sourceIds: string[];
  evidenceLevel: EvidenceLevel;
  verificationStatus: "official-listing" | "official-specification" | "needs-model-verification";
  lastVerified: string;
  region: "CN";
  price: null;
  image: null;
  threeDAsset: null;
  specifications: { name: string; value: string; sourceId: string }[];
  limitations: string[];
};

export const sources: CatalogSource[] = [
  {
    id: "aqara-catalog-cn",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "Aqara 中国大陆产品中心",
    url: "https://aqara.cn/cn/prodCenter",
    sourceType: "official-product-catalog",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "用于核实官网当前列出的产品名称与产品分类；目录出现不等同于确认每一 SKU 的实时库存或完整技术参数。官网注明产品适用中国大陆地区。"
  },
  {
    id: "huawei-wholehome-cn",
    publisher: "华为终端有限公司",
    title: "华为鸿蒙智家官网",
    url: "https://consumer.huawei.com/cn/wholehome/",
    sourceType: "official-product-catalog",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "核实官网展示的智能主机、开关、传感器、照明与场景方案名称；价格与页面宣传不作为长期固定参数。"
  },
  {
    id: "huawei-sensor-compatibility",
    publisher: "华为终端有限公司",
    title: "华为鸿蒙智家融合感知支持清单",
    url: "https://consumer.huawei.com/cn/support/content/zh-cn16077682/",
    sourceType: "official-compatibility",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "明确列出 BER-SE00、BER-SE10、BER-SE11、BER-SE01 等传感器型号及支持的主机型号。兼容性结论仅限该官方清单描述的融合感知功能。"
  },
  {
    id: "orvibo-catalog-cn",
    publisher: "深圳市欧瑞博科技股份有限公司",
    title: "欧瑞博中国区产品中心",
    url: "https://global.orvibo.com/cn/product/productList.html",
    sourceType: "official-product-catalog",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "用于核实官网产品线与名称，包括 MixPad、中控屏、照明、窗帘、安防传感器等。"
  },
  {
    id: "orvibo-curtain-install",
    publisher: "深圳市欧瑞博科技股份有限公司",
    title: "欧瑞博智能窗帘智控版安装参数",
    url: "https://www.orvibo.com/cn/product/chuangliansmart_install.html",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "页面同时列出 MixPad C 超级智能开关、W10 直流超静音窗帘电机及 W13/W14 导轨参数。页面声明相关数据为特定实验室环境理论值。"
  },
  {
    id: "aqara-m200-support",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "Aqara 网关 M200 官方产品支持",
    url: "https://www.aqara.cn/Hub-M200_support",
    sourceType: "official-compatibility",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方支持页说明 M200 的 PoE、双频 Wi-Fi 6、WPA3、Matter 控制器、Thread 边界路由器、Apple Home 接入和实验室子设备连接测试。"
  },
  {
    id: "aqara-fp2-spec",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "Aqara 场景传感器 FP2 产品参数",
    url: "https://www.aqara.cn/cn/Aqara_Presence_Detector_FP2_spec",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方参数页列出型号 RTCZCGQ12LM、Wi-Fi、Bluetooth 4.2、5V/1A 和环境参数。"
  },
  {
    id: "aqara-fp2-support",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "Aqara 场景传感器 FP2 官方产品支持",
    url: "https://www.aqara.cn/cn/Aqara_Presence_Detector_FP2_support",
    sourceType: "official-compatibility",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方支持页说明毫米波干扰源标注、左右进出方向识别、本地自动化对局域网自动化网关的要求。"
  },
  {
    id: "aqara-door-window-t1-spec",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "Aqara 门窗传感器 T1 产品参数",
    url: "https://www.aqara.cn/cn/d18_spec",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方参数页列出型号 MCCGQ12LM、Zigbee 3.0、CR1632、电池尺寸和最大感应距离。"
  },
  {
    id: "aqara-open-platform-device-list",
    publisher: "Aqara 开放平台",
    title: "配网 SDK 支持设备清单",
    url: "https://opendoc.aqara.cn/docs/SDK%E5%BC%80%E5%8F%91/Android%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/%E8%AE%BE%E5%A4%87%E9%85%8D%E7%BD%91/%E9%85%8D%E7%BD%91SDK%E6%94%AF%E6%8C%81%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95.html",
    sourceType: "official-compatibility",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "Aqara 官方 SDK 型号映射清单。设备型号映射值属于 Aqara SDK 内部设备标识，不等同于零售 SKU 或 Zigbee 设备通用 modelId。"
  },
  {
    id: "aqara-m3-spec",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "方舟智慧中枢 M3 产品参数",
    url: "https://www.aqara.cn/cn/Hub-m3_spec",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方参数页列出型号 ZHWG24LM、尺寸、供电、环境范围和无线协议。"
  },
  {
    id: "aqara-fp1e-spec",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "AI 智能存在传感器 FP1E 产品参数",
    url: "https://www.aqara.cn/Aqara-AI-Presence-Detector-FP1E_spec",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方参数页列出型号 RTCZCGQ13LM、尺寸、Zigbee 无线连接、供电和环境参数。"
  },
  {
    id: "aqara-fp1e-support",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "AI 智能存在传感器 FP1E 官方支持问答",
    url: "https://www.aqara.cn/cn/Aqara-AI-Presence-Detector-FP1E_support",
    sourceType: "official-compatibility",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方支持页说明 Zigbee 3.0 网关要求及经 Aqara 网关桥接 Matter 后接入第三方生态的范围。"
  },
  {
    id: "aqara-p1-spec",
    publisher: "Aqara / 深圳绿米联创科技有限公司",
    title: "人体传感器 P1 产品参数",
    url: "https://www.aqara.cn/cn/Motion-Sensor-P1_spec",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方参数页列出型号 RTCGQ14LM、尺寸、重量、电池类型、Zigbee 3.0 和环境参数。"
  },
  {
    id: "huawei-ai-sensor-air",
    publisher: "华为终端有限公司",
    title: "华为鸿蒙智家 AI 超感传感器 Air 产品介绍",
    url: "https://consumer.huawei.com/cn/wholehome/smart-sensing/",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方产品页介绍红外、毫米波和光感融合、安装方式及场景能力；页面脚注对实验室响应数据、遮挡和环境影响作出限定。"
  },
  {
    id: "orvibo-s5",
    publisher: "深圳市欧瑞博科技股份有限公司",
    title: "欧瑞博智能射灯 S5 产品介绍",
    url: "https://global.orvibo.com/cn/product/s5.html",
    sourceType: "official-specification",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "官方历史产品页列出 24°/36° 光束角和 5° 档位调角信息；当前销售状态与页面参数版本仍需厂商再次确认。"
  },
  {
    id: "zigbee2mqtt-supported",
    publisher: "Koenkk / Zigbee2MQTT contributors",
    title: "Zigbee2MQTT Supported Devices",
    url: "https://www.zigbee2mqtt.io/supported-devices/",
    sourceType: "open-database",
    evidenceLevel: "community",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "用于型号级 Zigbee 设备支持交叉核验；项目条目属于社区维护证据，不替代厂商官方声明或本工作室实测。"
  },
  {
    id: "miot-spec",
    publisher: "MIOT Home community",
    title: "MIOT Home 设备与规格数据库",
    url: "https://home.miot-spec.com/",
    sourceType: "open-database",
    evidenceLevel: "community",
    checkedAt: "2026-11-26",
    region: "CN",
    notes: "社区设备数据库，只作线索和交叉核验，不作为单独的官方规格证明。"
  },
  {
    id: "home-assistant-integrations",
    publisher: "Open Home Foundation",
    title: "Home Assistant Integrations",
    url: "https://www.home-assistant.io/integrations/",
    sourceType: "open-database",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "用于核验 Home Assistant 官方集成目录及其文档。"
  },
  {
    id: "matter-csa",
    publisher: "Connectivity Standards Alliance",
    title: "Matter",
    url: "https://csa-iot.org/all-solutions/matter/",
    sourceType: "standard",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "Matter 标准与认证体系的官方来源。"
  },
  {
    id: "thread-group",
    publisher: "Thread Group",
    title: "Thread Networking Protocol",
    url: "https://www.threadgroup.org/What-is-Thread/Thread-Benefits",
    sourceType: "standard",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "Thread 网络技术官方说明。"
  },
  {
    id: "knx-association",
    publisher: "KNX Association",
    title: "KNX",
    url: "https://www.knx.org/",
    sourceType: "standard",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "KNX 协会官方标准与生态资料。"
  },
  {
    id: "dali-alliance",
    publisher: "DALI Alliance",
    title: "DALI Lighting",
    url: "https://www.dali-alliance.org/",
    sourceType: "standard",
    evidenceLevel: "official",
    checkedAt: "2026-11-26",
    region: "GLOBAL",
    notes: "DALI-2、D4i 与照明控制标准官方来源。"
  }
];

export const manufacturers: Manufacturer[] = [
  { id: "aqara", name: "绿米联创", englishName: "Aqara", website: "https://aqara.cn/", productCenter: "https://aqara.cn/cn/prodCenter", country: "中国", status: "active", note: "全屋智能设备、传感、照明、门锁与网关产品线。" },
  { id: "xiaomi", name: "小米", englishName: "Xiaomi", website: "https://www.mi.com/", productCenter: "https://www.mi.com/shop", country: "中国", status: "researching", note: "米家生态；产品、品牌与制造商关系必须按具体型号核实。" },
  { id: "huawei", name: "华为终端", englishName: "Huawei", website: "https://consumer.huawei.com/cn/", productCenter: "https://consumer.huawei.com/cn/wholehome/", country: "中国", status: "active", note: "鸿蒙智家、智能主机、传感器、面板、照明与门锁。" },
  { id: "orvibo", name: "欧瑞博", englishName: "ORVIBO", website: "https://www.orvibo.com/cn/", productCenter: "https://global.orvibo.com/cn/product/productList.html", country: "中国", status: "active", note: "MixPad、中控、照明、窗帘与安防传感产品线。" },
  { id: "tuya", name: "涂鸦智能", englishName: "Tuya", website: "https://www.tuya.com/cn", productCenter: "https://www.tuya.com/cn", country: "中国", status: "researching", note: "以 IoT 平台、开发工具和生态能力为主；不得将 OEM 设备误登记为涂鸦自有品牌产品。" }
];

export const brands: Brand[] = [
  { id: "aqara", name: "Aqara", manufacturerId: "aqara", website: "https://aqara.cn/", note: "Aqara 智能家居品牌；产品型号和销售区域需逐项核对。" },
  { id: "mi-home", name: "米家", manufacturerId: "xiaomi", website: "https://www.mi.com/", note: "米家生态品牌；具体产品制造商可能不同，需按 SKU 核实。" },
  { id: "huawei-wholehome", name: "华为全屋智能", manufacturerId: "huawei", website: "https://consumer.huawei.com/cn/wholehome/", note: "华为全屋智能产品与生态品牌。" },
  { id: "orvibo", name: "欧瑞博", manufacturerId: "orvibo", website: "https://www.orvibo.com/cn/", note: "欧瑞博智能家居品牌。" },
  { id: "tuya", name: "涂鸦智能", manufacturerId: "tuya", website: "https://www.tuya.com/cn", note: "涂鸦智能平台与品牌；OEM 产品不得自动归入涂鸦品牌硬件。" }
];

export const categories: ProductCategory[] = [
  { id: "lighting", name: "照明", description: "灯具、光源、驱动、调光与照明配件。", subcategories: ["射灯", "筒灯", "磁吸灯", "COB 灯带", "灯带", "线性照明", "氛围灯", "其他照明"] },
  { id: "switch", name: "智能面板", description: "智能开关、场景面板、旋钮与墙面交互设备。", subcategories: ["智能开关", "场景面板", "旋钮", "触摸屏", "其他面板"] },
  { id: "sensor", name: "传感器", description: "人体、存在、门窗、环境与安全监测设备。", subcategories: ["人体传感器", "存在传感器", "门磁", "温湿度", "光照", "烟雾", "气体", "水浸", "其他传感"] },
  { id: "gateway", name: "网关与中枢", description: "协议网关、边缘中枢、智能主机与桥接器。", subcategories: ["智能网关", "边缘网关", "中枢屏", "桥接器", "其他中枢"] },
  { id: "curtain", name: "窗帘与电机", description: "开合帘、卷帘、百叶、天幕与遮阳驱动。", subcategories: ["窗帘电机", "轨道", "百叶", "卷帘", "天幕", "遮阳", "其他"] },
  { id: "control", name: "控制与执行", description: "继电器、驱动器、调光器、控制器与执行器。", subcategories: ["继电器", "驱动器", "调光器", "控制器", "执行器", "其他控制"] },
  { id: "accessory", name: "配件与其他", description: "电源、线材、安装件、适配器与系统附件。", subcategories: ["电源", "线材", "安装件", "适配器", "其他配件"] }
];

export const protocols = [
  { id: "matter", name: "Matter", family: "IP 应用层标准", summary: "跨品牌智能家居互操作标准，运行于受支持的 IP 网络之上。", transport: "以太网、Wi-Fi、Thread（依设备类型与实现）", topology: "基于 IP 的局域网与 Thread mesh", sourceIds: ["matter-csa"], cautions: ["Matter 认证不等于所有设备功能在所有平台完全一致。", "需逐项核对设备类型、可暴露功能、控制器与固件版本。"] },
  { id: "thread", name: "Thread", family: "低功耗 IPv6 mesh 网络", summary: "基于 IEEE 802.15.4 的 IPv6 mesh 网络技术，常作为 Matter over Thread 的网络承载。", transport: "IEEE 802.15.4 / IPv6", topology: "Mesh；边界路由器连接 Thread 网络与 IP 网络", sourceIds: ["thread-group"], cautions: ["Thread 是网络技术，不是 Matter 的同义词。", "Thread Border Router 的存在不自动代表设备已支持 Matter。"] },
  { id: "zigbee", name: "Zigbee", family: "低功耗 mesh 协议", summary: "广泛用于传感器、开关、灯具与网关生态的低功耗无线协议。", transport: "IEEE 802.15.4", topology: "Coordinator、Router、End Device 组成的 mesh / star 网络", sourceIds: ["zigbee2mqtt-supported"], cautions: ["同为 Zigbee 不代表跨品牌、跨网关功能完全互通。", "型号、硬件版本、固件与网关适配必须逐项核实。"] },
  { id: "zwave", name: "Z-Wave", family: "低功耗 sub-GHz mesh", summary: "用于智能家居控制与传感的低功耗无线协议生态。", transport: "地区相关 sub-GHz 频段", topology: "Mesh 网络", sourceIds: [], cautions: ["不同地区频段版本不可混用。", "购买前必须核实中国大陆可用性、频段与认证。"] },
  { id: "knx", name: "KNX", family: "有线 / 无线楼宇控制标准", summary: "成熟的建筑控制生态，常用于照明、遮阳、暖通与场景控制。", transport: "TP、IP、RF、PL 等介质", topology: "总线线路与区域耦合拓扑，具体依工程设计", sourceIds: ["knx-association"], cautions: ["总线供电、拓扑、线缆、设备数量与调试需按 KNX 规范设计。"] },
  { id: "wifi", name: "Wi-Fi", family: "IP 无线网络", summary: "基于 IEEE 802.11 的无线局域网，常用于摄像机、家电、网关与高带宽设备。", transport: "IEEE 802.11 / IP", topology: "Infrastructure WLAN", sourceIds: [], cautions: ["需规划 2.4GHz / 5GHz、AP 覆盖、漫游、隔离与并发容量。", "Wi-Fi 接入不等于开放本地 API 或支持跨平台控制。"] },
  { id: "ble", name: "Bluetooth LE", family: "短距离低功耗无线", summary: "常用于近场配网、低功耗传感和设备控制。", transport: "2.4GHz BLE", topology: "点对点、广播或 Mesh（取决于具体协议栈）", sourceIds: [], cautions: ["BLE 与 Bluetooth Mesh 是不同层次的技术概念。", "必须核实设备是否开放标准服务或仅使用私有 GATT。"] }
] as const;

export const platforms = [
  { id: "apple-home", name: "Apple Home", owner: "Apple", summary: "苹果家庭生态，设备接入依赖 Matter、Thread、HomeKit 等实际支持路径。", link: "https://www.apple.com/home-app/", integration: "Matter / HomeKit", cautions: ["认证与协议路径不同，不能只凭 Wi-Fi 或 Zigbee 推断兼容。"] },
  { id: "google-home", name: "Google Home", owner: "Google", summary: "Google 智能家居平台，支持的设备类型与功能取决于设备接入方式。", link: "https://home.google.com/", integration: "Matter / Cloud integration", cautions: ["云端集成与 Matter 本地接入的能力边界不同。"] },
  { id: "alexa", name: "Amazon Alexa", owner: "Amazon", summary: "语音助手与智能家居平台，可通过兼容设备、技能或 Matter 接入。", link: "https://www.amazon.com/alexa", integration: "Matter / Skills / Cloud", cautions: ["Skill、云端和本地 Matter 暴露能力需分别记录。"] },
  { id: "home-assistant", name: "Home Assistant", owner: "Open Home Foundation", summary: "开放式家庭自动化平台，集成覆盖本地协议、云服务与社区设备。", link: "https://www.home-assistant.io/", integration: "Native / MQTT / Matter / Bridges", cautions: ["社区集成不等于厂商官方支持；需记录版本与维护状态。"] },
  { id: "harmony-home", name: "华为鸿蒙智家", owner: "Huawei", summary: "华为全屋智能生态，包含主机、面板、传感器、照明与场景服务。", link: "https://consumer.huawei.com/cn/wholehome/", integration: "Huawei ecosystem", cautions: ["以华为官方兼容清单和具体主机/设备型号为准。"] }
] as const;

export const capabilities = [
  { id: "on-off", name: "开关控制", valueType: "boolean" },
  { id: "brightness", name: "亮度调节", valueType: "percentage" },
  { id: "color-temperature", name: "色温调节", valueType: "temperature" },
  { id: "color", name: "颜色控制", valueType: "color" },
  { id: "occupancy", name: "人体 / 存在检测", valueType: "boolean" },
  { id: "contact", name: "门窗状态", valueType: "boolean" },
  { id: "temperature", name: "温度测量", valueType: "temperature" },
  { id: "humidity", name: "湿度测量", valueType: "percentage" },
  { id: "illuminance", name: "照度测量", valueType: "illuminance" },
  { id: "power", name: "功率测量", valueType: "power" },
  { id: "energy", name: "电量统计", valueType: "energy" },
  { id: "curtain-position", name: "窗帘位置", valueType: "percentage" },
  { id: "scene", name: "场景触发", valueType: "scene" },
  { id: "alarm", name: "安全报警", valueType: "boolean" },
  { id: "air-quality", name: "空气质量", valueType: "number" }
] as const;

const productModelSeeds: ProductModelSeed[] = [
  { id: "aqara-m3", slug: "aqara-hub-m3", name: "方舟智慧中枢 M3", model: "ZHWG24LM", manufacturerId: "aqara", brandId: "aqara", categoryId: "gateway", summary: "Aqara 官方参数页确认的家庭中枢网关，支持 Wi-Fi、Zigbee 与 Thread 等无线连接。", protocolIds: ["wifi", "zigbee", "thread"], platformIds: [], capabilityIds: [], sourceIds: ["aqara-catalog-cn", "aqara-m3-spec"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "ZHWG24LM", sourceId: "aqara-m3-spec" }, { name: "产品尺寸", value: "105 × 105 × 36.5 mm", sourceId: "aqara-m3-spec" }, { name: "电源输入", value: "5 V ⎓ 2 A", sourceId: "aqara-m3-spec" }, { name: "PoE 输入", value: "48 V ⎓ 0.27 A", sourceId: "aqara-m3-spec" }, { name: "工作温度", value: "−10–50 °C", sourceId: "aqara-m3-spec" }, { name: "工作湿度", value: "0–95% RH，无冷凝", sourceId: "aqara-m3-spec" }, { name: "无线协议", value: "Wi-Fi IEEE 802.11 a/b/g/n/ac 2.4/5 GHz；Zigbee / Thread IEEE 802.15.4；Bluetooth 5.1", sourceId: "aqara-m3-spec" }], limitations: ["官方参数页列示数据；未据此推断该中枢对所有第三方设备开放全部能力。", "不同功能可能要求其他 Aqara 网关、设备固件或特定软件版本。"] },
  { id: "aqara-m200", slug: "aqara-hub-m200", name: "网关 M200", model: "M200", manufacturerId: "aqara", brandId: "aqara", categoryId: "gateway", summary: "Aqara 官方支持资料确认的 Matter 控制器与 Thread 边界路由器，可连接 Zigbee 和 Thread 子设备。", protocolIds: ["wifi", "zigbee", "thread", "matter"], platformIds: ["apple-home"], capabilityIds: [], sourceIds: ["aqara-catalog-cn", "aqara-m200-support"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "网络连接", value: "PoE 有线；双频 Wi-Fi 6（2.4GHz / 5GHz），WPA3", sourceId: "aqara-m200-support" }, { name: "中枢角色", value: "Matter 控制器、Thread 边界路由器", sourceId: "aqara-m200-support" }, { name: "子设备协议", value: "Zigbee、Thread", sourceId: "aqara-m200-support" }, { name: "Apple Home 接入", value: "支持 HomeKit 二维码与 Matter 二维码两种方式", sourceId: "aqara-m200-support" }, { name: "实验室连接测试", value: "40 个 Zigbee + 40 个 Thread 子设备同时连接（厂商实验室数据）", sourceId: "aqara-m200-support" }], limitations: ["HomeKit 与 Matter 二维码接入的功能存在差异：官方支持页说明空调模式仅在 Matter 接入第三方生态时可用；Matter 接入目前不支持 Security 功能。", "40 + 40 子设备数据为厂商实验室测试，不应视为所有现场网络条件下的性能保证。", "本记录尚未核实 M200 的独立零售硬件 SKU 代码，M200 为官方产品名称。"] },
  { id: "aqara-fp1e", slug: "aqara-fp1e", name: "AI 智能存在传感器 FP1E", model: "RTCZCGQ13LM", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "采用 Zigbee 无线连接的 AI 存在传感器；第三方生态接入需通过支持的 Aqara 网关桥接。", protocolIds: ["zigbee"], platformIds: ["apple-home", "google-home", "alexa", "home-assistant"], capabilityIds: ["occupancy"], sourceIds: ["aqara-catalog-cn", "aqara-fp1e-spec", "aqara-fp1e-support"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "RTCZCGQ13LM", sourceId: "aqara-fp1e-spec" }, { name: "产品尺寸", value: "57 × 50 × 37 mm", sourceId: "aqara-fp1e-spec" }, { name: "无线连接", value: "Zigbee", sourceId: "aqara-fp1e-spec" }, { name: "额定输入", value: "5 V / 1 A", sourceId: "aqara-fp1e-spec" }, { name: "电源接口", value: "USB-A", sourceId: "aqara-fp1e-spec" }, { name: "工作温度", value: "−10–40 °C", sourceId: "aqara-fp1e-spec" }, { name: "工作湿度", value: "0–95% RH，无冷凝", sourceId: "aqara-fp1e-spec" }], limitations: ["需要支持 Zigbee 3.0 的 Aqara 网关完成添加。", "第三方生态支持路径为经 Aqara 网关桥接 Matter；不代表 FP1E 可直接独立加入所有第三方平台。", "兼容网关型号和固件以官方支持页为准。"] },
  { id: "aqara-fp310", slug: "aqara-fp310", name: "AI 多维人在传感器 FP310", model: "FP310", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "Aqara 官网当前产品目录列出的免布线长续航人体感知产品。", protocolIds: [], platformIds: [], capabilityIds: ["occupancy"], sourceIds: ["aqara-catalog-cn"], evidenceLevel: "official", verificationStatus: "official-listing", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [], limitations: ["官网目录宣传语不作为量化续航、感知距离或协议参数。"] },
  { id: "aqara-fp400", slug: "aqara-fp400", name: "AI 空间传感器 FP400", model: "FP400", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "Aqara 官网当前产品目录列出的空间感知产品。", protocolIds: [], platformIds: [], capabilityIds: ["occupancy"], sourceIds: ["aqara-catalog-cn"], evidenceLevel: "official", verificationStatus: "official-listing", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [], limitations: ["未核实精确感知区域、算法能力、供电与平台映射。"] },
  { id: "aqara-fp2", slug: "aqara-fp2", name: "Aqara 场景传感器 FP2", model: "RTCZCGQ12LM", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "基于 Wi-Fi 的毫米波场景传感器，支持多目标感知和方向事件；本地自动化需兼容的局域网自动化网关。", protocolIds: ["wifi"], platformIds: [], capabilityIds: ["occupancy", "scene"], sourceIds: ["aqara-catalog-cn", "aqara-fp2-spec", "aqara-fp2-support"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "RTCZCGQ12LM", sourceId: "aqara-fp2-spec" }, { name: "无线连接", value: "Wi-Fi IEEE 802.11 b/g/n 2.4 GHz；Bluetooth 4.2", sourceId: "aqara-fp2-spec" }, { name: "额定输入", value: "5 V / 1 A", sourceId: "aqara-fp2-spec" }, { name: "执行标准", value: "GB 4943.1-2022", sourceId: "aqara-fp2-spec" }, { name: "工作温度", value: "−10–40 °C", sourceId: "aqara-fp2-spec" }, { name: "工作湿度", value: "0–95% RH，无冷凝", sourceId: "aqara-fp2-spec" }, { name: "本地自动化", value: "需支持 Wi-Fi 局域网自动化的网关", sourceId: "aqara-fp2-support" }], limitations: ["毫米波对窗帘、风扇、绿植等运动目标敏感，安装时需设置干扰源、进出口和边缘区域以减少误报。", "官方支持页指出本地自动化需要支持 Wi-Fi 局域网自动化的网关。", "参数页列出 Bluetooth 4.2，但本记录不将其推断为可直接控制设备的 BLE 服务。"] },
  { id: "aqara-p1", slug: "aqara-motion-sensor-p1", name: "人体传感器 P1", model: "RTCGQ14LM", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "Aqara 官方参数页确认的 Zigbee 3.0 人体移动传感器。", protocolIds: ["zigbee"], platformIds: [], capabilityIds: ["occupancy"], sourceIds: ["aqara-catalog-cn", "aqara-p1-spec"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "RTCGQ14LM", sourceId: "aqara-p1-spec" }, { name: "产品尺寸", value: "Φ33.1 × 41.6 mm（不含支架）", sourceId: "aqara-p1-spec" }, { name: "净重", value: "33 g（不含支架）", sourceId: "aqara-p1-spec" }, { name: "电池类型", value: "CR2450", sourceId: "aqara-p1-spec" }, { name: "无线连接", value: "Zigbee 3.0", sourceId: "aqara-p1-spec" }, { name: "工作温度", value: "−10–55 °C", sourceId: "aqara-p1-spec" }, { name: "工作湿度", value: "≤95% RH（无凝结）", sourceId: "aqara-p1-spec" }], limitations: ["传感器安装位置、遮挡、宠物活动和环境温度会影响实际触发效果；需要现场验证。"] },
  { id: "aqara-door-window-t1", slug: "aqara-door-window-sensor-t1", name: "门窗传感器 T1", model: "MCCGQ12LM", manufacturerId: "aqara", brandId: "aqara", categoryId: "sensor", summary: "Aqara 官方参数页确认的 Zigbee 3.0 门窗开合状态传感器。", protocolIds: ["zigbee"], platformIds: [], capabilityIds: ["contact"], sourceIds: ["aqara-catalog-cn", "aqara-door-window-t1-spec"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "MCCGQ12LM", sourceId: "aqara-door-window-t1-spec" }, { name: "无线连接", value: "Zigbee 3.0", sourceId: "aqara-door-window-t1-spec" }, { name: "产品尺寸", value: "41 × 22 × 11 mm", sourceId: "aqara-door-window-t1-spec" }, { name: "电池型号", value: "CR1632", sourceId: "aqara-door-window-t1-spec" }, { name: "最大感应距离", value: "22 mm", sourceId: "aqara-door-window-t1-spec" }, { name: "工作温度", value: "−10–50 °C", sourceId: "aqara-door-window-t1-spec" }, { name: "工作湿度", value: "0–95% RH，无冷凝", sourceId: "aqara-door-window-t1-spec" }], limitations: ["官方支持页要求主体与磁铁安装标记对齐，最大间距不超过 22 mm；金属门窗可能衰减无线信号。", "需核对兼容网关、设备固件和实际安装位置。"] },
  { id: "huawei-ai-sensor-ber-se10", slug: "huawei-ai-sensor-ber-se10", name: "华为鸿蒙智家 AI 超感传感器", model: "BER-SE10", manufacturerId: "huawei", brandId: "huawei-wholehome", categoryId: "sensor", summary: "华为官方融合感知支持清单明确列出的传感器型号。", protocolIds: [], platformIds: ["harmony-home"], capabilityIds: ["occupancy"], sourceIds: ["huawei-wholehome-cn", "huawei-sensor-compatibility"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "BER-SE10", sourceId: "huawei-sensor-compatibility" }], limitations: ["官方清单确认该型号属于融合感知支持产品；具体主机兼容范围、软件版本与安装要求须一并核对官方清单。"] },
  { id: "huawei-ai-sensor-ber-se00", slug: "huawei-ai-sensor-ber-se00", name: "华为全屋智能 AI 超感传感器", model: "BER-SE00", manufacturerId: "huawei", brandId: "huawei-wholehome", categoryId: "sensor", summary: "华为官方融合感知支持清单明确列出的上一命名体系传感器型号。", protocolIds: [], platformIds: ["harmony-home"], capabilityIds: ["occupancy"], sourceIds: ["huawei-sensor-compatibility"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "官方型号", value: "BER-SE00", sourceId: "huawei-sensor-compatibility" }], limitations: ["不能仅凭型号相近推断 BER-SE00 与 BER-SE10 的硬件、固件或功能完全一致。"] },
  { id: "huawei-ai-sensor-air", slug: "huawei-ai-sensor-air", name: "华为鸿蒙智家 AI 超感传感器 Air", model: null, manufacturerId: "huawei", brandId: "huawei-wholehome", categoryId: "sensor", summary: "华为官方产品页介绍的红外、毫米波与光感融合传感器，面向空间存在感知与场景联动。", protocolIds: [], platformIds: ["harmony-home"], capabilityIds: ["occupancy", "illuminance"], sourceIds: ["huawei-wholehome-cn", "huawei-ai-sensor-air"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "感知方式", value: "红外、毫米波、光感三感融合", sourceId: "huawei-ai-sensor-air" }, { name: "安装孔径", value: "支持标准 75 mm 孔径内嵌安装（需预埋件并提前预留开孔、布线）", sourceId: "huawei-ai-sensor-air" }, { name: "响应时延宣传值", value: "0.6 秒（华为实验室数据；实际受主机、网络、灯具和联动链路影响）", sourceId: "huawei-ai-sensor-air" }], limitations: ["当前官方产品介绍页未在本轮确认完整产品型号代码。", "感知效果受环境温度、遮挡、人体姿态、吊顶高度和家具遮挡影响。", "官方页面明确响应时延来自实验室，不能作为所有现场的保证值。"] },
  { id: "orvibo-w10", slug: "orvibo-curtain-motor-w10", name: "直流超静音窗帘电机", model: "W10", manufacturerId: "orvibo", brandId: "orvibo", categoryId: "curtain", summary: "欧瑞博官方安装参数页面列出 W10 电机及其额定参数。", protocolIds: ["wifi"], platformIds: [], capabilityIds: ["curtain-position"], sourceIds: ["orvibo-curtain-install"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "产品规格", value: "40 × 40 × 320 mm", sourceId: "orvibo-curtain-install" }, { name: "额定功率", value: "36 W", sourceId: "orvibo-curtain-install" }, { name: "额定输入", value: "100–240 V~，50/60 Hz", sourceId: "orvibo-curtain-install" }, { name: "额定电流", value: "1.3 A", sourceId: "orvibo-curtain-install" }, { name: "额定扭矩", value: "1.0 N·m", sourceId: "orvibo-curtain-install" }, { name: "额定转速", value: "118 rpm", sourceId: "orvibo-curtain-install" }, { name: "工作温度", value: "−0–50 °C（原文标注）", sourceId: "orvibo-curtain-install" }, { name: "无线频率", value: "Wi-Fi 2.4 GHz", sourceId: "orvibo-curtain-install" }, { name: "质保", value: "二年（官网页面标注）", sourceId: "orvibo-curtain-install" }], limitations: ["以上为厂商页面列示的理论参数，不代表本工作室实测。安装前需核对窗帘重量、轨道长度、供电、行程和控制方案。"] },
  { id: "orvibo-w13-w14", slug: "orvibo-curtain-track-w13-w14", name: "免测量可伸缩导轨", model: "W13 / W14", manufacturerId: "orvibo", brandId: "orvibo", categoryId: "accessory", summary: "欧瑞博官方安装参数页面列出的窗帘伸缩导轨。", protocolIds: [], platformIds: [], capabilityIds: [], sourceIds: ["orvibo-curtain-install"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "可调长度", value: "W13：1.7–3 m；W14：2.2–4 m", sourceId: "orvibo-curtain-install" }, { name: "负载", value: "20 kg，单边 10 kg", sourceId: "orvibo-curtain-install" }, { name: "轨道壁厚", value: "1.3 mm", sourceId: "orvibo-curtain-install" }, { name: "导轨宽度", value: "63.2 mm", sourceId: "orvibo-curtain-install" }], limitations: ["厂商页面理论参数；适配电机、安装跨度和窗帘类型需现场复核。"] },
  { id: "orvibo-mixpad-c", slug: "orvibo-mixpad-c", name: "MixPad C 超级智能开关", model: "MixPad C", manufacturerId: "orvibo", brandId: "orvibo", categoryId: "switch", summary: "欧瑞博官方参数页面列出的 MixPad C 超级智能开关。", protocolIds: ["wifi"], platformIds: [], capabilityIds: ["on-off", "scene"], sourceIds: ["orvibo-curtain-install"], evidenceLevel: "official", verificationStatus: "official-specification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "处理器", value: "四核心 ARM Cortex-A35", sourceId: "orvibo-curtain-install" }, { name: "显示屏", value: "4 英寸，480 × 480", sourceId: "orvibo-curtain-install" }, { name: "供电", value: "220 V 零火线供电", sourceId: "orvibo-curtain-install" }, { name: "无线", value: "Wi-Fi、蓝牙（页面未明确蓝牙版本）", sourceId: "orvibo-curtain-install" }], limitations: ["官网页面未列明无线协议版本、开放 API、Matter 认证及跨平台兼容情况；不得自行推断。"] },
  { id: "orvibo-s5", slug: "orvibo-smart-spotlight-s5", name: "智能射灯 S5", model: "S5", manufacturerId: "orvibo", brandId: "orvibo", categoryId: "lighting", summary: "欧瑞博官网产品中心仍列出的智能射灯产品；详情页公开光束角与调角范围，但页面注明参数为特定实验室理论值。", protocolIds: [], platformIds: [], capabilityIds: ["brightness"], sourceIds: ["orvibo-catalog-cn", "orvibo-s5"], evidenceLevel: "official", verificationStatus: "needs-model-verification", lastVerified: "2026-11-26", region: "CN", price: null, image: null, threeDAsset: null, specifications: [{ name: "光束角", value: "24° / 36°（官网产品介绍）", sourceId: "orvibo-s5" }, { name: "调角范围", value: "0°、5°、10°、15°、20°、25° 档位", sourceId: "orvibo-s5" }, { name: "调光技术", value: "官网宣传 Mix-Light 万分级调光技术；未提供本条目可核验的量化曲线", sourceId: "orvibo-s5" }], limitations: ["官网详情页版权页脚为 2014–2023，且声明数据为欧瑞博内部实验室特定环境下的理论值。", "产品中心当前仍列出 S5，但本轮未核实当前销售 SKU、光源规格、色温、显色、功率、调光协议、IES/LDT 文件或灯具版本。", "产品页中的图片和视频被厂商明确标注为示意，本站不复用其素材。"] }
];

export const products: Product[] = productModelSeeds.map((seed) => ({
  id: seed.id,
  slug: seed.slug,
  name: seed.name,
  manufacturerId: seed.manufacturerId,
  brandId: seed.brandId,
  categoryId: seed.categoryId,
  summary: seed.summary,
  modelIds: [seed.id + "-model"]
}));

export const deviceModels: DeviceModel[] = productModelSeeds.map((seed) => ({
  id: seed.id + "-model",
  productId: seed.id,
  modelCode: seed.model,
  hardwareRevision: null,
  protocolIds: seed.protocolIds,
  platformIds: seed.platformIds,
  capabilityIds: seed.capabilityIds,
  sourceIds: seed.sourceIds,
  evidenceLevel: seed.evidenceLevel,
  verificationStatus: seed.verificationStatus,
  lastVerified: seed.lastVerified,
  region: seed.region,
  price: seed.price,
  image: seed.image,
  threeDAsset: seed.threeDAsset,
  specifications: seed.specifications,
  limitations: seed.limitations
}));

export const knowledgeDomains = [
  { id: "products", title: "产品知识", english: "PRODUCT KNOWLEDGE", description: "品牌、制造商、型号、规格、来源、兼容与验证记录。", href: "/products/" },
  { id: "protocols", title: "协议与生态", english: "PROTOCOL & ECOSYSTEM", description: "Matter、Thread、Zigbee、KNX、Wi-Fi 与 BLE 的边界和互通。", href: "/protocols/" },
  { id: "platforms", title: "平台与集成", english: "PLATFORMS & INTEGRATIONS", description: "Apple Home、Google Home、Alexa、Home Assistant 与鸿蒙智家。", href: "/platforms/" },
  { id: "lighting", title: "灯光技术", english: "LIGHTING ENGINEERING", description: "光品质、照明参数、调光协议、光学与空间照明设计。", href: "/lighting/" },
  { id: "scenes", title: "场景与联动", english: "SCENES & AUTOMATION", description: "从空间需求到触发条件、执行动作、异常与手动接管。", href: "/scenes/" },
  { id: "engineering", title: "工程与资料", english: "ENGINEERING & DOCUMENTS", description: "布线、网络、供电、安装、调试、验收和交付规范。", href: "/engineering/" }
] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getSourceById(id: string) {
  return sources.find((source) => source.id === id);
}

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getDeviceModelsForProduct(productId: string) {
  return deviceModels.filter((model) => model.productId === productId);
}

export function getDeviceModelById(id: string) {
  return deviceModels.find((model) => model.id === id);
}

export function getManufacturerById(id: string) {
  return manufacturers.find((manufacturer) => manufacturer.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}
