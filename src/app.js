;(function(window) {
    "use strict";

    var angular = window.angular || (window.angular = {});

    angular.module("app", [])
        .controller("MainCtrl", MainCtrl)
        .directive("calculator", calculator);

    MainCtrl.$inject = ["$scope"];
    function MainCtrl($scope) {}


    function calculator() {
        return {
            templateUrl: "calculator.html",
            restrict: "E",
            controller: function($scope) {
                $scope.action = null;
                $scope.activeTerm = 1;
                $scope.firstTerm = 0;
                $scope.secondTerm = 0;
                $scope.expression = 0;
                $scope.result = 0;

                $scope.reset = reset;
                $scope.toggleSign = toggleSign;
                $scope.percentage = percentage;
                $scope.setAction = setAction;
                $scope.calculate = calculate;
                $scope.updateExpression = updateExpression;

                function reset() {
                    $scope.action = null
                    $scope.activeTerm = 1;
                    $scope.firstTerm = 0;
                    $scope.secondTerm = 0;
                    $scope.expression = 0;
                    $scope.result = 0;
                }

                function toggleSign() {
                    switch ($scope.activeTerm) {
                        case 1:
                            $scope.firstTerm = -parseFloat($scope.firstTerm);
                            $scope.expression = $scope.firstTerm;
                            break;
                        case 2:
                            $scope.secondTerm = -parseFloat($scope.secondTerm);
                            $scope.expression = $scope.secondTerm;
                            break;
                    }
                }

                function percentage() {
                    switch ($scope.activeTerm) {
                        case 1:
                            $scope.firstTerm = $scope.firstTerm / 100;
                            $scope.expression = $scope.firstTerm;
                            break;
                        case 2:
                            $scope.secondTerm = $scope.secondTerm / 100;
                            $scope.expression = $scope.secondTerm;
                            break;
                    }
                }

                function setAction(action) {
                    $scope.action = action;
                    $scope.expression = $scope.secondTerm;
                    $scope.activeTerm = 2;
                }

                function calculate() {
                    if (!$scope.firstTerm || !$scope.secondTerm || !$scope.action) {
                        return;
                    }

                    switch ($scope.action) {
                        case "divide":
                            $scope.result = parseFloat($scope.firstTerm) / parseFloat($scope.secondTerm);
                            break;
                        case "multiply":
                            $scope.result = parseFloat($scope.firstTerm) * parseFloat($scope.secondTerm);
                            break;
                        case "substract":
                            $scope.result = parseFloat($scope.firstTerm) - parseFloat($scope.secondTerm);
                            break;
                        case "sum":
                            $scope.result = parseFloat($scope.firstTerm) + parseFloat($scope.secondTerm);
                            break;
                    }

                    $scope.expression = $scope.result;
                    $scope.firstTerm = $scope.result;
                    $scope.secondTerm = 0;
                }

                function updateExpression(symbol) {
                    switch ($scope.activeTerm) {
                        case 1:
                            $scope.firstTerm = $scope.firstTerm ? String($scope.firstTerm) + String(symbol) : symbol;
                            $scope.expression = $scope.firstTerm;
                            break;
                        case 2:
                            $scope.secondTerm = $scope.secondTerm ? String($scope.secondTerm) + String(symbol) : symbol;
                            $scope.expression = $scope.secondTerm;
                            break;
                    }
                }
            },
        }
    }
})(window);
