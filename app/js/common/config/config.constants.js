(function () {
    'use strict';

    var mainAddr = 'chat.holk.no' ;

    angular.module('chatter').constant('WEBADDR','http://' + mainAddr) ;
    angular.module('chatter').constant('WEBSOCKET','ws://' + mainAddr + '/chatsocket') ;
    angular.module('chatter').constant('WEBAPI','http://' + mainAddr+'/api.php') ;
    angular.module('chatter').constant('WEBUPLOAD','http://' + mainAddr+'/upload.php') ;
    angular.module('chatter').constant('DATEFORMAT','DD/MM YYYY HH:mm') ;
    angular.module('chatter').constant('DBDATEFORMAT','YYYY-MM-DD HH:mm:ss') ;
    angular.module('chatter').constant('PAGEHEIGHT', Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight)
    )

})();
