function page404() {
	location.href="/error/404";
}

// 加载页面
function loadPage(id, path) {
	$("#"+id).load(path);
}

// 随机数
function getRandom(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

// 获取URL请求参数
function getUserParamByName(key) {
	var url = window.location.search;
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var result = url.substr(1).match(reg);
	return result ? decodeURIComponent(result[2]) : "";
}

//添加cookie
var addCookie = function (name, value, time) {
	var strSec = getSec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strSec * 1);
	//设置cookie的名称、值、失效时间
	document.cookie = name + "=" + value + ";expires="+ exp.toGMTString();
}

//获取cookie
var getCookie = function (name) {
	//获取当前所有cookie
	var strCookies = document.cookie;
	//截取变成cookie数组
	var array = strCookies.split(';');
	//循环每个cookie
	for (var i = 0; i < array.length; i++) {
			//将cookie截取成两部分
			var item = array[i].split("=");
			//判断cookie的name 是否相等
			if (item[0].trim() == name) {
					return item[1];
			}
	}
	return null;
}

function getRandomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}

var subStr = function (str, subLen, defaultStr) {
	if (str == null || str == undefined || str.trim().length == 0) {
			return defaultStr;
	}
	var len = str.length;
	if (len > subLen) {
			return str.substring(0, subLen)+"...";
	}
	return str;
}

function getResourceUrl(type, id) {
	var host = "https://www.coderutil.com";
	if (type == 'ARTICLE') {
			return host+"/article?id="+id;
	}
	if (type == 'SUBJECT') {
			return host+"/portal/subject?sid="+id;
	}
	if (type == 'BBS') {
			return host+"/bbs/detail?id="+id;
	}
	if (type == 'BOOK') {
			return host+"/books";
	}
	if (type == 'KUZHAN') {
			return host+"/portal/kzDetail?id="+id;
	}
	if (type == 'RESOURCE') {
			return host+"/resource/view?resid="+id;
	}
	if (type == 'CODELINK') {
			return host+"/codelink/code?id="+id;
	}
	if (type == 'CTC_QUESTION') {
			return host+"/star/qa/"+id;
	}
	if (type == 'CTC_EXPERIENCE') {
			return host+"/star/exp/"+id;
	}
	if (type == 'CTC_VIDEO') {
			return host+"/star/video/"+id;
	}
	return host+"/";
}

/***
* 获取用户配置的系统颜色
* @returns {string}
*/
var getSystemColor = function () {
	var systemColor = getCookie("C_U_SYSTEM_COLOR");
	if (systemColor == undefined || systemColor == '' || systemColor == null) {
			return "#007aff";
	}
	return systemColor;
}

//删除cookie
var delCookie = function (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	//获取cookie是否存在
	var value = getCookie(name);
	if (value != null) {
			document.cookie = name + "=" + value + ";expires="+ exp.toUTCString();
	}
}

//获取时间的秒数（参数：d，h,m,s） 12m
var getSec = function(str){
	var str1 = str.substr(0, str.length - 1);  //时间数值
	var str2 = str.substr(str.length-1, 1);    //时间单位
	if (str2 == "s") {
			return str1 * 1000;
	}
	else if (str2 == "m") {
			return str1 * 60 * 1000;
	}
	else if (str2 == "h") {
			return str1 * 60 * 60 * 1000;
	}
	else if (str2 == "d") {
			return str1 * 24 * 60 * 60 * 1000;
	}
}

function showGuideImg() {
	$("#guide_imgs").show();
	closeWindowsScroll();
}

function hideGuideImg() {
	$("#guide_imgs").hide();
	startWindowsScroll();
}

// 关闭浏览器滚动
function closeWindowsScroll() {
	$("html").css("overflow", "hidden");
	$("body").css("overflow", "hidden");
	$("html").css("height", "100%");
	$("body").css("height", "100%");
}

// 开启浏览器滚动
function startWindowsScroll() {
	$("html").css("overflow", "visible");
	$("body").css("overflow", "visible");
	$("html").css("height", "auto");
	$("body").css("height", "auto");
}

// 引导页事件
$('.guide_imgs li').click(function () {
	if($(this).hasClass('close')) {
			$(this).parent().remove();
	} else {
			$(this).remove();
	}
});

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
			this.splice(index, 1);
	}
};

Array.prototype.contain = function(val) {
	var index = this.indexOf(val);
	return index > -1;
};

Array.prototype.clear = function() {
	this.length=0;
};

Array.prototype.add = function(val) {
	this.unshift(val);
};

