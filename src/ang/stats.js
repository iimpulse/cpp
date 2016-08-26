angular.module('statsDirective', []).directive('tablestat', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            scope.counts = attrs.tablestatCounts;
            scope.cancers = attrs.tablestatCancers;
            //sort the keys 
            //return the values
            
          
        }
    };
});
