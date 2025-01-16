// 导出一个包含各种实用函数的对象
export const utils = {
	/**
	 * 生成一个指定范围内的随机整数
	 * @param min - 最小值（包含）
	 * @param max - 最大值（包含）
	 * @returns 最小值和最大值之间的一个随机整数
	 */
	randomInt: (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * 生成一个指定长度和类型的唯一标识符
	 * @param length - 生成标识符的长度，默认为32
	 * @param type - 生成标识符的类型，可以是"digits"（数字）、"letters"（字母）或"alphanumeric"（数字和字母），默认为"alphanumeric"
	 * @returns 指定长度和类型的唯一标识符
	 */
	uuid: (
		length: number = 32,
		type: "digits" | "letters" | "alphanumeric" = "alphanumeric"
	): string => {
		let result = "";
		// 根据类型选择字符集
		const characters =
			type === "digits"
				? "0123456789"
				: type === "letters"
					? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
					: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const charactersLength = characters.length;
		// 生成唯一标识符
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},

	/**
	 * 随机打乱一个数组的顺序
	 * @param array - 需要被打乱的数组
	 * @returns 打乱顺序后的数组
	 */
	shuffleArray: (array: any[]) => {
		// 使用Fisher-Yates洗牌算法
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	},

	/**
	 * 根据元素ID设置文本内容
	 * @param id - 元素的ID
	 * @param content - 要设置的文本内容
	 */
	aTextbyId: (id: string, content: string) => {
		// 确保文档加载完成后执行，以避免找不到元素
		window.addEventListener("load", () => {
			const element = document.getElementById(id);
			element && (element.textContent = content);
		});
	},

	/**
	 * 获取进程的命令行参数
	 * @returns 包含命令和参数的对象
	 */
	getProcessArgv: () => {
		const args = process.argv.slice(2); // 去掉前两个元素，只保留命令和参数
		const command = args[0]; // 第一个参数是命令
		const params = args.slice(1); // 剩余的是参数
		return {
			command,
			params,
		};
	},

	throttleTimer: null as any,
	throttleFlag: null as any,
	/**
	 * 节流原理：在一定时间内，只能触发一次
	 *
	 * @param {Function} func 要执行的回调函数
	 * @param {Number} wait 延时的时间
	 * @param {Boolean} immediate 是否立即执行
	 * @return null
	 */
	throttle: (func, wait = 500, immediate = true) => {
		if (immediate) {
			if (!utils.throttleFlag) {
				utils.throttleFlag = true;
				// 如果是立即执行，则在wait毫秒内开始时执行
				typeof func === "function" && func();
				utils.throttleTimer = setTimeout(() => {
					utils.throttleFlag = false;
				}, wait);
			}
		} else if (!utils.throttleFlag) {
			utils.throttleFlag = true;
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			utils.throttleTimer = setTimeout(() => {
				utils.throttleFlag = false;
				typeof func === "function" && func();
			}, wait);
		}
	},

	debounceTimeout: null as any,
	/**
	 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
	 *
	 * @param {Function} func 要执行的回调函数
	 * @param {Number} wait 延时的时间
	 * @param {Boolean} immediate 是否立即执行
	 * @return null
	 */
	debounce: (func, wait = 500, immediate = false) => {
		// 清除定时器
		if (utils.debounceTimeout !== null) clearTimeout(utils.debounceTimeout);
		// 立即执行，此类情况一般用不到
		if (immediate) {
			const callNow = !utils.debounceTimeout;
			utils.debounceTimeout = setTimeout(() => {
				utils.debounceTimeout = null;
			}, wait);
			if (callNow) typeof func === "function" && func();
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
			utils.debounceTimeout = setTimeout(() => {
				typeof func === "function" && func();
			}, wait);
		}
	},
	/**
	 * 判断当前设备是否为移动设备
	 *
	 * 该函数通过检查浏览器的 userAgent 字符串来确定设备类型
	 * 如果 userAgent 中包含 "Mobile" 或 "Tablet" 等关键字，则认为是移动设备
	 *
	 * @returns {boolean} 如果是移动设备则返回 true，否则返回 false
	 */
	isMobile: () => {
		try {
			const userAgent = navigator.userAgent || "";
			// 移动设备浏览器的userAgent字符串中会包含"Mobile"或"Tablet"等关键字
			return /Mobile|Tablet/i.test(userAgent);
		} catch (error) {
			console.error("Error checking user agent:", error);
			return false;
		}
	},

	/**
	 * 禁止调试功能
	 * 此函数旨在通过多种方法防止用户调试网页，包括禁用F12开发者工具、右键点击和控制台访问
	 */
	prohibitionOfDebugging: () => {
		if(window.location.href.indexOf('#debug')==-1){
			setInterval(function(){
					(function (a) {return (function (a) {return (Function('Function(arguments[0]+"' + a + '")()'))})(a)})('bugger')('de', 0, 0, (0, 0));
			}, 1000);
		}

		setInterval(function () {
			check()
		}, 1000);
		var check = function () {
			function doCheck(a) {
				if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
					(function () { }
					["constructor"]("debugger")())
				} else {
					(function () { }
					["constructor"]("debugger")())
				}
				doCheck(++a)
			}
			try {
				doCheck(0)
			} catch (err) { }
		};
		check();

		//禁止鼠标右击
		document.oncontextmenu = function () {
			event.returnValue = false;
		};
		//禁用开发者工具F12
		document.onkeydown = document.onkeyup = document.onkeypress = function (
			event
		) {
			let e = event || window.event || arguments.callee.caller.arguments[0];
			if (e && e.keyCode == 123) {
				e.returnValue = false;
				return false;
			}
		};
		let userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") > -1) {
			let checkStatus;
			let devtools = /./;
			devtools.toString = function (): any {
				checkStatus = "on";
			};
			setInterval(function () {
				checkStatus = "off";
				console.log(devtools);
				console.log(checkStatus);
				console.clear();
				if (checkStatus === "on") {
					let target = "";
					try {
						window.open("about:blank", (target = "_self"));
					} catch (err) {
						let a = document.createElement("button");
						a.onclick = function () {
							window.open("about:blank", (target = "_self"));
						};
						a.click();
					}
				}
			}, 200);
		} else {
			//禁用控制台
			let ConsoleManager = {
				onOpen: function () {
					alert("Console is opened");
				},
				onClose: function () {
					alert("Console is closed");
				},
				init: function () {
					let self = this;
					let x = document.createElement("div");
					let isOpening = false,
						isOpened = false;
					Object.defineProperty(x, "id", {
						get: function () {
							if (!isOpening) {
								self.onOpen();
								isOpening = true;
							}
							isOpened = true;
							return true;
						}
					});
					setInterval(function () {
						isOpened = false;
						console.info(x);
						console.clear();
						if (!isOpened && isOpening) {
							self.onClose();
							isOpening = false;
						}
					}, 200);
				}
			};
			ConsoleManager.onOpen = function () {
				//打开控制台，跳转
				let target = "";
				try {
					window.open("about:blank", (target = "_self"));
				} catch (err) {
					let a = document.createElement("button");
					a.onclick = function () {
						window.open("about:blank", (target = "_self"));
					};
					a.click();
				}
			};
			ConsoleManager.onClose = function () {
				alert("Console is closed!!!!!");
			};
			ConsoleManager.init();
		}
	},
};
