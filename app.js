var appModule=angular.module("app",[]);
appModule.config([
    function () {
       

    }]);


appModule.controller("MainControler",[
    "mobileUIViewService",
    "$scope",
    "$window",
    "$sce",
    "$http",
    "$timeout",
    "$window",
    function(
        mobileUIViewService,
        $scope,
        $window,
        $sce,
        $http,
        $timeout,
        $window){
            var vm=this;
            vm.urlFeed="http://www.jongmel7.co/feeds/posts/summary?alt=json";
            //initialize option table app
            vm.currentUrl=$window.location.href;
            vm.itemPerPage =50;
            vm.tableState = {
                pagination: {
                    start: 0,
                    number: vm.itemsPerPage
                },
                sort: {
                    predicate: "",
                    reverse: false
                }
            };
            vm.model={};
            vm.url=$sce.trustAsResourceUrl("https://kunthaicorarl.github.io/jongmel7.co/index.html");
            vm.filters = function (arg) {
                vm.tableState.pagination.start = 0;
                vm.postAll = [];
                vm.init(vm.tableState);
            };
            vm.init=function(tableState){
                vm.tableState = tableState;
                vm.tableState.pagination.number = vm.itemPerPage;
                var pagination = tableState.pagination;
                    vm.start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
                    vm.number = pagination.number || vm.itemPerPage;  // Number of entries showed per page.
                    var filters = {
                        method: 'POST',
                        url: vm.urlFeed,
                        headers: {
                          'Content-Type': undefined
                        },
                        data: {  
                            'max-results': vm.number,
                            'start-index': vm.start,
                         }
                    };
                    vm.loading = true;
                    vm.success = false;
                    $http(filters).then(function(result){
                       console.log(result);
                       vm.posts=result.data.feed.entry;
                       initMobileViewData(result);
                    }).finally(function () {
                        if (!vm.success)
                            vm.loading = false;
                    });

            };
            vm.tageList=[
                {name:"HD"},
                {name:"Khmer Movie"},
                {name:"Chinese"}
                          ];
    mobileUIViewService.init($scope, $window, vm,
        function () {
            vm.filters();
        }
    );
    function initMobileViewData(result) {
        if (vm.isMobileView) {
            vm.success = true;
            $timeout(function () {
                if (vm.postAll == null ||
                    vm.postAll.length == 0) {
                    vm.postAll = vm.posts;
                }
                else {
                    angular.forEach(vm.posts, function (item) {
                        vm.postAll.push(item);
                    });
                }
                vm.tableState.pagination.numberOfPages = Math.ceil(parseInt(result.data.feed.openSearch$totalResults.$t) / vm.number);
                vm.loading = false;
            }, 200);

        } else {
            vm.tableState.pagination.numberOfPages = Math.ceil(parseInt(result.data.feed.openSearch$totalResults.$t) / vm.number);
        }
       
    }

}]);