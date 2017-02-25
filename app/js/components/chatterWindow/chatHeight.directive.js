
(function () {
    'use strict';
    angular.module('chatter').directive('chatHeight', chatHeight) ;

    function chatHeight(windowService){
        return {
            restrict:'A',
            link: linkFn
        };

        function linkFn(scope, element){
            var height = windowService.getScreenHeight();
            var offset = 50 + 100 ;
            element.css('height', height - offset + 'px');
        }
    }

})();
