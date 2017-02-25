(function () {
    'use strict';
    angular.module('chatter').directive('chatPage', chatPage);
    angular.module('chatter').controller('ChatPage', ChatPageController);

    function chatPage() {
        return {
            restrict: 'E',
            replace:true,
            template: require('./chatPage.html'),
            controller:'ChatPage',
            controllerAs : 'chatter'
        }
    }

    function ChatPageController($rootScope, chatService, UserModel, UserService){
        var vm = this ;
        vm.send = send ;

        activate();

        function activate(){
            vm.messages = chatService.getMessagesByRoom(1); //1 for test.
            vm.rooms = chatService.getRooms();
            vm.users = UserService.getUsers();

            $rootScope.$on('chat.messageevent', messageEvent) ;
            $rootScope.$on('chat.useronline', userOnlineEvent) ;

        }

        function messageEvent(event, msg){
            $rootScope.$apply(function(){
                vm.messages.push(msg);
            }) ;
        }

        function userOnlineEvent(user){
            $rootScope.$apply(function(){
                _(vm.users).each(function(_user){
                    if (_user.id === user.id) {
                        user.isOnline = true ;
                    }
                });
            }) ;
        }

        function send(){
            var msg = {
                isOwn:true,
                userId:UserService.getUser().id,
                text: vm.message,
                timestamp: new Date().getTime()*1000
            };
            vm.messages.push(msg);
            vm.message = '';
            return chatService.sendMessage(msg);
        }

    }

})();
