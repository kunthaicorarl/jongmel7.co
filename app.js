var appModule=angular.module("app",[]);
appModule.controller("MainControler",[
    "mobileUIViewService",
    "$scope",
    "$window",
    function(
        mobileUIViewService,
        $scope,
        $window){
            var vm=this;
            vm.url="https://kunthaicorarl.github.io/jongmel7.co/index.html";
            vm.filters=function(){
                 

            };
    mobileUIViewService.init($scope, $window, vm,
        function () {
            vm.filters();
        }
    );


}]);