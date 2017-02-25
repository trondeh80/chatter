(function () {
    'use strict';
    angular.module('chatter').directive('chatMessage', chatMessage);
    angular.module('chatter').controller('ChatMessage', chatMessageController);

    function chatMessage() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                message: '='
            },
            template: require('./chatMessage.directive.html'),
            controller: 'ChatMessage',
            controllerAs: 'msg'
        }
    }

    function chatMessageController($scope, chatService, UserService) {
        var vm = this;
        vm.isOwn = isOwn;
        vm.getUserName = getUserName ;
        activate();

        function activate() {
            vm.message = $scope.message;
        }

        function isOwn() {
            return UserService.getUser().id === vm.message.userId;
        }

        function getUserName(){
            var user = _(UserService.getUsers()).find(function(user){
                return user.id === vm.message.userId ;
            });
            return user ? user.name : 'anon' ;
        }
    }

})();
