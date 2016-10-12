/**
 * @author VincentHuang
 * @version 1.1.1
 * @description 常用的一些方法，整理到工具包中
 */
var VKit = function() {
	
	var vkit = {

		/**-----------------------------------
		 * 类相关
		 -----------------------------------*/
		
		/**
		 * 获取一个对象的类名
		 * @param {Object} obj
		 * @return {String}
		 */
		getClassOf: function(obj) {
			if (obj === null) return "Null";
			if (obj === undefined) return "Undefined";
			return Object.prototype.toString.call(obj).slice(8, -1);
		},

		/**-----------------------------------
		 * 数字相关
		 -----------------------------------*/

		/**
		 * 精确加法
		 * @param  {Number} arg1 加数一
		 * @param  {Number} arg2 加数二
		 * @return {String}      
		 */
		accPlus: function(arg1, arg2) {
			arg1 = arg1.toString(), arg2 = arg2.toString();
            var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
            var maxLen = Math.max(d1.length, d2.length);
            var m = Math.pow(10, maxLen);
            var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
            var d = arguments[2];
            return typeof d === "number" ? Number((result).toFixed(d)) : result;
		},

		/**
		 * 精确减法
		 * @param  {Number} arg1 被减数
		 * @param  {Number} arg2 减数
		 * @return {String}      
		 */
		accMinus: function(arg1, arg2) {
			return this.accPlus(arg1, -Number(arg2), arguments[2]);
		},

		/**
		 * 精确乘法
		 * @param  {Number} arg1 被乘数
		 * @param  {Number} arg2 乘数
		 * @return {String}      
		 */
		accMultiply: function(arg1, arg2) {
			var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		},

		/**
		 * 精确除法
		 * @param  {Number} arg1 被除数
		 * @param  {Number} arg2 除数
		 * @return {String}      
		 */
		accDivide: function(arg1, arg2) {
			var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		},

		/**
		 * 金额转换成大写
		 * @param  {String | Number} value 待转换数字
		 * @return {String}           转换结果
		 */
		moneyToCN: function(value) {
		    try {
		        var i = 1;
		        var dw2 = new Array("", "万", "亿"); //大单位
		        var dw1 = new Array("拾", "佰", "仟"); //小单位
		        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
		        var str = "";
		        //以下是小写转换成大写显示在合计大写的文本框中     
		        //分离整数与小数
		        var source = ['', ''];
		        var temp = value.toString().split('.');
		        for (var index = 0; index < temp.length; index++) {
		        	source[index] = temp[index];
		        }
		        var num = source[0];
		        var dig = source[1];
		        //转换整数部分
		        var k1 = 0; //计小单位
		        var k2 = 0; //计大单位
		        var sum = 0;
		        var len = source[0].length; //整数的长度
		        for (i = 1; i <= len; i++) {
					var n = source[0].charAt(len - i); //取得某个位数上的数字
					var bn = 0;
					if (len - i - 1 >= 0) {
						bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
					}
					sum = sum + Number(n);
					if (sum != 0) {
						str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
						if (n == '0') sum = 0;
					}
					if (len - i - 1 >= 0) { //在数字范围内
						if (k1 != 3) { //加小单位
							if (bn != 0) {
								str = dw1[k1].concat(str);
							}
							k1++;
						} else { //不加小单位，加大单位
							k1 = 0;
							var temp = str.charAt(0);
							if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
								str = str.substr(1, str.length - 1);
							str = dw2[k2].concat(str);
							sum = 0;
						}
					}
					if (k1 == 3) { //小单位到千则大单位进一
						k2++;
					}
		        }
		        //转换小数部分
		        var strdig = "";
		        if (dig != "") {
		              var n = dig.charAt(0);
		              if (n != 0) {
		                strdig += dw[Number(n)] + "角"; //加数字
		              }
		              var n = dig.charAt(1);
		              if (n != 0) {
		                strdig += dw[Number(n)] + "分"; //加数字
		              }
		        }
		        str += "元" + strdig;
		    } catch(e) {
		        return "0元";
		    }
		    return str;
		},

		/**
		 * 数字转换成大写
		 * @param  {String | Number} num 待转换数字
		 * @return {String}     数字大写
		 */
		// numberToCN: function(num) {
		// 	var result;
		// 	num = num.toString();
		// 	var pattern = /^-?\d+(\.\d+)?$/;
		// 	if (pattern.exec(num)) {
		// 		// 分离整数和小数
		// 		var interger, decimal;
		// 		var pattern_decimal = /\.\d+$/;
		// 		if (pattern_decimal.exec(pattern_decimal)) { // 带小数
		// 			interger = num.split("\.")[0];
		// 			decimal = num.split("\.")[1];
		// 		} else { // 纯整数
		// 			interger = num.split("\.")[0];
		// 		}
		// 		// 数字与单位
		// 		var numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
		// 		var unit = ["十", "百", "千", "万", "十万", "百万", "千万", "亿", "十亿", "百亿", "千亿"];
		// 		// 处理整数部分
		// 		var interger_arr = interger.split("").reverse(); // 记得是先反转过来，从低位开始处理的
		// 		console.log(interger_arr);
		// 		var result_interger = "";
		// 		for (var i = 0; i < interger_arr.length; i++) {
		// 			var number = parseInt(interger_arr[i]);
		// 			result_interger = numbers[number] + result_interger;
		// 			if (i >= 1) { // 从十位开始有单位
		// 				result_interger += unit[i-1];
		// 			}
		// 			console.log(number, result_interger);
		// 		}
		// 		// 处理小数部分
		// 		var result_decimal = "";
		// 		result = result_interger + (decimal ? "点" : "") + result_decimal;
		// 		return result;
		// 	} else {
		// 		return "零";
		// 	}
			
		// 	return result;
		// },

		/**-----------------------------------
		 * 日期相关
		 -----------------------------------*/

		/**
		 * 日期格式化
		 * @param  {Date} date   日期
		 * @param  {String} format 格式
		 * @return {String}        格式化日期
		 */
		dateFormat: function(date, format) {
		    if (format === undefined) {
		        format = date;
		        date = new Date();
		    }
		    var map = {
		        "M": date.getMonth() + 1, //月份 
		        "d": date.getDate(), //日 
		        "h": date.getHours(), //小时 
		        "m": date.getMinutes(), //分 
		        "s": date.getSeconds(), //秒 
		        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
		        "S": date.getMilliseconds() //毫秒 
		    };
		    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
		        var v = map[t];
		        if(v !== undefined){
		            if (all.length > 1) {
		                v = '0' + v;
		                v = v.substr(v.length-2);
		            }
		            return v;
		        } else if (t === 'y') {
		            return (date.getFullYear() + '').substr(4 - all.length);
		        }
		        return all;
		    });
		    return format;
		},

		/**-----------------------------------
		 * 数组相关
		 -----------------------------------*/

		/**
		 * 输入范围生成数组
		 * @param  {Number} start 起始数字(包含)
		 * @param  {Number} stop  结束数字(不包含)
		 * @param  {Number} step  步长
		 * @return {Array}       数组
		 */
		range: function(start, stop, step) {
		    if (typeof(stop) == 'undefined') {
		        stop = start;
		        start = 0;
		    }
		    if (typeof(step) == 'undefined') {
		        step = 1;
		    }
		    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		        return [];
		    }
		    var result = [];
		    for (var i = start; step > 0 ? i < stop : i > stop; i = this.accPlus(i, step)) {
		        result.push(i);
		    }
		    return result;
		},

		/**
		 * 数组去重
		 * @param  {Array} arr 需要去重的数组
		 * @return {Array}     去重结果
		 */
		unique: function(arr) {
			var result = [];
			for (var index in arr) {
				if (result.indexOf(arr[index]) === -1) result.push(arr[index]);
			}
			return result;
		},

		/**-----------------------------------
		 * 字符串相关
		 -----------------------------------*/

		/**
		 * 字符串截取，超出长度在末尾添加点点点
		 * @param  {String} str 字符串
		 * @param  {Number} len 长度
		 * @return {String}     截取完成字符串
		 */
		cutStr: function(str, len) {
			var temp,
		        icount = 0,
		        pattern = /[^\x00-\xff]/,
		        result = "";
		    for (var i = 0; i < str.length; i++) {
		        if (icount <= len - 1) {
		            temp = str.substr(i, 1);
		            if (pattern.exec(temp) == null) {
		                icount = icount + 1;
		            } else {
		                icount = icount + 2;
		            }
		           	result += temp;
		        } else {
		            break;
		        }
		    }
		    return result + "...";
		},

		/**
		 * 正则全局替换
		 * @param  {RegExp} pattern    正则
		 * @param  {String} replaceStr 替换的字符串
		 * @param  {String} Str        被替换的字符串
		 * @return {String}            替换后字符串
		 */
		replaceAll: function(pattern, replaceStr, Str) {
		    return Str.replace(new RegExp(pattern, "gm"), replaceStr);
		},

		/**
		 * 字符串开头检测
		 * @param  {String} search 搜索的字符串
		 * @param  {String} str    被搜索的字符串
		 * @return {Boolean}        搜索结果
		 */
		startWith: function(search, str) {
			return str.indexOf(search) == 0;
		},

		/**
		 * 字符串结尾检测
		 * @param  {String} search 搜索的字符串
		 * @param  {String} str    被搜索的字符串
		 * @return {Boolean}        搜索结果
		 */
		endWith: function(search, str) {
			var d = str.length - search.length;
    		return (d >= 0 && str.lastIndexOf(search) == d);
		},

		/**
		 * 判断是否为合法URL
		 * @param  {String}  url 链接地址
		 * @return {Boolean}     结果
		 */
		isURL: function(url) {
		    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
		    if (regular.test(url)) {
		        return true;
		    } else {
		        return false;
		    }
		},

		/**
		 * 反转字符串
		 * @param  {String} str 原字符串
		 * @return {String}     反转后字符串
		 */
		reverseStr: function(str) {
		    return str.split('').reverse().join('');
		},

		/**
		 * 半角转换成全角
		 * @param  {String} str 原字符串
		 * @return {String}     转换后字符串
		 */
		toDBC: function(str) {
		    var result = '';
		    for (var i = 0; i < str.length; i++) {
		        code = str.charCodeAt(i);
		        if (code >= 33 && code <= 126) {
		              result += String.fromCharCode(str.charCodeAt(i) + 65248);
		        } else if (code == 32) {
		              result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
		        } else {
		              result += str.charAt(i);
		        }
		    }
		    return result;
		},

		/**
		 * 全角转换成半角
		 * @param  {String} str 原字符串
		 * @return {String}     转换后字符串
		 */
		toCDB: function(str) {
		    var result = '';
		    for (var i = 0; i < str.length; i++) {
		        code = str.charCodeAt(i);
		        if (code >= 65281 && code <= 65374) {
		              result += String.fromCharCode(str.charCodeAt(i) - 65248);
		        } else if (code == 12288){
		              result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
		        } else {
		              result += str.charAt(i);
		        }
		    }
		    return result;
		},

		/**
		 * 获取GUID
		 * @return {[type]} [description]
		 */
		getGUID: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		        return v.toString(16);
		    });
		},

		/**-----------------------------------
		 * Cookie相关
		 -----------------------------------*/

		/**
		 * 设置Cookie
		 * @param {String} name     cookie key
		 * @param {String} value    cookit value
		 * @param {Number} lastTime 持续时间
		 * @param {String} path     路径
		 * @param {String} domain   域
		 * @return {Boolean}        结果
		 */
		setCookie: function(name, value, lastTime, path, domain) {
			if (!name) return false;
		    var d = new Date();
		    d = d.getTime() + lastTime;
		    var exp = new Date(d);
		    var _path = path || "/";
		    var _domain = domain || "";
		    document.cookie = name + "=" + escape(value) + ";path=" + _path + ";expires=" + exp.toGMTString() + ";domain=" + _domain + ";";
			console.log(name + "=" + escape(value) + ";path=" + _path + ";expires=" + exp.toGMTString() + ";domain=" + _domain + ";");
			return true;
		},

		/**
		 * 获取Cookie
		 * @param  {String} name cookie key
		 * @return {String}      结果
		 */
		getCookie: function(name) {
		    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		    if (arr != null) return unescape(arr[2]);
		    return null;
		},

		/**-----------------------------------
		 * 移动设备相关
		 -----------------------------------*/

		/**
		 * 判断是否为移动设备
		 * @return {Boolean} 结果
		 */
		isMobile: function() {
		    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
		},

		/**
		 * 判断是否为苹果设备
		 * @return {Boolean} 结果
		 */
		isApple: function() {
		    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
		},

		/**
		 * 判断是否为安卓设备
		 * @return {Boolean} 结果
		 */
		isAndroid: function () {
		    return (/android/i.test(navigator.userAgent.toLowerCase()));
		},

		/**-----------------------------------
		 * 兼容性相关
		 -----------------------------------*/

		/**
		 * 是否支持transition
		 * @return {Boolean} 结果
		 */
		supportTransition: function() {
			var s = document.createElement('p').style,
		        r = 'transition' in s ||
		        'WebkitTransition' in s ||
		        'MozTransition' in s ||
		        'msTransition' in s ||
		        'OTransition' in s;
		    s = null;
		    return r;
		},

		/**
		 * 获取已安装flash版本
		 * 备注：如果获取到的版本号为0，则不支持
		 * @return {String} 版本号
		 */
		flashVersion: function() {
			var version;
		    try {
		        version = navigator.plugins['Shockwave Flash'];
		        version = version.description;
		    } catch (ex) {
		        try {
		            version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
		                .GetVariable('$version');
		        } catch (ex2) {
		            version = '0.0';
		        }
		    }
		    version = version.match(/\d+/g);
		    return parseFloat(version[0] + '.' + version[1], 10);
		},

		/**-----------------------------------
		 * 应用相关
		 -----------------------------------*/

		// 复制到粘贴板
		copyToClipboard: function(text) {
			var text_field = document.createElement('textarea');
			text_field.innerText = text;
			document.body.appendChild(text_field);
			text_field.select();
			document.execCommand('copy');
			text_field.remove();
			alert('已复制：'+text);
		}

	};

	return vkit;
};