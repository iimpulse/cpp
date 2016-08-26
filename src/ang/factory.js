angular.module("main.service",[])
    .factory("dataFactory", function ($http,$q) {
        var property = false;
	
        return {
            getSymbols: function (creds) {
				var deferred = $q.defer();
				$http({method:'GET',
				       url:'/data/symbols',
				       })
				.success(function(data){
					deferred.resolve(data);			
		            }).error(function(){
				deferred.reject('Gene List Not Found');
			    })

		            return deferred.promise;
		        },
	     getGene: function (src){
				var deferred = $q.defer();
				$http({method:'POST',
					url:'/data/symbol',
					params:{"gene":src}
					})
				.success(function(data){
					deferred.resolve(data);
		
				}).error(function(){
				  deferred.reject('Gene Not Found');
				});
				return deferred.promise;
			
	  		},
		getArticles: function(cancer){
			var deferred= $q.defer();
			$http({method:'POST',
				url:'/data/articles/',
				params:{"cancer":cancer}
			
			})
			.success(function(data){
				deferred.resolve(data);
	
			}).error(function(){
				deferred.reject("Article Fetch Error");

			});
			return deferred.promise;
			}
		}	
});
