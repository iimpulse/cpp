angular.module('popoverDirective', []).directive('popover', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            scope.authors = attrs.popoverAuth;
            var abstract = [];
            scope.abstract = attrs.popoverAbs;
            scope.gene = attrs.popoverGene;
            $(el).popover({
                trigger: 'hover',
                html: true,
                title:attrs.popoverTitle,
                content:function(){
                    var abstract = scope.abstract.split(" ");
                    for(i = 0; i < abstract.length; i++){
			            var word = abstract[i].replace(/[.,;()]/,"")
                        word =word.replace(/[.,;()]/,"") // lazy replace all.
                        word = word.toUpperCase();
                        if(scope.gene == word){
                            abstract[i] = "<mark>" + abstract[i] + "</mark>";     
                        }

                    }
                    abstract = abstract.join(" ");
                    return ("<h5>Author(s)</h5>" + scope.authors  + "<h5>Abstract</h5>"  + abstract);

                },
                placement: "left"
            });

        }
    };
});
