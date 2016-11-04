// App.Routers.Main = Backbone.Router.extent({
// 	// Hash maps for routers
// 	router : {
// 		"" : "index",
// 		"/teams" : "getTeams",
// 		"/teams/:country" : "getTeamsCountry",
// 		"/teams/:country/:name" : "getTeam",
// 		"*error" : "fourOfour"
// 	},
// 	index : function(){
// 	//Homepage
// 	},
// 	getTeams : function(){
// 		//list all teams
// 	},
// 	getTeamsCountry : function(coutry){
// 		//Get list of teams for specific country
// 	},
// 	getTeam : function(country,name){
// 		//Get the teams for a specific country and with a specific name
// 	},
// 	fourOfour : function(error){
// 		// 404 page
// 	}
// });

// $(function(){
// 	var router = new App.Routers.Main();
// 	Backbone.history.start(PushState: true)
// })
//通过一个启用 HTML5 特性 pushState 的配置调用 start() 方法。对于那些支持 pushState 的浏览器，Backbone 将监视 popstate 事件以触发一个新状态。如果浏览器不能支持 HTML5 特性，那么 onhashchange 活动会被监视。如果浏览器不支持该事件，轮询技术将监视 URL 散列片段的任何更改。