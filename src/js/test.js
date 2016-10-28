(function(window,undefined){
	function add(a,b){
		//a = a+c jshint 报错
		return a+b
	}
	
	add(10,100)
})(window)