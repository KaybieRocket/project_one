/**
 * My Client Application
 */
angular.module('client', ['stripe'])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        'use strict';
        $scope.mySillyText = "Welcome to the mind of K.B. Rocket";
        $scope.priceMessage = "";
        $scope.bikeColor = "";
        $scope.popAlert = function () {
            alert('i do not want to say hello. i cannot stand the hello world stuff and etc.')
        };
        $scope.checkPrice = function (bikeColor) {
            $http.get('/checkPrice', {params: {bikeColor: bikeColor}})
                .success(function (response) {
                    $scope.bikeColor = bikeColor;
                    $scope.priceMessage = response.availability;
                });
        };
        $scope.saveCustomer = function stripeResponseHandler(status, response) {
            if (response.error) {
                // show the errors on the form
                $(".payment-errors").text(response.error.message);
            } else {
                var token = response.id;
                $http.post('/stripe', {stripeToken: token});
            }
        };
    }]).run([function () {
        Stripe.setPublishableKey('pk_test_Cg7dxMFhOjXhdtows9LKrvbN');
    }]);