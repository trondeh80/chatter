(function () {
    'use strict';
    angular.module('chatter').directive('chatMessage', chatMessage);
    angular.module('chatter').controller('ChatMessage', chatMessageController);

    function chatMessage() {
        return {
            restrict: 'E',
            replace:true,
            scope: {
                message: '='
            },
            template: require('./chatMessage.directive.html'),
            controller: 'ChatMessage',
            controllerAs: 'msg'
        }
    }

    function chatMessageController($scope){
        var vm = this ;
        activate() ;

        function activate(){
            vm.message = $scope.message;
        }
    }

})();
