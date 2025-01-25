<template>
  <div class="ip-view">
    <p>您的本机IP地址:{{ userIpAddress || '-' }}</p>
    <p>来自:{{ userLocation || '-'}}</p>
    <p>操作系统:{{ operatingSystem || '-'}}</p>
    <p>浏览器:{{ browserInfo || '-'}}</p>
  </div>
</template>

<script setup lang="ts" name="IpView">
import { ref, onMounted } from "vue";
import Bowser from "bowser";

const userIpAddress = ref("");
const userLocation = ref("");
const operatingSystem = ref("");
const browserInfo = ref("");
// https://www.ip.cn/api/index?ip&type=0
// https://2024.ipchaxun.com/
// https://searchplugin.csdn.net/api/v1/ip/get
// https://ip.useragentinfo.com/json
// https://ipinfo.io/json
// 获取IP地址
const fetchUserIpAddress = async () => {
  try {
    const response = await fetch("https://ip.useragentinfo.com/json");
    const data = await response.json();
    userIpAddress.value = data.ip;
		userLocation.value = `${data.country}.${data.province}.${data.city} ${data.isp}`;
  } catch (error) {
    console.error("获取IP地址失败:", error);
  }
};
// 获取操作系统信息
const fetchOperatingSystem = () => {
  const parser = Bowser.getParser(window.navigator.userAgent);
  operatingSystem.value = parser.getOSName();
};

// 获取浏览器信息
const fetchBrowserInfo = () => {
  const parser = Bowser.getParser(window.navigator.userAgent);
  const browser = parser.getBrowser();
  browserInfo.value = `${browser.name}/${browser.version}`;
};

onMounted(() => {
  fetchUserIpAddress();
  fetchOperatingSystem();
  fetchBrowserInfo();
});
</script>

<style scoped>
.ip-view {
	display: flex;
	width: fit-content;
	padding: 0 8px;
	margin: 8px auto 0;
}

.ip-view p {
  font-size: 12px;
	line-height: 16px;
  color: #666;
	margin-right: 4px;
}
.ip-view p:last-child{
	margin-right: 0;
}
</style>