angular.module("main.controller",[]).controller("genericCtrl",['$scope','dataFactory',function($scope,dataFactory){
	
	angular.element(document).ready(function(){
		dataFactory.getSymbols().then(function(data){

			$scope.genelist = data;
		});

		$scope.cancers = ["bladder","lung","prostate","colon","pancreatic"];
				

		dataFactory.getArticles('bladder').then(function(data){
			if(!data){

				throw err;
			}else{
				//var jsn = JSON.parse(data);
				$scope.bc = data;
			}
		});

		dataFactory.getArticles('lung').then(function(data){
			if(!data){

				throw err;
			}else{
				//var jsn = JSON.parse(data);
				$scope.lung = data;

			}
		});

		dataFactory.getArticles('prostate').then(function(data){
			if(!data){

				throw err;
			}
			else{

				$scope.prostate = data;

			}
		});
		dataFactory.getArticles('colon').then(function(data){
			if(!data){

				throw err;
			}
			else{

				$scope.colon = data;

			}

		});
		dataFactory.getArticles('pancreatic').then(function(data){
			if(!data){

				throw err;
			}
			else{

				$scope.pancreatic = data;

			}
		});
	});



	//check to see which gene is selected
	
	$scope.watchSel = function(data){
		
		dataFactory.getGene(data).then(function(res){
			$scope.activeGene = res[0];
			$scope.filterbc = isna($scope.activeGene.bcid.split(","));
			$scope.filterlc = isna($scope.activeGene.lcid.split(","));
			$scope.filterpc = isna($scope.activeGene.pcid.split(","));
			$scope.filtercc = isna($scope.activeGene.ccid.split(","));
			$scope.filterpn = isna($scope.activeGene.pncid.split(","));
			var geneTotal = $scope.filterbc.length + $scope.filterlc.length + $scope.filterpc.length + $scope.filtercc.length + $scope.filterpn.length;
			$scope.artcount = {"bc":$scope.filterbc.length,"lc":$scope.filterlc.length,"pc":$scope.filterpc.length,"cc":$scope.filtercc.length,"pn":$scope.filterpn.length};
			$scope.ttlcount = {"bc":$scope.bc.length,"lc":$scope.lung.length,"pc":$scope.prostate.length,"cc":$scope.colon.length,"pn":$scope.pancreatic.length};
			$scope.prctTotal = {"bc":$scope.filterbc.length/$scope.bc.length,"lc":$scope.filterlc.length/$scope.lung.length,"pc":$scope.filterpc.length/$scope.prostate.length,"cc":$scope.filtercc.length/$scope.colon.length,"pn":$scope.filterpn.length/$scope.pancreatic.length};
			$scope.prctGene = {"bc":$scope.filterbc.length/geneTotal,"lc":$scope.filterlc.length/geneTotal,"pc":$scope.filterpc.length/geneTotal,"cc":$scope.filtercc.length/geneTotal,"pn":$scope.filterpn.length/geneTotal};
			$scope.prctTotal = decimal($scope.prctTotal);
			$scope.prctGene = decimal($scope.prctGene);
		});
	}	


	function isna(data){

		if(data[0] == "NA"){

				return "";

		}
		else{

				return data;
		}
	}


	function decimal(data){

	for(var num in 	data){
			if(data.hasOwnProperty(num)){

				data[num] = data[num].toFixed(4);

			}
	}
		return data;

	}
	
}])





.filter('inArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
});
