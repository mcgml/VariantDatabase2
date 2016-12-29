angular.module('variantdatabase.test', ['ngRoute', 'ngSanitize', 'ngAnimate', 'mgo-angular-wizard', 'ui.bootstrap', 'ui-notification', 'nvd3' ,'ngFileSaver'])

    .controller('TestCtrl', ['$rootScope', '$scope', '$http', 'Notification', '$uibModal', '$window','framework', '$anchorScroll','FileSaver', 'Blob', function ($rootScope, $scope, $http, Notification, $uibModal, $window, framework, $anchorScroll, FileSaver, Blob) {

        $scope.donutChartOptions = {
            chart: {
                type: 'pieChart',
                donut: true,
                height : 250,
                showLabels: false,
                color : function (d, i) { var key = i === undefined ? d : i; return d.color || framework.getScaledCat20(key); },
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                pie: {
                    dispatch: {
                        elementClick: function(e) {
                            $scope.selectedVariantFilter = e.index;
                            $scope.currentPage = 0;
                            $scope.pageCount = Math.ceil($scope.filteredVariants.filters[$scope.selectedVariantFilter]["y"] / $scope.itemsPerPage) - 1;
                            $scope.selectedAll = false;
                            $scope.$apply();
                        }
                    }
                }
            }
        };

        $scope.filterVariants = function () {
            $http.post('/api/variantdatabase/variant/filter', savedVariantFilters)
                .then(function(response) {
                    $scope.filteredVariants = response.data;
                    $scope.donutChartOptions.chart.title = response.data.total;
                    Notification('Operation successful');
                }, function(response) {
                    Notification.error(response);
                    console.log("ERROR: " + response);
                });
        };

        $http.get('/api/variantdatabase/dataset/info', {})
            .then(function(response) {
                $scope.datasets = response.data;
            }, function(response) {
                Notification.error(response);
                console.log("ERROR: " + response);
            });

        $http.get('/api/variantdatabase/workflow/info', {})
            .then(function (response) {
                $scope.workflows = response.data;
            }, function (response) {
                Notification.error(response);
                console.log("ERROR: " + response);
            });
    }]);