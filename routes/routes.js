const userController = require('../controller/user_controller')
const postController = require('../controller/post_controller')
const userValidation = require('validations/user_validation')

module.exports = [
    { method: 'POST',path: '/signup', options: userController.userSignup},
    { method: 'POST',path: '/login', options: userController.userLogin},
    { method: 'POST',path: '/logout', options: userController.userLogout},
    { method: 'GET', path: '/user', options: userController.getAllUserDetails },
    { method: 'GET', path: '/user/{user_id}', options: userController.getUserInfo },
    { method: 'PUT', path: '/user/{user_id}', options: userController.updateUserInfo },
    { method: 'DELETE',path: '/user/{user_id}', options: userController.deleteUserInfo },

    //{ method: 'PUT', path: '/user/{user_id}', options: userController.updateUserInfo },
    //{ method: 'DELETE', path: '/user/{user_id}', options: userController.deleteUser },
];