//简单的哈希表,begin
function HashMap() {
	/** Map 大小 * */
	var size = 0;
	/** 对象 * */
	var entry = new Object();

	/** 存 * */
	this.put = function(key, value) {
			if (!this.containsKey(key)) {
					size++;
			}
			entry[key] = value;
	}

	/** 取 * */
	this.get = function(key) {
			return this.containsKey(key) ? entry[key] : "";
	}

	/** 删除 * */
	this.remove = function(key) {
			if (this.containsKey(key) && (delete entry[key])) {
					size--;
			}
	}

	/** 是否包含 Key * */
	this.containsKey = function(key) {
			return (key in entry);
	}

	/** 是否包含 Value * */
	this.containsValue = function(value) {
			for ( var prop in entry) {
					if (entry[prop] == value) {
							return true;
					}
			}
			return false;
	}

	/** 所有 Value * */
	this.values = function() {
			var values = new Array();
			for ( var prop in entry) {
					values.push(entry[prop]);
			}
			return values;
	}

	/** 所有 Key * */
	this.keys = function() {
			var keys = new Array();
			for ( var prop in entry) {
					keys.push(prop);
			}
			return keys;
	}

	/** Map Size * */
	this.size = function() {
			return size;
	}

	/* 清空 */
	this.clear = function() {
			size = 0;
			entry = new Object();
	}
}

function randomTag(value) {
	var random = getRandom(0, 10);
	var mod = random % 7;
	if (mod == 0) {
			return "<span class=\"layui-badge\">"+value+"</span>"
	} else if (mod == 1) {
			return "<span class=\"layui-badge layui-bg-orange\">"+value+"</span>"
	} else if (mod == 2) {
			return "<span class=\"layui-badge layui-bg-green\">"+value+"</span>"
	} else if (mod == 3) {
			return "<span class=\"layui-badge layui-bg-cyan\">"+value+"</span>"
	} else if (mod == 4) {
			return "<span class=\"layui-badge layui-bg-blue\">"+value+"</span>"
	} else if (mod == 5) {
			return "<span class=\"layui-badge layui-bg-black\">"+value+"</span>"
	} else if (mod == 6) {
			return "<span class=\"layui-badge layui-bg-gray\">"+value+"</span>"
	}
	return "";
}

function randomTagAndUrl(value, url, isSelf) {
	var tag = randomTag(value);
	var target = isSelf ? "_self" : "_blank";
	return "<a href='"+url+"' target='"+target+"'>"+tag+"</a>"
}

function date2time(date) {
	var f = date.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null
	)).getTime();
}

function loadDateInfo() {
	var arr = ['日','一','二','三','四','五','六',]
	var date = new Date();//记住这个是大写开头的Date
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var dates = date.getDate();
	var day = date.getDay();
	var days = arr[day];
	return year+'&nbsp;年&nbsp;'+month+'&nbsp;月&nbsp;'+dates+'&nbsp;日&nbsp;&nbsp;'+'星期'+days;
}

function formatMsgTime(timespan){
	var dateTime = new Date(timespan);
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hour = dateTime.getHours();
	var minute = dateTime.getMinutes();
	var nowDate = new Date();
	var now_new = new Date().getTime()
	var milliseconds = 0;
	var timeSpanStr;
	milliseconds = now_new - timespan;
	if (milliseconds <= 1000 * 60 * 1) {
			timeSpanStr = '刚刚';
	}
	else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
			timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	}
	else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	}
	else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	}
	else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == nowDate.getFullYear()) {
			timeSpanStr = day + ' / ' + month + '月';
	} else {
			timeSpanStr = year + ' / ' + month + ' / ' + day;
	}
	return timeSpanStr;
};


// 生成海报图
function createHaibaoPic(title, summary, image, qrcodeUrl) {
	title = title.replaceAll("#", "").replaceAll("?", "").replaceAll("&", "");
	summary = summary.replaceAll("#", "").replaceAll("?", "").replaceAll("&", "");
	var imageUrl = "/api/poster/web?img="+image+"&title="+title+"&summary="+summary+"&name=程序员盒子&url=coderutil.com&slogan=助力编程提效&qrUrl="+qrcodeUrl;
	layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			skin: 'yourclass',
			content: '<div style=\"width: 350px; height: 600px; background-color: white; padding: 20px;\"> ' +
					'<p style="line-height: 50px; text-align: left; font-size: 13px; color: black">分享海报 / 右键图片保存或复制</p> ' +
					'<img src="http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_d6b291229e1d4ef3ba77d97d596a0427.gif" style="position: absolute; left: 160px; top: 270px; width: 60px; z-index: 0"> ' +
					'<img alt="嗷嗷~ 程序员盒子 | 分享海报生成异常" style="position: absolute; left: 20px; top: 70px; width: 350px; background-color: white" src=\''+imageUrl+'\' alt="图片XX">' +
					'<p style="position: absolute; bottom: 50px; left: 60px; line-height: 40px; font-size: 12px; color: #666">海报图由程序员盒子旗下<a href="https://www.coderutil.com/cuapi/1000" target="_blank" style="color: dodgerblue">开放API平台</a>提供技术支持</p></div>'
	});
}

