angular.module("main.controller",[]).controller("genericCtrl",['$scope','dataFactory',function($scope,dataFactory){
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
	angular.element(document).ready(function(){
		$(".loader").hide();
		$scope.cancers = ["bladder","lung","prostate","colon","pancreatic"];
			dataFactory.getTotals().then(function(response){
				if(!response.data){
					throw err;
				}else{

					$scope.totals = response.data;

				}
			});
	});
	$('.typeAhead').typeahead({
		  showHintOnFocus:false,
		  autoSelect:true,
		  afterSelect:compare,
		  source: function (query, process) {
		     if(query != ""){
			$.ajax({
			      url: "/data/symbols?q=" + query.toUpperCase(), 
			      type: 'GET',
			      dataType: 'json',
			      async:true,
			  	 }).done(function (data) {
			        // in this example, json is simply an array of strings
			        return process(data);
			       });
		      }	      
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
					$scope.articles = null;
					$(".loader").show();
					dataFactory.getArticles(current).then(function(response){
						if(!response.data){

							throw err;
						}
						else{
							$scope.articles = response.data;
							console.log($scope.articles);
							$scope.activeGene.bcid = isNothing($scope.activeGene.bcid.split(","));
							$scope.activeGene.lcid = isNothing($scope.activeGene.lcid.split(","));
							$scope.activeGene.pcid = isNothing($scope.activeGene.pcid.split(","));
							$scope.activeGene.pncid = isNothing($scope.activeGene.pncid.split(","));
							$scope.activeGene.ccid = isNothing($scope.activeGene.ccid.split(","));
							var geneTotal = $scope.activeGene.bcid.length + $scope.activeGene.lcid.length + $scope.activeGene.pcid.length + $scope.activeGene.ccid.length + $scope.activeGene.pncid.length;
							$scope.artcount = {"bc":$scope.activeGene.bcid.length,"lc":$scope.activeGene.lcid.length,"pc":$scope.activeGene.pcid.length,"cc":$scope.activeGene.ccid.length,"pn":$scope.activeGene.pncid.length};
							$scope.ttlcount = {"bc":$scope.totals.bladder,"lc":$scope.totals.lung,"pc":$scope.totals.prostate,"cc":$scope.totals.colon,"pn":$scope.totals.pancreatic};
							$scope.prctTotal = {"bc":$scope.activeGene.bcid.length/$scope.totals.bladder,"lc":$scope.activeGene.lcid.length/$scope.totals.lung,"pc":$scope.activeGene.pcid.length/$scope.totals.prostate,"cc":$scope.activeGene.ccid.length/$scope.totals.colon,"pn":$scope.activeGene.pncid.length/$scope.totals.pancreatic};
							$scope.prctGene = {"bc":$scope.activeGene.bcid.length/geneTotal,"lc":$scope.activeGene.lcid.length/geneTotal,"pc":$scope.activeGene.pcid.length/geneTotal,"cc":$scope.activeGene.ccid.length/geneTotal,"pn":$scope.activeGene.pncid.length/geneTotal};
							$scope.prctTotal = decimal($scope.prctTotal);
							$scope.prctGene = decimal($scope.prctGene);
							$scope.lineChartlabels = ["Bladder", "Colon", "Lung", "Prostate", "Pancreatic"];
  							$scope.lineChartseries = ['Gene Frequency(%)'];
							$scope.lineChartData = [[$scope.prctGene.bc * 100,$scope.prctGene.cc * 100, $scope.prctGene.lc * 100, $scope.prctGene.pn * 100, $scope.prctGene.pc * 100]];
							$scope.tab = "summary";
							$(".loader").hide();
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

	function isNothing(articles){
		if(articles.length == 0 || articles == "NA"){
			return [];
		}
		return articles;
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
