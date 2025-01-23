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

// 获取IP地址
const fetchUserIpAddress = async () => {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    userIpAddress.value = data.ip;
    await fetchUserLocation(data);
  } catch (error) {
    console.error("获取IP地址失败:", error);
  }
};

// 获取地理位置
const fetchUserLocation = async (data) => {
  try {

    userLocation.value = `${data.city}.${data.region}.${data.country}`;
  } catch (error) {
    console.error("获取地理位置失败:", error);
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
	margin: 24px auto;
}

.ip-view p {
  font-size: 12px;
  color: #666;
	margin-right: 4px;
}
</style>