function createCodeLinkHaibaoPic(title, summary, image, qrcodeUrl) {
	title = title.replaceAll("#", "").replaceAll("?", "").replaceAll("&", "");
	summary = summary.replaceAll("#", "").replaceAll("?", "").replaceAll("&", "");
	var imageUrl = "/api/poster/web?img="+image+"&title="+title+"&summary="+summary+"&name=程序员盒子&url=coderutil.com&slogan=助力编程提效&qrUrl="+qrcodeUrl;
	layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			skin: 'yourclass',
			content: '<div style=\"width: 390px; height: 600px; background-color: white; padding: 20px;\"> ' +
					'<p style="line-height: 50px; text-align: left; font-size: 13px; color: black">分享海报 / 右键图片保存或复制</p> ' +
					'<img src="http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_d6b291229e1d4ef3ba77d97d596a0427.gif" style="position: absolute; left: 160px; top: 270px; width: 60px; z-index: 0"> ' +
					'<img alt="嗷嗷~ 程序员盒子 | 分享海报生成异常" style="position: absolute; left: 20px; top: 70px; width: 350px; background-color: white" src=\''+imageUrl+'\' alt="图片XX">' +
					'<p style="position: absolute; bottom: 50px; left: 60px; line-height: 40px; font-size: 12px; color: #666">海报图由程序员盒子旗下<a href="https://www.coderutil.com/cuapi/1000" target="_blank" style="color: dodgerblue">开放API平台</a>提供技术支持</p></div>'
	});
}

// 生成海报图
function shareCoderUtil() {
	layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			skin: 'yourclass',
			content: '<div style=\"width: 350px; height: 620px; background-color: white;\"> ' +
					'<img alt="嗷嗷~ 程序员盒子 | 分享海报生成异常" style="position: absolute; left: 0px; top: 0px; width: 350px; background-color: white" src=\'http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_78385431f32c4a1096e9d7516dfa6569.png\'></div>'
	});
}

function qrPopUp(title, img) {
	layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			skin: 'yourclass',
			content: '<div style=\"width: 350px; height: 350px; background-color: white\"> <p style=\"line-height: 60px; text-align: center\">'+title+'</p> ' +
					'<img src=\"'+img+'\" style=\"margin-top: 10px; margin-left: 75px; width: 200px;\" alt=\"稍等，移动二维码生成中……\"> ' +
					'<p style=\"line-height: 50px; text-align: center; color: darkgray; font-size: 12px;\">程序员盒子，助力学习编程提效</p> </div>'
	});
}

function qrPopUp(title, img) {
	layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			skin: 'yourclass',
			content: '<div style=\"width: 350px; height: 350px; background-color: white\"> <p style=\"line-height: 60px; text-align: center\">'+title+'</p> ' +
					'<img src=\"'+img+'\" style=\"margin-top: 10px; margin-left: 75px; width: 200px;\" alt=\"稍等，移动二维码生成中……\"> ' +
					'<p style=\"line-height: 50px; text-align: center; color: darkgray; font-size: 12px;\">程序员盒子，助力学习编程提效</p> </div>'
	});
}

// 打赏
function rewardResource(rtype, rid) {
	if (userId == '') {
			login();
			return;
	}
	layer.open({
			type: 2,
			title: '喜欢这个资源，打赏鼓励一下作者！',
			shadeClose: true,
			resize: false,
			shade: 0.6,
			maxmin: false, //开启最大化最小化按钮
			area: ['500px', '500px'],
			content: '/plug/reward-plug?rtype='+rtype+'&rid='+rid
	});
}

function rewardIntegralResource(rtype, rid) {
	if (userId == '') {
			login();
			return;
	}
	layer.open({
			type: 2,
			title: '喜欢这个内容，补充元气鼓励一下作者！',
			shadeClose: true,
			resize: false,
			shade: 0.6,
			maxmin: false, //开启最大化最小化按钮
			area: ['460px', '700px'],
			content: '/plug/reward-integral-plug?rtype='+rtype+'&rid='+rid
	});
}

// 积分充值
function popIntegralPackageRecharge() {
	layer.open({
			type: 2,
			title: '积分充值',
			closeBtn: 1,
			shadeClose: true,
			resize: false,
			shade: 0.5,
			maxmin: false,
			area: ['460px', '750px'],
			content: '/plug/buyIntegral'
	});
}

