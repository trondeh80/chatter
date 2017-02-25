(function () {
    'use strict';
    angular.module('chatter').service('windowService', windowService) ;

    function windowService(){
        return {
            getScreenHeight:getScreenHeight
        } ;

        function getScreenHeight(){

            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight;

            return y;

        }
    }
})();
