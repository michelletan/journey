'use strict';

app.controller('IndexCtrl', function($scope){
    $scope.isLoading = false;

    // Public functions
    function showLoading() {
        $scope.isLoading = true;
    }

    function hideLoading() {
        $scope.isLoading = false;
    }
});
