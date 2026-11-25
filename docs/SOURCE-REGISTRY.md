# Source Registry — China-first Smart Home Knowledge Base

Last checked: 2026-11-26

This registry records sources to research. A source listing does not by itself prove that every product on the source is currently sold or that its images may be republished.

## Manufacturer and official product sources

| Publisher | Official source | Primary research use |
|---|---|---|
| Aqara / 绿米 | https://www.aqara.cn/cn/prodCenter | Mainland China products, hubs, switches, lighting, sensors, locks |
| Xiaomi / 米家 | https://www.mi.com/smart-screen/specs | Xiaomi 智能家庭屏 10 official product listing; model code and radio details remain unverified |
| Xiaomi 智能多模网关 2 | https://m.mi.com/crowdfunding/proddetail/1000468 | Official crowdfunding record lists Bluetooth, Bluetooth Mesh, Zigbee, dual-band Wi-Fi and Ethernet; campaign ended and current SKU availability is unverified |
| Xiaomi / 米家 | https://www.mi.com/shop | Current product names, store listings and official detail pages; brand / OEM manufacturer relationships still require SKU-level verification |
| Huawei 鸿蒙智家 | https://consumer.huawei.com/cn/wholehome/ | Smart hosts, panels, sensors, lighting and locks |
| ORVIBO 欧瑞博 | https://www.orvibo.com/cn/product/productList.html | MixPad, switches, lighting, curtain motors, sensors |
| LifeSmart 云起 | https://cn.ilifesmart.com/product/all_products/ | Product families and model codes |
| Yeelight 易来 | https://www.yeelight.com/zh_CN | Smart lighting official brand source; verify exact model pages before catalog admission |
| BroadLink 博联 | https://www.ibroadlink.com/ | Infrared/RF controllers and device-control products; verify exact current CN products |
| Tuya 涂鸦 | https://www.tuya.com/cn | IoT platform, SDK, modules and developer ecosystem; do not misclassify OEM products as Tuya-branded hardware |

## Model-level official pages researched in 1.0.0

