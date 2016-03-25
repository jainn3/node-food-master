angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Food', ['$http',function($http) {
		return {
			deleteAll : function() {
				return $http.delete('/api/deleteAll');
			},
			getTotal : function() {
				return $http.get('/api/total');
			},
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			}
		}
	}]);