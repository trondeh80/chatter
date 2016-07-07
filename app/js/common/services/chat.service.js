/**
 * Created by teh on 04.07.2016.
 */
(function () {
    'use strict';
    angular.module('chatter').service('chatService', chatService);

    function chatService($http) {
        var api = 'http://chat.holk.no' ;
        return {
            getMessagesByRoom: getMessageByRoom,
            sendMessage: sendMessage
        } ;

        function getMessageByRoom(roomId){
            return [
                {id:1,userId:1,text:'Hi there',timestamp: new Date().getTime()*1000},
                {id:2,userId:1,text:'Hi there you',timestamp: new Date().getTime()*1000+2000}
            ] ;
        }

        function sendMessage(message) {
            return $http.post(api+'/chat.php?mod=chat&action=send',{
                message:message
            });
        }
    }

})();