function decodeQR() {
	layer.open({
			type: 2,
			title: '二维码解码器',
			closeBtn: 1,
			shadeClose: true,
			resize: false,
			shade: 0.5,
			maxmin: false,
			area: ['800px', '400px'],
			content: '/plug/decode-qr'
	});
}

// 联系我们
function showMasterWeixin() {
	layer.open({
			type: 1,
			title: false,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			area: ['700px', '446px'],
			shadeClose: true, //开启遮罩关闭
			content: '<div class=\"login-module-header-div\">' +
					'<p class=\"login-module-title\">联系方式</p>' +
					'<p class=\"login-module-desc\" style=\"font-family: \'Times New Roman\'\">扫描下方微信二维码，添加好友</p>' +
					'</div>' +
					'<div class=\"login-module-core-div\" style="margin-top: 10px">' +
					'<img src=\"http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_7ebbea1680184ad39bbccdd8f3ccc901.png\" style=\"height: 230px; margin-left: 80px; margin-right: 40px;\">' +
					'<img src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/static/fankuiqun.png\" style=\"height: 230px; \">' +
					'<span style="position: absolute; bottom: -20px; left: 200px;">网站作者个人微信</span>' +
					'<span style="position: absolute; bottom: -20px; left: 420px;">技术交流与问题反馈群</span>' +
					'</div>'
	});
}

// 联系我们
function masterWeixin() {
	layer.open({
			type: 1,
			title: false,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			area: ['450px', '450px'],
			shadeClose: true, //开启遮罩关闭
			content: '<div class=\"login-module-header-div\">' +
					'<p class=\"login-module-title\">联系方式</p>' +
					'<p class=\"login-module-desc\" style=\"font-family: \'Times New Roman\'\">扫描下方微信二维码，添加好友</p>' +
					'</div>' +
					'<div class=\"login-module-core-div\" style="margin-top: 10px">' +
					'<img' +
					' src=\"http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_21c4a2707c9f46999599a52ec05a8379.png\"' +
					' style=\"height: 230px; margin-left: 60px; margin-right: 40px;\">' +
					'</div>'
	});
}
function showCode(title, code) {
	layer.open({
			type: 1,
			title: false,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			area: ['450px', '450px'],
			shadeClose: true, //开启遮罩关闭
			content: '<div class=\"login-module-header-div\">' +
					'<p class=\"login-module-title\">'+title+'</p>' +
					'</div>' +
					'<div class=\"login-module-core-div\" style="margin-top: 10px">' +
					'<img' +
					' src=\"'+code+'\"' +
					' style=\"height: 230px; margin-left: 60px; margin-right: 40px;\">' +
					'</div>'
	});
}
function popupCode(code, title, desc, footer) {
	layer.open({
			type: 1,
			title: false,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			area: ['450px', '450px'],
			shadeClose: true, //开启遮罩关闭
			content: '<div class=\"login-module-header-div\">' +
					'<p class=\"login-module-title\">'+title+'</p>' +
					'<p class=\"login-module-desc\" style=\"font-family: \'Times New Roman\'\">'+desc+'</p>' +
					'</div>' +
					'<div class=\"login-module-core-div\" style="margin-top: 10px">' +
					'<img' +
					' src=\"'+code+'\"' +
					' style=\"height: 230px; margin-left: 60px; margin-right: 40px;\">' +
					'<span style="position: absolute; bottom: -20px; left: 180px;">'+footer+'</span>' +
					'</div>'
	});
}

function contentMatrix() {
	layer.open({
			type: 1,
			title: false,
			skin: 'layui-layer-demo', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 2,
			area: ['780px', '420px'],
			shadeClose: true, //开启遮罩关闭
			content: '<div class=\"login-module-header-div\">' +
					'<p class=\"login-module-title\">内容矩阵号，互联互通！</p>' +
					'<p class=\"login-module-desc\" style=\"font-family: \'Times New Roman\'\">可以通过微信扫码下方维码，联系到网站作者<b' +
					' style="color: orange"> @程序员七七</b></p>' +
					'</div>' +
					'<div class=\"login-module-core-div\" style="margin-top: 30px">' +
					'<img' +
					' src=\"http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_7ebbea1680184ad39bbccdd8f3ccc901.png\"' +
					' style=\"height: 135px; margin-left: 0px;\">' +
					'<span style="position: absolute; bottom: -40px; left: 70px; font-weight: bold">作者个人微信号</span>' +
					'<img' +
					' src=\"http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_e7ffa9bd7dde4e96ac5cc3e29f5c0cc0.png\"' +
					' style=\"height: 135px; margin-left: 35px;\">' +
					'<span style="position: absolute; bottom: -40px; left: 240px; font-weight: bold">官方抖音视频号</span>' +
					'<img' +
					' src=\"http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_50595f8ee1cf4108b0b674a33ee66792.jpg\"' +
					' style=\"height: 135px; margin-left: 35px;\">' +
					'<span style="position: absolute; bottom: -40px; left: 400px; font-weight: bold">官方技术公众号</span>' +
					'<img' +
					' src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_df1826837bd342b990556522be9db0b3.jpg\"' +
					' style=\"height: 135px; margin-left: 35px;\">' +
					'<span style="position: absolute; bottom: -40px; left: 580px; font-weight: bold">Art ai 小程序</span>' +
					'</div>'
	});
}

