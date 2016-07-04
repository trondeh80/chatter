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

    function ChatPageController(chatService){
        var vm = this ;

        activate();

        function activate(){
            vm.messages = chatService.getMessagesByRoom(1); //1 for test.
        }
    }

})();
