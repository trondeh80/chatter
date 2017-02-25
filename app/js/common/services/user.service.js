'use strict';
(function () {

    angular.module('chatter').service('UserModel', UserModel);
    angular.module('chatter').service('UserService', UserService);
    angular.module('chatter').factory('UserLoader', UserLoader);

    function UserService(WEBAPI, $http, UserModel) {
        var user, sessionId, users;

        return {
            isAuthenticated: isAuthenticated,
            getUsers:getUsers,
            getUser: getUser,
            addUser: addUser,
            setUser: setUser,
            setAuthentication: setAuthentication
        };

        function getUsers(){
            return users || (users = UserModel.query(function(){
                    _(users).each(function(_u){
                        if (_u.id === getUser().id){
                            _u.isOnline = true;
                        }
                    }) ;
                })) ;
        }

        function addUser(user){
            var tuser = _(getUsers()).find(function(_u){
                return _u.id === user.id ;
            }) ;
            if (!tuser){
                users.push(user);
            }
        }

        function setAuthentication(user, sessionId) {
            setUser(user);
            setSessionId(sessionId);
            localStorage.setItem('authentication', angular.toJson({
                user: user,
                sessionId: sessionId
            }));
        }

        function setSessionId(id) {
            sessionId = id;
            $http.defaults.headers.common.Authorization = id;
        }

        function getUser() {
            return user || getAuthenticationStore().user;
        }

        function setUser(u) {
            u.isOnline = true ;
            user = u;
        }

        function getAuthenticationStore() {
            return angular.fromJson(localStorage.getItem('authentication'));
        }

        function getAuthentication() {
            var object = getAuthenticationStore();
            if (object) {
                setUser(object.user);
                setSessionId(object.sessionId);
            }
        }

        function isAuthenticated() {
            getAuthentication();
            return $http.get(WEBAPI + '/?mod=User&action=isAuthenticated').then(function (response) {
                if (response.data.isAuthenticated) {
                    UserModel.get({id: response.data.userId}, function (u) {
                        setAuthentication(u, response.data.sessionId);
                    });
                }
                return response;
            });
        }

    }

    function UserModel($resource, WEBAPI) {
        return $resource(WEBAPI + '/?mod=User', {id: '@id'});
    }

    function UserLoader(UserModel) {
        return function (id) {
            return UserModel.get({id: id}).$promise;
        }
    }

})();