function goTop() {
	$('html,body').animate({scrollTop: '0px'}, 500);
}

function previewBigImage(src) {
	layer.photos({
			photos: {"start": 0, "data": eval("[{\"src\":\""+src+"\"}]")}
			,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
			,shade: [0.6, '#000']
			,success: function() {
					//以鼠标位置为中心的图片滚动放大缩小
					$(document).on("mousewheel",".layui-layer-photos",function(ev){
							var oImg = this;
							var ev = event || window.event;//返回WheelEvent
							//ev.preventDefault();
							var delta = ev.detail ? ev.detail > 0 : ev.wheelDelta < 0;
							var ratioL = (ev.clientX - oImg.offsetLeft) / oImg.offsetWidth,
									ratioT = (ev.clientY - oImg.offsetTop) / oImg.offsetHeight,
									ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
									w = parseInt(oImg.offsetWidth * ratioDelta),
									h = parseInt(oImg.offsetHeight * ratioDelta),
									l = Math.round(ev.clientX - (w * ratioL)),
									t = Math.round(ev.clientY - (h * ratioT));
							$(".layui-layer-photos").css({
									width: w, height: h
									,left: l, top: t
							});
							$("#layui-layer-photos").css({width: w, height: h});
							$("#layui-layer-photos>img").css({width: w, height: h});
					});
			}
			,end: function(){ //销毁回调

			}
	});
}

function emoji2img(content) {
	if (content == '' || content == null) {
			return content;
	}
	if (content.toString().indexOf("[/") == -1) {
			return content;
	}
	return content.toString().replaceAll("[/睁大眼]", "<img class=\"cu-emoji\"" +
			" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/zhengdayan.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/心动]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/xindong.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/问号]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/wenhao.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/头秃]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/toutu.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/听歌]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/tingge.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/叹气]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/tanqi.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/送口罩]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/songkouzhao.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/思考]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/sikao.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/帅气]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/shuaiqi.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/让我看看]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/rangwokankan.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/OK]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/ok.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/摸鱼]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/moyu.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/抹泪]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/molei.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/裂开]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/liekai.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/冷眼]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/lengyan.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/辣眼睛]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/lanyanjing.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/抠鼻子]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/koubizi.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/看看]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/kankan.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/敬礼]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/jingli.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/加油]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/jiayou.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/奸笑]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/jianxiao.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/花痴]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/huachi.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/呵呵哒]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/heheda.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/搞怪]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/gaoguai.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/尴尬]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/ganga.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/大笑]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/daxiao.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/愁]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/chou.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/抱拳]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/baoquan.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/拜托]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/baituo.gif?x-oss-process=image/resize,w_60\">")
			.replaceAll("[/666]", "<img class=\"cu-emoji\" src=\"https://coderutil.oss-cn-beijing.aliyuncs.com/emoji/666.gif?x-oss-process=image/resize,w_60\">");
}

