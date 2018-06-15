sc2.init({
	baseURL:'https://steemconnect.com',
	app: 'steem.app',
	callbackURL: 'http://127.0.0.1/callback.php',
	scope: ['login','vote','comment','comment_delete','comment_options','custom_json','claim_reward_balance']
});
var main_app = angular.module('sc_main_app',['ngRoute']);
main_app.config(function($routeProvider , $locationProvider) {
		$routeProvider
		.when("/", {
				templateUrl : "inc/template/main.html",
				controller : "home_controller"
		})
		.when("/profile", {
				templateUrl : "inc/template/profile.html",
				controller: "profile_controller"
		})
		.when("/posts", {
				templateUrl : "inc/template/posts.html",
				controller: "posts_controller"
		})
		.otherwise({
			template:'<center><br><br><h4>Not found!</h4></center>'
		});
	$locationProvider.html5Mode(true);
})
// header controller
.controller('head_controller',function($scope,$rootScope){
	var head = this;
	$rootScope.active=1;
	sc2.me(function (err, result) {
		if(!err && result){
			//filling user information
			head.islogin = 3;
			$scope.$apply();
			$rootScope.user_me = result;
			var json_meta = JSON.parse(result.account.json_metadata);
			if(json_meta.profile.profile_image){
				$rootScope.profile_image= json_meta.profile.profile_image;
			}

			$scope.$apply();
		}
	});
})
// profile page controller
.controller('profile_controller',function($rootScope,$scope){
	sc2.me(function (err, result) {
		var json_meta = JSON.parse(result.account.json_metadata);
		if(json_meta.profile.name) $rootScope.user_name = json_meta.profile.name;
		if(json_meta.profile.about) $rootScope.user_about = json_meta.profile.about;
		if(json_meta.profile.location) $rootScope.user_location = json_meta.profile.location;
		if(json_meta.profile.website) $rootScope.user_website = json_meta.profile.website;
		$rootScope.reputation = steem.formatter.reputation(result.account.reputation);
		$rootScope.account_age = result.account.created;
		//Filling voting_power
		var now = new Date();
		var n = now.getTime()/1000;
		var last = new Date(result.account.last_vote_time+'z');
		var l = last.getTime()/1000;
		var power = result.account.voting_power/100 + (parseFloat(n-l)/4320);
		var powernow = power.toFixed(2);
		if(powernow > 100){
			powernow = 100;
		}
		$rootScope.voting_power = powernow;
		//filling bandwidth code from @neander-squirrel
		steem.api.getDynamicGlobalProperties(function(err, gprops) {
			const STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS = 60 * 60 * 24 * 7;
			var vestingShares = parseFloat(result.account.vesting_shares.replace(' VESTS', ''));
			var receivedVestingShares = parseFloat(result.account.received_vesting_shares.replace(' VESTS', ''));
			var deleg = parseFloat(result.account.delegated_vesting_shares.replace(' VESTS', ''));
			var totalVestingShares = parseFloat(gprops.total_vesting_shares.replace(' VESTS', ''));
			var max_virtual_bandwidth = parseInt(gprops.max_virtual_bandwidth, 10);
			var average_bandwidth = parseInt(result.account.average_bandwidth, 10);
			var delta_time = (new Date - new Date(result.account.last_bandwidth_update + 'Z')) / 1000;
			var bandwidthAllocated = (max_virtual_bandwidth * (vestingShares + receivedVestingShares-deleg) / totalVestingShares);
			bandwidthAllocated = Math.round(bandwidthAllocated / 1000000);
			var new_bandwidth = 0;
			if(delta_time < STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS) {
				new_bandwidth = (((STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS - delta_time) * average_bandwidth) / STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS);
			}
			new_bandwidth = Math.round(new_bandwidth / 1000000);
			var band = ((bandwidthAllocated-new_bandwidth)/1024).toFixed(2);
			var bandpercent = (100 - (100 * new_bandwidth / bandwidthAllocated)).toFixed(2);
			$rootScope.bandwidth = bandpercent;
			$scope.$apply();
		});
	});
})
// home page controller
.controller('home_controller',function($rootScope,$scope){
})
// wallet page controller
.controller('posts_controller',function($scope){
	var th= this;
	getposts('mahdiyari',function(res){
		th.posts = (JSON.parse(res).posts);
		$scope.$apply();
	});
});
