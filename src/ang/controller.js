angular.module("main.controller",[]).controller("genericCtrl",['$scope','dataFactory',function($scope,dataFactory){
	
	angular.element(document).ready(function(){
		$(".loader").hide();
		$scope.cancers = ["bladder","lung","prostate","colon","pancreatic"];
	});
	$('.typeAhead').typeahead({
		  showHintOnFocus:true,
		  autoSelect:false,
		  afterSelect:compare,
		  source: function (query, process) {
		     $.ajax({
			      url: "/data/symbols?q=" + query, 
			      type: 'GET',
			      dataType: 'json',
			      async:true,
			  	 }).done(function (data) {
			        // in this example, json is simply an array of strings
			        return process(data);
			       });
		      },
		   displayText: function(item){
		   		return item.gene;
		   }
		 });


	//check to see which gene is selected
	
		function compare(){
			var current = $('.typeSelect').typeahead("getActive");
			if(current){
				if(current.gene == $('.typeSelect').val()){
					$scope.activeGene = current;
					$(".loader").show();
					$(".loader").hide();
					/*$scope.filterbc = isna($scope.$scope.activeGene.bcid.split(","));
					$scope.filterlc = isna($scope.$scope.activeGene.lcid.split(","));
					$scope.filterpc = isna($scope.$scope.activeGene.pcid.split(","));
					$scope.filtercc = isna($scope.$scope.activeGene.ccid.split(","));
					$scope.filterpn = isna($scope.$scope.activeGene.pncid.split(","));*/
					dataFactory.getArticles(current).then(function(data){
						if(!data){

							throw err;
						}
						else{
							$scope.articles = data;
							console.log($scope.articles);
							var geneTotal = $scope.activeGene.bcid.length + $scope.activeGene.lcid.length + $scope.activeGene.pcid.length + $scope.activeGene.ccid.length + $scope.activeGene.pncid.length;
							$scope.artcount = {"bc":$scope.activeGene.bcid.length,"lc":$scope.activeGene.lcid.length,"pc":$scope.activeGene.pcid.length,"cc":$scope.activeGene.ccid.length,"pn":$scope.activeGene.pncid.length};
							$scope.ttlcount = {"bc":$scope.articles.bc.length,"lc":$scope.articles.lung.length,"pc":$scope.articles.prostate.length,"cc":$scope.articles.colon.length,"pn":$scope.articles.pancreatic.length};
							$scope.prctTotal = {"bc":$scope.activeGene.bcid.length/$scope.articles.bc.length,"lc":$scope.activeGene.lcid.length/$scope.articles.lung.length,"pc":$scope.activeGene.pcid.length/$scope.articles.prostate.length,"cc":$scope.activeGene.ccid.length/$scope.articles.colon.length,"pn":$scope.activeGene.pncid.length/$scope.articles.pancreatic.length};
							$scope.prctGene = {"bc":$scope.activeGene.bcid.length/geneTotal,"lc":$scope.activeGene.lcid.length/geneTotal,"pc":$scope.activeGene.pcid.length/geneTotal,"cc":$scope.activeGene.ccid.length/geneTotal,"pn":$scope.activeGene.pncid.length/geneTotal};
							$scope.prctTotal = decimal($scope.prctTotal);
							$scope.prctGene = decimal($scope.prctGene);
							$scope.tab = "summary";
						}
					});
					
				}
				else{
					$scope.activeGene = "";
				}
			}
			else{
				console.log("Sorry an Error Occurred");
			}
	};

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