//UrlEncode函数
function UrlEncode(str){
	str = (str + '').toString();
	return encodeURIComponent(str)
			.replace(/!/g, '%21')
			.replace(/'/g, '%27')
			.replace(/\(/g, '%28')
			.replace(/\)/g, '%29')
			.replace(/\*/g, '%2A')
			.replace(/%20/g, '+');
}

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

function htmlCode(txt) {
	if (txt == null || txt == '') {
			return txt;
	}
	txt = txt.replaceAll(/\r\n/g,"<br>")
	txt = txt.replaceAll(/\n/g,"<br>");
	txt = txt.replaceAll(/\'/g,"&#39;");
	txt = txt.replaceAll(/\"/g,"&quot;");
	return txt;
}

function htmlEnCode(txt) {
	if (txt == null || txt == '') {
			return txt;
	}
	txt = txt.replaceAll("\\\"", "\"");
	txt = txt.replaceAll("&#39;", "\'");
	txt = txt.replaceAll("&quot;", "\"");
	return txt;
}


function codeContentEnCode(str) {
	if (str == null || str == '') {return str;}
	str = str.replaceAll(/\r\n/g,"<br>")
	str = str.replaceAll(/\n/g,"<br>");
	str = str.replaceAll(/\'/g,"&#39;");
	str = str.replaceAll(/\"/g,"&quot;");
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	return str;
}

function messContentEnCode(str) {
	if (str == null || str == '') {return str;}
	str = str.replaceAll(/\r\n/g,"<br>")
	str = str.replaceAll(/\n/g,"<br>");
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replaceAll("&lt;br&gt;","<br>")
	return str;
}

function messContentEnCode(str) {
	if (str == null || str == '') {return str;}
	str = str.replaceAll(/\r\n/g,"<br>")
	str = str.replaceAll(/\n/g,"<br>");
	str = str.replaceAll(/\'/g,"&#39;");
	str = str.replaceAll(/\"/g,"&quot;");
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replaceAll("&lt;br&gt;","<br>")
	return str;
}

function codeContentDeCode(str) {
	if (str == null || str == '') {return str;}
	str = str.replaceAll("\\\"", "\"");
	str = str.replace(/&amp;/g,"&");
	str = str.replaceAll("&#39;", "\'");
	str = str.replaceAll("&quot;", "\"");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/<br\s*\/?>/g, "\n");
	return str;
}

function deleteHtmlTag(content) {
	if (content == null || content == undefined || content == '') {
			return '';
	}
	return content.replace(/<\/?.+?>/g, '').replace(/ /g, '');
}

/***
* 查询资源类型对应icon，根据扩展名查询：jpg、pdf
* @param extName
*/
function getResourceIconByExtName(extName, width, height) {
	if (extName == 'pdf') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_9a04b8428f82408f9fac43bd9362013a.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'mp4') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_1af8955cb65b45098aa3e2a643572c7f.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'mp3') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_aaece22696334c8b86ac864de1cbcc01.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'jpg' || extName == 'png' || extName == 'gif' || extName == 'jpeg') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_4ca26d80f7ee4a60a3319802e71945b9.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'doc' || extName == 'docx') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_a0fc6b037b324b2786de6571c8a77c60.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'xls' || extName == 'csv') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_a106fe3a9ff647c2a924417aa2999bd6.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'ppt' || extName == 'pptx' || extName == 'pps') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_7d90ac31be6a4ae3b5f6153b3a426510.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if ( extName == 'rar'|| extName == 'zip' || extName == 'jar' || extName == 'aex') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_ba600ddd80c74e188cff9af33de03c5c.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'cloud') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_540f08b339464fe19d55b1b893f4193f.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'dmg') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_3ffe183b67354b79bf8f0a94b73324db.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	if (extName == 'exe') {
			return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_87342caea2e045049517f376dbbf52f2.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
	}
	return "http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_75a7fd1f73cb4827ab53f495cfd77716.png?x-oss-process=image/resize,m_fill,w_"+width+",h_"+height;
}

//textarea支持tab缩进
$("textarea").on('keydown',
	function(e) {
			if (e.keyCode == 9) {
					e.preventDefault();
					var indent = '    ';
					var start = this.selectionStart;
					var end = this.selectionEnd;
					var selected = window.getSelection().toString();
					selected = indent + selected.replace(/\n/g, '\n' + indent);
					this.value = this.value.substring(0, start) + selected
							+ this.value.substring(end);
					this.setSelectionRange(start + indent.length, start
							+ selected.length);
			}
	})

function imgerrorfun(){
	var img = event.srcElement;
	img.src="http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_37cab0ac618c438fad5947a73a570e90.png";
	img.onerror=null;
}

//获取客户端IP地址
function getClientIpAddress(){
	var data;
	let xmlHttpRequest;
	if(window.ActiveXObject){
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
			xmlHttpRequest = new XMLHttpRequest();
	}
	xmlHttpRequest.onreadystatechange=function(){
			if(xmlHttpRequest.readyState == 4){
					if(xmlHttpRequest.status == 200) {
							data=xmlHttpRequest .responseText;
					} else {
							alert("error:HTTP状态码为:"+xmlHttpRequest.status);
					}
			}
	};
	xmlHttpRequest.open("get", "https://2022.ip138.com", false);
	xmlHttpRequest.send(null);
	var datalist = data.split("\n");
	var patt = [/[0-9]+.[0-9]+.[0-9]+.[0-9]+/, /来自/, []];
	for (var i in datalist){
			if (patt[0].test(datalist[i]) && patt[1].test(datalist[i])){
					patt[2].push(patt[0].exec(datalist[i])[0]);
					patt[2].push(datalist[i].substr(patt[1].exec(datalist[i]).index+3));
			}
	}
	return patt[2];
}