| Product | Official page | Confirmed information |
|---|---|---|
| Aqara Hub M200 | https://www.aqara.cn/Hub-M200_support | PoE, Wi-Fi 6, WPA3, Matter controller, Thread Border Router, Zigbee/Thread child devices, Apple Home QR onboarding and feature differences |
| Aqara FP2 | https://www.aqara.cn/cn/Aqara_Presence_Detector_FP2_spec | RTCZCGQ12LM, Wi-Fi, Bluetooth 4.2, rated input and environment range |
| Aqara FP2 support | https://www.aqara.cn/cn/Aqara_Presence_Detector_FP2_support | Millimeter-wave interference zones, local automation gateway requirement and direction events |
| Aqara Door & Window Sensor T1 | https://www.aqara.cn/cn/d18_spec | MCCGQ12LM, Zigbee 3.0, CR1632, 22 mm maximum sensing gap |
| Aqara FP1E | https://www.aqara.cn/Aqara-AI-Presence-Detector-FP1E_spec | RTCZCGQ13LM, Zigbee and official power / environmental parameters |
| Aqara Motion Sensor P1 | https://www.aqara.cn/cn/Motion-Sensor-P1_spec | RTCGQ14LM, Zigbee 3.0, CR2450 and official dimensions |
| Aqara SDK supported device list | https://opendoc.aqara.cn/docs/SDK%E5%BC%80%E5%8F%91/Android%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/%E8%AE%BE%E5%A4%87%E9%85%8D%E7%BD%91/%E9%85%8D%E7%BD%91SDK%E6%94%AF%E6%8C%81%E8%AE%BE%E5%A4%87%E6%B8%85%E5%8D%95.html | Aqara SDK internal model identifiers; not retail SKU or generic Zigbee model IDs |
| Aqara Motion Sensor T1 | https://www.aqara.cn/d17_spec | RTCGQ12LM, Zigbee 3.0, CR2450, 7 m, 170° |
| Aqara Motion Sensor E1 | https://www.aqara.cn/Motion-Sensor-E1_spec.html | RTCGO15LM, Zigbee 3.0, CR2450, 7 m, 170° |
| Aqara Door & Window Sensor E1 | https://www.aqara.cn/cn/Door%20and%20Window%20Sensor%20E1_spec | MCCGQ14LM, Zigbee 3.0, CR1632, 22 mm gap |
| Aqara Door & Window Sensor P1 | https://www.aqara.cn/cn/aqara-door-and-windows-sensor-p1_spec | MCCGQ13LM, Zigbee 3.0, CR123A, dimensions and environment range |
| Aqara Door & Window Sensor P1 support | https://aqara.cn/cn/aqara-door-and-windows-sensor-p1_support | Installation gap profiles, Zigbee gateway requirement and alignment cautions |
| Aqara Temperature & Humidity Sensor T1 | https://www.aqara.cn/d20_spec | WSDCGQ12LM, temperature / humidity / pressure ranges and accuracy |
| Aqara Temperature & Humidity Sensor T1 support | https://www.aqara.cn/d20_support | Gateway pairing, reporting interval and environmental notes; temperature-range wording differs from spec page |
| Aqara Water Leak Sensor T1 | https://www.aqara.cn/d19_spec | SJCGQ12LM, Zigbee 3.0, CR2032 and environment range |
| Aqara Water Leak Sensor T1 support | https://www.aqara.cn/d19_support | IP68, 0.5 mm trigger level and conditional battery-life statement |
| Aqara Light Sensor T1 | https://www.aqara.cn/cn/d16_spec | GZCGQ11LM, Zigbee 3.0, 0–80000 lux and light-source-dependent accuracy |
| Aqara Vibration Sensor T1 | https://www.aqara.cn/d30_spec | DJT12LM, Zigbee, CR2032 and dimensions |
| Aqara Vibration Sensor T1 support | https://aqara.cn/cn/d30_support | App sensitivity adjustment and vibration / movement event behavior |
| ORVIBO S5 | https://global.orvibo.com/cn/product/s5.html | 24° / 36° beam angles and 0°–25° adjustment; historical detail page, theoretical lab data and illustrative imagery only |

## Open compatibility and engineering sources

| Source | URL | Research use |
|---|---|---|
| Zigbee2MQTT | https://www.zigbee2mqtt.io/supported-devices/ | Model-specific Zigbee support and exposed capabilities |
| zigbee-herdsman-converters | https://github.com/Koenkk/zigbee-herdsman-converters | Open converter definitions and release history |
| MIOT Home | https://home.miot-spec.com/ | Xiaomi ecosystem model/spec exploration; community evidence, not manufacturer proof |
| Blakadder | https://zigbee.blakadder.com/ | Zigbee device and platform compatibility cross-check |
| Home Assistant integrations | https://www.home-assistant.io/integrations/ | Official integration catalog and platform behavior |
| Home Assistant Core | https://github.com/home-assistant/core | Integration source and release history |
| ESPHome | https://esphome.io/ | Firmware/device capability and configuration documentation |
| Matter CSA | https://csa-iot.org/ | Matter standard and certification information |
| KNX Association | https://www.knx.org/ | KNX ecosystem and engineering references |
| DALI Alliance | https://www.dali-alliance.org/ | DALI-2/D4i standards and certified products |
| Hassbian / 瀚思彼岸 | https://bbs.hassbian.com/ | Chinese community field experience; secondary evidence only |

## Source handling rules

1. Prefer official manufacturer product pages, official manuals, official spec sheets and official support pages.
2. Use open-source device databases to corroborate exact model identifiers and capabilities, not to overwrite official product facts.
3. Record source URL, publisher, page title, access/check date and evidence level.
4. Distinguish official support, community support, reported support and tested support.
5. Respect robots.txt, rate limits, terms of use and access controls. Do not bypass login, paywalls, CAPTCHA, anti-bot systems or private APIs.
6. Reuse code and assets only when license/permission permits. Preserve license notices and attribution.
7. Product availability is region-specific. Mainland China availability must be independently verified; international store presence is not proof of CN availability.
8. Product and image currency must be checked before release and periodically thereafter.
