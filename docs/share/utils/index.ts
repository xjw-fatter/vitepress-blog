export * from "./listener"

/**
 * 工具函数库，提供随机整数生成、UUID生成、数组洗牌以及根据ID设置文本内容的功能。
 * @module utils
 */

/**
 * 生成指定范围内的随机整数。
 * @param {number} min - 随机数的最小值（包含）。
 * @param {number} max - 随机数的最大值（包含）。
 * @returns {number} 随机生成的整数。
 */

/**
 * 生成指定长度和类型的UUID。
 * @param {number} [length=32] - UUID的长度，默认为32。
 * @param {"digits" | "letters" | "alphanumeric"} [type="alphanumeric"] - UUID的字符类型，默认为"alphanumeric"。
 * @returns {string} 生成的UUID字符串。
 */

/**
 * 对数组进行洗牌操作。
 * @param {any[]} array - 需要洗牌的数组。
 * @returns {any[]} 洗牌后的数组。
 */

/**
 * 在页面加载完成后，根据ID设置元素的文本内容。
 * @param {string} id - 元素的ID。
 * @param {string} content - 要设置的文本内容。
 */
export const utils = {
    randomInt: (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    uuid: (
        length: number = 32,
        type: "digits" | "letters" | "alphanumeric" = "alphanumeric"
    ): string => {
        let result = "";
        const characters =
            type === "digits"
                ? "0123456789"
                : type === "letters"
                    ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    : "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    shuffleArray: (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    aTextbyId: (id: string, content: string) => {
        window.addEventListener("load", () => {
            const element = document.getElementById(id);
            element && (element.textContent = content);
        });
    },
};