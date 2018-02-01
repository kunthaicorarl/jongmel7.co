/*
 * by robert on 21-06-2017
 * using for filter mobile view   such as : 
 * filter
 */
appModule.factory("mobileUIViewService", function () {
    var app = {
        init: function ($scope, $window, context,callback) {

            /*start function dynamic filter */
            context.isMobileView = false;
            context.isMobileViewScreenOnly = false;
            var w = angular.element($window);
            $scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
                $scope.windowHeight = newValue.h;
                $scope.windowWidth = newValue.w;
                //console.log(newValue);
                context.windowWid = newValue.w;
                if (newValue.w <= 768) {
                    context.isMobileView = true;
                    context.isMobileViewScreenOnly = true;
                    if (typeof callback === "function") callback();

                } else {
                    context.isMobileView = false;
                    context.isMobileViewScreenOnly = false;
                }
            }, true);

            w.bind('resize', function () {
                $scope.$apply();
            });
        }
    };
    return app;
});