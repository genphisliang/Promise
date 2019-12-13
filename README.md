# Promise
原生环境下的Promise

```
	getA().then(function(data) {
		return 1;
	}).then(function(data){
		console.log(data);
	}).catch(function(err){
    console.log(data);
	});

	Promise.all([
		aaa(),
		bbb(),
	]).then(function(result){
		console.log(result);
	}).catch(function(err){
		console.log(err);
	});

	function aaa() {
		var dtd = Deferred();

		setTimeout(function() {
			dtd.resolve('a');
		},2000);

		return dtd;
	}

	function bbb() {
		return new Promise((resolve, reject) => {
		    setTimeout(function(){
		    	resolve('b');
		    },1000);
		})
	}
	
	function getA() {
		var dtd = Deferred();

		setTimeout(function() {
			dtd.resolve(0);
		}, 2000);

		setTimeout(function() {
			dtd.reject(0);
		}, 2000);

		return dtd;
	}
</script>
```