function behavior(behaviorType, resourceType, resourceId) {
	var data = "{\"resourceId\":\""+resourceId+"\", \"resourceType\": \""+resourceType+"\", \"behaviorType\": \""+behaviorType+"\"}";
	$.ajax({
			url: "/api/resource/behavior",
			type: "post",
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			data: data,
			success:function (data) {
					data = eval(data);
					if (data.success){

					} else {
							layer.msg(data.msg);
							if (data.msg.indexOf("未登录") > -1) {
									login();
							}
					}
			},error:function () {
					layer.msg("服务端异常");
			}
	})
}

/**
* 定义一个函数用于触发二次确认
*
* @param msg      二次弹窗确认话术
* @param callback 确认操作回调事件
*/
function confirmAction(msg, callback) {
	layer.confirm(msg, {
			btn: ['确认', '取消'],
			shade: false // 不显示遮罩
	}, function(index){
			// 用户确认后的回调函数
			callback();
			layer.close(index);
	}, function(index){
			// 用户取消后的回调函数
			layer.close(index);
	});
}

/**
* 取消互动操作
*
* @param behaviorType 互动类型
* @param resourceType 资源类型
* @param resourceId   资源ID
* @param confirm      是否需要二次确认
*/
function cancelBehaviorConfirm(behaviorType, resourceType, resourceId, confirm, confirmText) {
	if (confirm) {
			// 需要弹窗确认
			this.confirmAction(confirmText, function () {
					this.cancelBehavior(behaviorType, resourceType, resourceId)
			});
	} else {
			this.cancelBehavior(behaviorType, resourceType, resourceId);
	}
}

function cancelBehavior(behaviorType, resourceType, resourceId) {
	var data = "{\"resourceId\":\""+resourceId+"\", \"resourceType\": \""+resourceType+"\", \"behaviorType\": \""+behaviorType+"\"}";
	$.ajax({
			url: "/api/resource/cancelBehavior",
			type: "post",
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			data: data,
			success:function (data) {
					data = eval(data);
					if (data.success){
							if ('CTC_PATH' == resourceType && 'FOCUS' == behaviorType) {
									refreshStarStatus(false);
							}
					} else {
							layer.msg(data.msg);
							if (data.msg.indexOf("未登录") > -1) {
									login();
							}
					}
			},error:function () {
					layer.msg("服务端异常");
			}
	})
}

function getUserCardTemplate(uid) {
	var card = "";
	ajaxGet("/api/user/getUserInfo/"+uid, function(response) {
			var result = JSON.parse(response);
			if(result.success) {
					var user = result.data;
					var company = user.company == null ? "公司未知" : user.company;
					var level = user.level == null ? "职级" : user.level;
					var career = user.career == null ? "职业方向未知" : user.career;
					card +=  "<div class='uCard' style='z-index: 999'>" +
							"       <a target='_blank' href=\"/coder?userid="+user.userId+"\"><img class='uCard-photo' src='"+user.photo+"'>" +
							"       <span class='uCard-userName'>"+user.userName+"</span>" +
							"       <span class='uCard-signature line1ppp'>"+user.signature+"</span></a>";
					card += "<p class='uCard-company-level-career line1ppp'>"+company+" - "+level+" - "+career+"</p>";
					card += "<p class='uCard-outlink'>";
					if (user.weburl == null) {
							card +=     "       <a onclick=\"layer.msg('未设置网站信息')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_135fcf1f0dbb47af918cacb48670c43e.png'></a>";
					} else {
							card +=     "       <a href='"+user.weburl+"' target='_blank'><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_135fcf1f0dbb47af918cacb48670c43e.png'></a>";
					}
					if (user.wechatTechCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置公众号')\"><img style='width: 20px; height: 20px;' class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_1bb0b4d939ea461e958f126dd8f72d73.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的公众号', '"+user.wechatTechCode+"')\"><img style='width: 20px; height: 20px;' class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_1bb0b4d939ea461e958f126dd8f72d73.png'></a>";
					}
					if (user.wechatProCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置小程序')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_9359a58ccf494f22863b4e8f03a8728d.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的小程序', '"+user.wechatProCode+"')\"><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_9359a58ccf494f22863b4e8f03a8728d.png'></a>";
					}
					if (user.douyinCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置抖音')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_6dbed1d5059647d09cf8d060260d82a2.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的抖音', '"+user.douyinCode+"')\"><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_6dbed1d5059647d09cf8d060260d82a2.png'></a>";
					}

					if (user.medals.length > 0) {
							$("#login-bbs-author-medal").show();
							var count = 1;
							$.each(user.medals, function (index, m) {
									if (count > 5) {
											return;
									}
									card +="<img src=\""+m.image+"\" class='uCard-medal'>";
									++count;
							})
					}

					card +=     "   </p>";
					card += "<p class='uCard-data'><button style='border-right: 1px solid #d1d3d5'>关注 "+user.focusUserCount+"</button><button style='border-right: 1px solid #d1d3d5'>粉丝 "+user.fansUserCount+"</button><a target='_blank' href=\"/coder?userid="+user.userId+"\"><button>查看主页</button></a></p>";
					card +="   </div>";
			}
	});
	return card;
}

