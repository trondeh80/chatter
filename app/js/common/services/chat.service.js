(function () {
    'use strict';
    angular.module('chatter').service('chatService', chatService);

    function chatService($http, $rootScope, chatEventFactory, WEBSOCKET, UserService) {

        var socket = null;
        var users = [], messages = [];
        var chatEvents;

        var service = {
            getMessagesByRoom: getMessageByRoom,
            sendMessage: sendMessage,
            getRooms: getRooms
        };

        activate();

        return service;

        function activate() {
            chatEvents = chatEventFactory.create(service);
            getSocket();
        }

        function getMessageByRoom(roomId) {
            return messages;
        }

        function sendMessage(message) {
            var messagePacket = {
                action: 'messageReceived',
                data: message
            };
            send(messagePacket);
        }

        function send(packet) {
            getSocket().send(JSON.stringify(packet));
        }

        function getRooms() {
            return [{id: 1, name: 'Standard'}];
        }

        function getSocket() {
            if (!socket || socket.readyState > 1) {
                socket = new WebSocket(WEBSOCKET);
                socket.onopen = onConnection;
                socket.onmessage = onMessage;
            }
            return socket;
        }

        function onConnection() {
            var userEvent = {
                action: 'userConnected',
                data: UserService.getUser()
            };
            send(userEvent);
        }

        function onMessage(e) {
            var msg = JSON.parse(e.data);
            chatEvents[msg.action].call(chatEvents, msg.data);
        }
    }

})();