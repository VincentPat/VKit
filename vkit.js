/**
 * @author VincentHuang
 * @version 1.0.0
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
		}

	};

	return vkit;

};