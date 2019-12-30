const userController = require('../controller/user_controller')
const postController = require('../controller/post_controller')
const userValidation = require('validations/user_validation')
const userFactory = require('factory/user_factory');

module.exports = [
    { method: 'POST',path: '/signup', config: userController.userSignup},
    { method: 'POST',path: '/login', config: userController.userLogin},
    { method: 'POST',path: '/logout', config: userController.userLogout},
    { method: 'GET', path: '/user', config: userController.getAllUserDetails},
    { method: 'GET', path: '/user/{user_id}', config: userController.getUserInfo },
    { method: 'PUT', path: '/user/{user_id}', config: userController.updateUserInfo },
    { method: 'DELETE',path: '/user/{user_id}', config: userController.deleteUserInfo },

    { method: 'POST',path: '/post', config: postController.createPost},
];




