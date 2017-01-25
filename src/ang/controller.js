angular.module("main.controller",[]).controller("genericCtrl",['$scope','dataFactory',function($scope,dataFactory){
	
	angular.element(document).ready(function(){
		$(".loader").hide();
		dataFactory.getSymbols().then(function(data){

			$scope.genelist = data;
			$('.typeSelect').typeahead({
			   showHintOnFocus: true,
			   source: $scope.genelist,
			   items: 5
			  });
			$('.typeSelect').on('keyup',function(event){

				$scope.watchSel($scope.selGene);
			});
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
		var current = $('.typeSelect').typeahead("getActive");
		if(current){
			if(current == $('.typeSelect').val()){
				$(".loader").show();
				dataFactory.getGene(data).then(function(res){
					$(".loader").hide();
					$scope.activeGene = res[0];
					/*$scope.filterbc = isna($scope.$scope.activeGene.bcid.split(","));
					$scope.filterlc = isna($scope.$scope.activeGene.lcid.split(","));
					$scope.filterpc = isna($scope.$scope.activeGene.pcid.split(","));
					$scope.filtercc = isna($scope.$scope.activeGene.ccid.split(","));
					$scope.filterpn = isna($scope.$scope.activeGene.pncid.split(","));*/
					var geneTotal = $scope.activeGene.bcid.length + $scope.activeGene.lcid.length + $scope.activeGene.pcid.length + $scope.activeGene.ccid.length + $scope.activeGene.pncid.length;
					$scope.artcount = {"bc":$scope.activeGene.bcid.length,"lc":$scope.activeGene.lcid.length,"pc":$scope.activeGene.pcid.length,"cc":$scope.activeGene.ccid.length,"pn":$scope.activeGene.pncid.length};
					$scope.ttlcount = {"bc":$scope.bc.length,"lc":$scope.lung.length,"pc":$scope.prostate.length,"cc":$scope.colon.length,"pn":$scope.pancreatic.length};
					$scope.prctTotal = {"bc":$scope.activeGene.bcid.length/$scope.bc.length,"lc":$scope.activeGene.lcid.length/$scope.lung.length,"pc":$scope.activeGene.pcid.length/$scope.prostate.length,"cc":$scope.activeGene.ccid.length/$scope.colon.length,"pn":$scope.activeGene.pncid.length/$scope.pancreatic.length};
					$scope.prctGene = {"bc":$scope.activeGene.bcid.length/geneTotal,"lc":$scope.activeGene.lcid.length/geneTotal,"pc":$scope.activeGene.pcid.length/geneTotal,"cc":$scope.activeGene.ccid.length/geneTotal,"pn":$scope.activeGene.pncid.length/geneTotal};
					$scope.prctTotal = decimal($scope.prctTotal);
					$scope.prctGene = decimal($scope.prctGene);
					
				});
			}
			else{
				$scope.activeGene = "";
			}
		}
		else{
			console.log("Sorry an Error Occurred");
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
