(function () {
    'use strict';
    angular.module('chatter').factory('chatEventFactory', chatEvent);

    function chatEvent($rootScope, UserService) {

        var Chat = chatConstructor;
        Chat.prototype.messageReceived = messageReceived;
        Chat.prototype.userConnected = userConnected;
        Chat.prototype.userChanged = userChanged;

        return {
            create: create
        };

        function create(service) {
            return new Chat(service);
        }
        // this conludes the factory

        function chatConstructor(service) {
            this.service = service;
        }

        function messageReceived(message) {
            $rootScope.$broadcast('chat.messageevent', message);
        }

        function userConnected(user) {
            UserService.addUser(user);
            $rootScope.$broadcast('chat.useronline', user);
        }

        function userChanged(user) {
            // this.service.updateUser(user);
        }
    }

})();
