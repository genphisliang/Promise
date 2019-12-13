Promise/**
  * auth: wenjing.liang
 **/
(function( window, undefined ) {
	function Base(fun) {
		var me = this;
		me.thenList = [];
		me.catchList = [];

		me.resolve = function(param) {
			var curFun;
			//执行then
			for (var i in me.thenList) {
				curFun = me.thenList[i];
				param = curFun && curFun(param, me.__key);
			}

			me.thenList = me.thenList.splice(0,0);
		}
		me.reject = function(param) {
			//执行catch
			var curFun;
			//执行then
			for (var i in me.catchList) {
				curFun = me.catchList[i];
				param = curFun && curFun(param);
			}

			me.catchList = me.catchList.splice(0,0);
		}

		if (fun && typeof fun === 'function') {
			fun(me.resolve, me.reject);
		}
	}
	Base.prototype.then = function(fun, key) {
		var me = this;
		if (fun && typeof fun === 'function') {
			me.thenList.push(fun);

			if (key) {
				me.__key = key;
			}
		}

		return this;
	}
	Base.prototype.catch = function(fun) {
		var me = this;
		if (fun && typeof fun === 'function') {
			me.catchList.push(fun);
		}

		return me;
	}
	Base.all = function (arr) {
		var dtd = Deferred();
		var promiseLen = 0,
			retLength = 0,
			ret = [];

		if (arr && arr.length) {
			promiseLen = arr.length;

			for (var i in arr) {
				var dt = arr[i];

				dt && dt.then(function(result, key) {
					ret[key] = result;
					retLength++;

					if (retLength === promiseLen) {
						dtd.resolve(ret);
					}
				}, i).catch(function(err){
					dtd.reject(err);
				});
			}
		}

		return dtd;
	}
	window.Promise = function(fun) {
		var __ctrl = new Base(fun);

		this.resolve = function(param) {
			__ctrl.resolve(param);
			return this;
		}
		this.reject = function(param) {
			__ctrl.reject(param);
			return this;
		}
		this.then = function(param, key) {
			__ctrl.then(param, key);
			return this;
		}
		this.catch = function(param) {
			__ctrl.catch(param);
			return this;
		}
	}
	window.Promise.all = Base.all;
	window.Deferred = function() {
		return new Promise();
	}
})( window );