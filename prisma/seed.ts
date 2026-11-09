import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

type SeedDevice = {
  id: string;
  name: string;
  category: string;
  protocol: string;
  priceCents?: number;
  priceNote?: string;
  installCondition: string;
  selectionPoints: string[];
  tags: string[];
  description: string;
  sceneIds: string[];
};

const scenes = [
  { id: "scene-001", name: "回家模式", description: "回家自动亮灯、开空调、语音播报", sortOrder: 1 },
  { id: "scene-002", name: "离家安防", description: "离家布防，门锁、摄像头、传感器联动", sortOrder: 2 },
  { id: "scene-003", name: "影院模式", description: "灯光调暗、窗帘关闭、影音就绪", sortOrder: 3 },
  { id: "scene-004", name: "睡眠模式", description: "全屋熄灯、安防布防、夜灯微光", sortOrder: 4 },
  { id: "scene-005", name: "晨起模式", description: "窗帘渐开、灯光渐亮、背景音乐", sortOrder: 5 },
  { id: "scene-006", name: "会客模式", description: "客厅主灯全开、背景音乐、氛围灯", sortOrder: 6 },
  { id: "scene-007", name: "阅读模式", description: "台灯亮起、主灯调暗", sortOrder: 7 },
  { id: "scene-008", name: "晚餐模式", description: "餐厅重点照明、背景音乐", sortOrder: 8 },
  { id: "scene-009", name: "微光夜灯", description: "夜间微光照明、人来灯亮", sortOrder: 9 },
  { id: "scene-010", name: "节能模式", description: "无人自动关灯、关空调", sortOrder: 10 },
  { id: "scene-011", name: "雨天模式", description: "窗帘关闭、灯光调亮、新风开启", sortOrder: 11 },
  { id: "scene-012", name: "派对模式", description: "RGB 灯带律动、背景音乐", sortOrder: 12 },
];

