/**
 * Created by weihanqing on 15/12/14.
 */
'use strict';
(function (angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'],
            function (angular) {
                return factory(angular);
            });
    } else {
        if(typeof module !== 'undefined' && typeof exports === 'object') {
            module.exports = factory(angular);
        } else {
            return factory(angular);
        }
    }
}(angular, function (angular) {
    var app = angular.module('ngStaticDateRange', [])
        .directive('ngStaticDateRange', [
            '$parse',
            '$filter',
            function () {
                return {
                    restrict: 'A',
                    scope: {
                        rangeCount: '@',
                        rangeModel: '=',
                        onRangeChange: '&'
                    },
                    link: function (scope, $element, $attributes) {
                        var options = {};
                        options.rangeCount = $attributes.rangeCount || 7;
                        options.format = $attributes.format || 'yyyy-MM-dd';
                        options.separator = $attributes.separator || ' ~ ';
                        options.btnClass = $attributes.btnClass || 'btn-primary';
                        options.float = $attributes.float || 'left';

                        var rangeModel = scope.rangeModel;
                        var startDate = new Date();
                        startDate.setHours(0, 0, 0, 0);
                        var hours = (new Date()).getHours();

                        // 如果当前时间在0~6,日期-1
                        if (hours >= 0 && hours < 6) {
                            startDate.setDate(startDate.getDate() - 1);
                        }

                        var endDate = new Date(startDate);
                        endDate.setDate(endDate.getDate() + options.rangeCount - 1);

                        if (!rangeModel.startDate) {
                            rangeModel.startDate = new Date(startDate);
                            rangeModel.endDate = new Date(endDate);
                        } else {
                            endDate = new Date(rangeModel.startDate);
                            endDate.setDate(endDate.getDate() + options.rangeCount - 1);
                            rangeModel.endDate = endDate;
                        }

                        var Helper = {

                            next: function () {
                                this.query(options.rangeCount);
                            },

                            previous: function () {
                                this.query(-(options.rangeCount));
                            },

                            query: function (range) {
                                var startDate = scope.rangeModel.startDate;
                                var endDate = scope.rangeModel.endDate;

                                startDate.setDate(startDate.getDate() + range);
                                endDate.setDate(endDate.getDate() + range);
                                scope.onRangeChange({$dateRange: scope.rangeModel});
                            },

                            init: function (options) {
                                scope.hasInit = true;
                            }
                        };

                        scope.options = options;
                        scope.Helper = Helper;
                    },
                    template: '<div class="clearfix"> <div class="pull-{{options.float}}"> <button type="button" class="btn {{options.btnClass}}" ng-click="Helper.previous()">< 前{{options.rangeCount}}天</button> <span class="form-control" style="width: 200px; vertical-align: middle;display: inline-block;">{{rangeModel.startDate | date : options.format}}{{options.separator}}{{rangeModel.endDate | date : options.format}}</span> <button type="button" class="btn {{options.btnClass}}" ng-click="Helper.next()">后{{options.rangeCount}}天 ></button> </div> </div> </div>'

                };
            }
        ]);

    return app;
}));
