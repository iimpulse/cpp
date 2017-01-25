angular.module('statsDirective', []).directive('tablestat',function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            scope.counts = JSON.parse(attrs.tablestatCounts);
            var prctGene = JSON.parse(attrs.tablestatPrctgene);
            var prctTotal = JSON.parse(attrs.tablestatPrcttotal);
            var ttlcount = JSON.parse(attrs.tablestatTotalcount);
            var gene = attrs.tablestatGene;
            var cancerLookup = {bc:"Bladder",lc:"Lung",cc:"Colon",pn:"Pancreatic",pc:"Prostate"};
            var html = "<tr style=\"border-bottom:solid 1px black;\">\
				<td>Tumor<br> Type</td>\
				<td>" + gene + "<br>Articles</td>\
				<td>Total<br> Articles</td>\
				<td>%" + gene + "<br>(By Tumor)</td>\
				<td>%" + gene + "<br>(By Gene)</td>\
				</tr>";
          
            var sorted = Object.keys(scope.counts).sort(function(a,b){return scope.counts[b]-scope.counts[a]})
            for(var item in sorted){
            	if(isNaN(prctGene[sorted[item]])){
            		prctGene[sorted[item]] = 0.0000;
            	}
            	html += "<tr>\
				<td>" + cancerLookup[sorted[item]] + "</td>\
				<td>" + scope.counts[sorted[item]] + "</td>\
				<td>" + ttlcount[sorted[item]] + "</td>\
				<td>" + prctTotal[sorted[item]] + "</td>\
				<td>" + prctGene[sorted[item]] + "</td>\
				</tr>";
            }
            //sort the keys 
            //return the values
            var markup = $compile(html)(scope);
        	el.append(markup);
            
          
        }
    };
});
