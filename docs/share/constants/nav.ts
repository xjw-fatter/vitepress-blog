import { NavData } from "../types/index.type";

const AI_NAV: NavData =
{
    title: "AI 导航",
    items: [
        {
            icon: "https://openai.com/favicon.ico",
            title: "ChatGPT | OpenAI",
            link: "https://openai.com/",
        },
        {
            icon: "https://www.notion.so/images/logo-ios.png",
            title: "Notion AI（笔记）",
            link: "https://www.notion.so",
        },
        {
            icon: "https://www.midjourney.com/apple-touch-icon.png",
            title: "Midjourney（绘画）",
            link: "https://www.midjourney.com",
        },
        {
            icon: "https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png",
            title: "Beautiful.ai（PPT）",
            link: "https://www.beautiful.ai",
        },
        {
            icon: "https://ai.ashuiai.com/favicon.ico",
            title: "阿水AI",
            link: "https://ai.ashuiai.com/home",
        },
        {
            icon: "https://v0.dev/assets/icon-dark-32x32.png",
            title: "v0",
            link: "https://v0.dev/chat",
        },
        {
            icon: "https://feizhuke.com/zhufav.png",
            title: "非猪",
            link: "https://feizhuke.com/",
        },
        {
            icon: "https://statics.moonshot.cn/kimi-chat/favicon.ico",
            title: "kimi",
            link: "https://kimi.moonshot.cn/",
        },
        {
            icon: "https://nlp-eb.cdn.bcebos.com/logo/favicon.ico",
            title: "文心一言",
            link: "https://yiyan.baidu.com/",
        },
        {
            icon: "https://cdn-bot.hunyuan.tencent.com/logo.png",
            title: "腾讯元宝",
            link: "https://yuanbao.tencent.com",
        },
        {
            icon: "https://cdn-bot.hunyuan.tencent.com/logo.png",
            title: "百度AI助手",
            link: "https://chat.baidu.com",
        },
        {
            icon: "https://taichu-web.ia.ac.cn/favicon.ico",
            title: "紫东太初",
            link: "https://taichu-web.ia.ac.cn",
        },
        {
            icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png",
            title: "豆包",
            link: "https://www.doubao.com/chat/",
        },
    ],
};

const FILM_NAV: NavData = {
    title: "视频",
    items: [
        {
            icon: "https://v.qq.com/favicon.ico",
            title: "腾讯视频",
            desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
            link: "https://v.qq.com",
        },
        {
            icon: "https://static.hdslb.com/mobile/img/512.png",
            title: "哔哩哔哩",
            desc: '哔哩哔哩（bilibili.com)是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。',
            link: "https://www.bilibili.com",
        },
        {
            icon: "https://www.mxyyw.vip/template/conch/asset/img/favicon.png",
            title: "梦想影院",
            desc: '每日更新最新电影、综艺、电视剧、动漫、美剧等影视！',
            link: "https://www.mxyyw.vip/",
        },

    ],
};

const GAME_NAV: NavData = {
    title: "游戏",
    items: [
        {
            icon: "https://cdn.jx3box.com/static/index/favicon.ico",
            title: "JX3BOX",
            desc: '剑网3 » 魔盒（JX3BOX） - 一站式剑网3资源工具站',
            link: "https://www.jx3box.com/index/",
        },
    ],
}

export const NAV_DATA: NavData[] = [
    AI_NAV,
    FILM_NAV,
    GAME_NAV,
];
