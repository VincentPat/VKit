/**
 * @author VincentHuang
 * @version 1.0.0
 * @description 常用的一些方法，整理到工具包中
 */
var VKit = function() {
	
	var vkit = {
		
		/**
		 * 获取一个对象的类名
		 * @param obj {Object}
		 * @return {String}
		 */
		getClassOf: function(obj) {
			if (obj === null) return "Null";
			if (obj === undefined) return "Undefined";
			return Object.prototype.toString.call(obj).slice(8, -1);
		}

	};

	return vkit;

};