function getUserCardContainer(uid) {
	var card = "";
	ajaxGet("/api/user/getUserInfo/"+uid, function(response) {
			var result = JSON.parse(response);
			if(result.success) {
					var user = result.data;
					var company = user.company == null ? "公司未知" : user.company;
					var level = user.level == null ? "职级" : user.level;
					var career = user.career == null ? "职业方向未知" : user.career;
					card +=  "<div class='uCard-container'>" +
							"       <a target='_blank' href=\"/coder?userid="+user.userId+"\"><img class='uCard-photo' src='"+user.photo+"'>" +
							"       <span class='uCard-userName'>"+user.userName+"</span>" +
							"       <span class='uCard-signature line1ppp'>"+user.signature+"</span></a>";
					card += "<p class='uCard-company-level-career line1ppp'>"+company+" - "+level+" - "+career+"</p>";
					card += "<p class='uCard-outlink'>";
					if (user.weburl == null) {
							card +=     "       <a onclick=\"layer.msg('未设置网站信息')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_135fcf1f0dbb47af918cacb48670c43e.png'></a>";
					} else {
							card +=     "       <a href='"+user.weburl+"' target='_blank'><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_135fcf1f0dbb47af918cacb48670c43e.png'></a>";
					}
					if (user.wechatTechCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置公众号')\"><img style='width: 20px; height: 20px;' class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_1bb0b4d939ea461e958f126dd8f72d73.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的公众号', '"+user.wechatTechCode+"')\"><img style='width: 20px; height: 20px;' class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_1bb0b4d939ea461e958f126dd8f72d73.png'></a>";
					}
					if (user.wechatProCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置小程序')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_9359a58ccf494f22863b4e8f03a8728d.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的小程序', '"+user.wechatProCode+"')\"><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_9359a58ccf494f22863b4e8f03a8728d.png'></a>";
					}
					if (user.douyinCode == null) {
							card +=     "       <a onclick=\"layer.msg('未设置抖音')\"><img class='outlink-icon gray-filter' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_6dbed1d5059647d09cf8d060260d82a2.png'></a>";
					} else {
							card +=     "       <a onclick=\"showCode('欢迎关注我的抖音', '"+user.douyinCode+"')\"><img class='outlink-icon' src='http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_6dbed1d5059647d09cf8d060260d82a2.png'></a>";
					}

					if (user.medals.length > 0) {
							$("#login-bbs-author-medal").show();
							var count = 1;
							$.each(user.medals, function (index, m) {
									if (count > 5) {
											return;
									}
									card +="<img src=\""+m.image+"\" class='uCard-medal'>";
									++count;
							})
					}

					card +=     "   </p>";
					card += "<p class='uCard-data'><button style='border-right: 1px solid #d1d3d5'>关注 "+user.focusUserCount+"</button><button style='border-right: 1px solid #d1d3d5'>粉丝 "+user.fansUserCount+"</button><a target='_blank' href=\"/coder?userid="+user.userId+"\"><button>查看主页</button></a></p>";
					card +="   </div>";
			}
	});
	return card;
}


function ajaxGet(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);   // 第三个参数为false表示同步请求
	xhr.onload = function() {
			if (xhr.status === 200) {
					callback(xhr.responseText);
			}
	};
	xhr.send();
}

function loadScriptAsync(url) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
					eval(xhr.responseText); // 或者直接调用eval函数运行返回的JS内容
			}
	};
	xhr.send();
}

function loadScript(src, callback) {
	var script = document.createElement('script'); // 创建一个<script>元素
	script.type = 'text/javascript';
	if (callback) { // 如果提供了回调函数，则将其绑定到onload事件上
			script.onload = function() {
					callback();
			};
	}
	script.src = src; // 设置要下载的JS文件的URL
	document.head.appendChild(script); // 将<script>元素添加到文档的<head>部分
}