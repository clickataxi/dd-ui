angular.module('dd.ui.busy-element', [])

.directive('busyElement', ['$parse', '$timeout', '$rootScope', function ($parse, $timeout, $rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl:'template/busy-element/busy-element.html',
        scope: {
            busy: '=?',
            status: '=?',
            timeout: '=?'
        },
        link: function (scope, element, attr) {
            updateSize();

            scope.$watch('status', function() {
                updateSize();
                if (scope.status !== undefined) {
                    scope.busy = false;
                    scope.statusClass = scope.status;

                    if (scope.timeout !== 0) {
                        $timeout(function(){
                            scope.status = null;
                        }, scope.timeout ? scope.timeout : 500);
                    }
                }
            });

            function updateSize() {
                var container = attr.busyElement ? angular.element(attr.busyElement) : element.parent();
                var offset = container.offset();
                element.offset(offset);

                scope.width = container.innerWidth();
                scope.height = container.innerHeight();
                scope.marginLeft = container.css('padding-left');
                scope.marginTop = container.css('padding-top');
            }
        }
    };
}]);