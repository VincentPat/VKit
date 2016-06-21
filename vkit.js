/**
 * @author VincentHuang
 * @version 1.0.3
 * @description 常用的一些方法，整理到工具包中
 */
var VKit = function() {
	
	var vkit = {
		
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
			return Calc.Add(arg1, -Number(arg2), arguments[2]);
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
		 * 日期格式化
		 * @param  {Date} date   日期
		 * @param  {String} format 格式
		 * @return {String}        格式化日期
		 */
		dateFormat: function(date, format) {
		    if(format === undefined){
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
		}

	};

	return vkit;

};