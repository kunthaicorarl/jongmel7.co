var appModule=angular.module("app",[]);
appModule.controller("MainControler",[
    "mobileUIViewService",
    "$scope",
    "$window",
    "$sce",
    function(
        mobileUIViewService,
        $scope,
        $window,
        $sce){
            var vm=this;

            vm.url=$sce.trustAsResourceUrl("https://kunthaicorarl.github.io/jongmel7.co/index.html");
            vm.filters=function(){
                 

            };
    mobileUIViewService.init($scope, $window, vm,
        function () {
            vm.filters();
        }
    );


}]);