const devices: SeedDevice[] = [
  { id: "dev-light-01", name: "智能吸顶灯", category: "灯光", protocol: "Zigbee", priceCents: 29900, priceNote: "约 ¥299", installCondition: "需预留火线/零线，明装或暗装底盒", selectionPoints: ["支持色温 2700K–6500K", "支持群组控制"], tags: ["灯光", "主灯", "色温可调"], description: "客厅/卧室主照明，支持无极调光", sceneIds: ["scene-001", "scene-005", "scene-006"] },
  { id: "dev-light-02", name: "智能筒灯", category: "灯光", protocol: "蓝牙Mesh", priceCents: 9900, priceNote: "约 ¥99", installCondition: "开孔 75mm，吊顶内需留检修空间", selectionPoints: ["深防眩", "单灯独立控制"], tags: ["灯光", "筒灯", "防眩"], description: "吊顶重点照明", sceneIds: ["scene-006", "scene-008"] },
  { id: "dev-light-03", name: "智能灯带", category: "灯光", protocol: "Zigbee", priceCents: 19900, priceNote: "约 ¥199", installCondition: "需预留低压电源，可贴装", selectionPoints: ["RGB 全彩", "支持音乐律动"], tags: ["灯光", "氛围", "RGB"], description: "柜体/背景墙氛围光", sceneIds: ["scene-003", "scene-012"] },
  { id: "dev-light-04", name: "智能灯泡", category: "灯光", protocol: "Wi-Fi", priceCents: 4900, priceNote: "约 ¥49", installCondition: "E27 标准灯座，即插即用", selectionPoints: ["入门首选", "APP 定时"], tags: ["灯光", "入门", "Wi-Fi"], description: "免网关单灯智能改造", sceneIds: ["scene-009"] },
  { id: "dev-light-05", name: "智能台灯", category: "灯光", protocol: "Wi-Fi", priceCents: 39900, priceNote: "约 ¥399", installCondition: "桌面摆放，需电源插座", selectionPoints: ["护眼无频闪", "阅读模式"], tags: ["灯光", "台灯", "护眼"], description: "书桌护眼照明", sceneIds: ["scene-007"] },
  { id: "dev-light-06", name: "智能落地灯", category: "灯光", protocol: "蓝牙Mesh", priceCents: 59900, priceNote: "约 ¥599", installCondition: "落地摆放，需电源插座", selectionPoints: ["氛围+主照双模", "色温亮度可调"], tags: ["灯光", "落地灯", "氛围"], description: "客厅角落氛围照明", sceneIds: ["scene-003", "scene-006"] },
  { id: "dev-light-07", name: "智能轨道灯", category: "灯光", protocol: "Zigbee", priceCents: 15900, priceNote: "约 ¥159", installCondition: "轨道安装，需预留轨道", selectionPoints: ["磁吸式安装", "多灯头联动"], tags: ["灯光", "轨道灯", "重点照明"], description: "画廊/餐边柜重点照明", sceneIds: ["scene-008"] },

  { id: "dev-sec-01", name: "智能门锁", category: "安防", protocol: "Zigbee", priceCents: 129900, priceNote: "约 ¥1299", installCondition: "适配标准防盗门，需核对锁体尺寸", selectionPoints: ["指纹/密码/APP 多方式", "离家自动上锁联动"], tags: ["安防", "门锁", "联动"], description: "入户门智能门锁", sceneIds: ["scene-001", "scene-002"] },
  { id: "dev-sec-02", name: "智能摄像头", category: "安防", protocol: "Wi-Fi", priceCents: 29900, priceNote: "约 ¥299", installCondition: "室内安装，需电源与 Wi-Fi", selectionPoints: ["人形侦测", "本地/云端存储"], tags: ["安防", "摄像头", "侦测"], description: "室内安防监控", sceneIds: ["scene-002"] },
  { id: "dev-sec-03", name: "门窗传感器", category: "安防", protocol: "Zigbee", priceCents: 9900, priceNote: "约 ¥99", installCondition: "贴装于门/窗框，纽扣电池", selectionPoints: ["开关状态监测", "离家布防联动"], tags: ["安防", "传感器", "门窗"], description: "门窗开合监测", sceneIds: ["scene-002"] },
  { id: "dev-sec-04", name: "人体传感器", category: "安防", protocol: "Zigbee", priceCents: 8900, priceNote: "约 ¥89", installCondition: "贴装或支架安装，纽扣电池", selectionPoints: ["移动侦测", "人来灯亮联动"], tags: ["安防", "传感器", "人体"], description: "人体移动侦测", sceneIds: ["scene-001", "scene-009"] },
  { id: "dev-sec-05", name: "烟雾报警器", category: "安防", protocol: "Zigbee", priceCents: 12900, priceNote: "约 ¥129", installCondition: "吸顶安装，电池供电", selectionPoints: ["烟雾浓度报警", "联动推送"], tags: ["安防", "报警", "烟雾"], description: "厨房/走廊烟雾监测", sceneIds: ["scene-002"] },
  { id: "dev-sec-06", name: "智能门铃", category: "安防", protocol: "Wi-Fi", priceCents: 59900, priceNote: "约 ¥599", installCondition: "门口安装，需电源或电池", selectionPoints: ["可视对讲", "门前侦测"], tags: ["安防", "门铃", "可视"], description: "门口可视门铃", sceneIds: ["scene-002"] },

  { id: "dev-env-01", name: "空调伴侣", category: "环境", protocol: "Wi-Fi", priceCents: 8900, priceNote: "约 ¥89", installCondition: "插座式，插在空调插座上", selectionPoints: ["红外控制空调", "定时与联动"], tags: ["环境", "空调", "红外"], description: "普通空调智能控制", sceneIds: ["scene-001", "scene-010"] },
  { id: "dev-env-02", name: "智能窗帘电机", category: "环境", protocol: "Zigbee", priceCents: 69900, priceNote: "约 ¥699", installCondition: "需预留窗帘盒与电源", selectionPoints: ["静音电机", "行程记忆"], tags: ["环境", "窗帘", "电动"], description: "电动窗帘控制", sceneIds: ["scene-003", "scene-005"] },
  { id: "dev-env-03", name: "温湿度传感器", category: "环境", protocol: "Zigbee", priceCents: 6900, priceNote: "约 ¥69", installCondition: "贴装，电池供电", selectionPoints: ["温湿度上报", "联动空调/加湿"], tags: ["环境", "传感器", "温湿度"], description: "室内温湿度监测", sceneIds: ["scene-010", "scene-011"] },
  { id: "dev-env-04", name: "空气净化器", category: "环境", protocol: "Wi-Fi", priceCents: 199900, priceNote: "约 ¥1999", installCondition: "落地摆放，需电源", selectionPoints: ["PM2.5 检测", "自动模式"], tags: ["环境", "净化", "空气"], description: "室内空气净化", sceneIds: ["scene-010"] },
  { id: "dev-env-05", name: "新风控制器", category: "环境", protocol: "RS485", priceCents: 89900, priceNote: "约 ¥899", installCondition: "需与新风主机接线", selectionPoints: ["联动新风主机", "定时换气"], tags: ["环境", "新风", "控制"], description: "新风系统联动控制", sceneIds: ["scene-010"] },

  { id: "dev-av-01", name: "智能音箱", category: "影音", protocol: "Wi-Fi", priceCents: 39900, priceNote: "约 ¥399", installCondition: "桌面摆放，需电源与 Wi-Fi", selectionPoints: ["语音控制", "多房间音乐"], tags: ["影音", "音箱", "语音"], description: "语音入口与背景音乐", sceneIds: ["scene-001", "scene-003"] },
  { id: "dev-av-02", name: "电视伴侣", category: "影音", protocol: "Wi-Fi", priceCents: 8900, priceNote: "约 ¥89", installCondition: "接电视 HDMI/红外", selectionPoints: ["红外控制电视", "场景联动"], tags: ["影音", "电视", "红外"], description: "电视智能控制", sceneIds: ["scene-003"] },
  { id: "dev-av-03", name: "背景音乐主机", category: "影音", protocol: "Wi-Fi", priceCents: 159900, priceNote: "约 ¥1599", installCondition: "吊顶内安装，需布音频线", selectionPoints: ["多分区播放", "定时音乐"], tags: ["影音", "背景音乐", "分区"], description: "全屋背景音乐", sceneIds: ["scene-006", "scene-008"] },

  { id: "dev-sen-01", name: "光照传感器", category: "传感", protocol: "Zigbee", priceCents: 7900, priceNote: "约 ¥79", installCondition: "贴装，电池供电", selectionPoints: ["照度上报", "联动灯光"], tags: ["传感", "光照", "照度"], description: "环境照度监测", sceneIds: ["scene-005", "scene-011"] },
  { id: "dev-sen-02", name: "水浸传感器", category: "传感", protocol: "Zigbee", priceCents: 8900, priceNote: "约 ¥89", installCondition: "放置于地面/台面，电池供电", selectionPoints: ["漏水报警", "联动阀门"], tags: ["传感", "水浸", "报警"], description: "漏水监测", sceneIds: ["scene-002"] },
  { id: "dev-sen-03", name: "燃气报警器", category: "传感", protocol: "Zigbee", priceCents: 14900, priceNote: "约 ¥149", installCondition: "吸顶/壁挂安装，需电源", selectionPoints: ["燃气泄漏报警", "联动排风"], tags: ["传感", "燃气", "报警"], description: "燃气泄漏监测", sceneIds: ["scene-002"] },

  { id: "dev-ctl-01", name: "智能开关面板", category: "控制", protocol: "Zigbee", priceCents: 15900, priceNote: "约 ¥159", installCondition: "86 底盒，需预留零线", selectionPoints: ["单/双/三键可选", "场景联动"], tags: ["控制", "开关", "面板"], description: "灯光/插座智能控制", sceneIds: ["scene-001", "scene-006"] },
  { id: "dev-ctl-02", name: "场景开关", category: "控制", protocol: "Zigbee", priceCents: 19900, priceNote: "约 ¥199", installCondition: "86 底盒，需预留零线", selectionPoints: ["一键触发场景", "多场景切换"], tags: ["控制", "场景", "面板"], description: "一键场景触发", sceneIds: ["scene-001", "scene-002", "scene-003"] },
  { id: "dev-ctl-03", name: "智能网关", category: "控制", protocol: "Wi-Fi", priceCents: 29900, priceNote: "约 ¥299", installCondition: "桌面/壁挂，需电源与网线/Wi-Fi", selectionPoints: ["Zigbee/蓝牙汇聚", "本地联动中枢"], tags: ["控制", "网关", "中枢"], description: "设备汇聚与本地联动", sceneIds: ["scene-001"] },
  { id: "dev-ctl-04", name: "中控屏", category: "控制", protocol: "Wi-Fi", priceCents: 129900, priceNote: "约 ¥1299", installCondition: "壁挂安装，需电源", selectionPoints: ["全屋设备总览", "场景面板"], tags: ["控制", "中控屏", "总览"], description: "全屋控制中枢", sceneIds: ["scene-001", "scene-006"] },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const db = new PrismaClient({ adapter });

  for (const scene of scenes) {
    await db.scene.upsert({ where: { id: scene.id }, update: scene, create: scene });
  }

  for (const device of devices) {
    const { sceneIds, ...data } = device;
    await db.device.upsert({
      where: { id: device.id },
      update: { ...data, scenes: { set: sceneIds.map((id) => ({ id })) } },
      create: { ...data, scenes: { connect: sceneIds.map((id) => ({ id })) } },
    });
  }

  const [deviceCount, sceneCount] = await Promise.all([db.device.count(), db.scene.count()]);
  console.log(`seeded: ${deviceCount} devices, ${sceneCount} scenes`);
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
