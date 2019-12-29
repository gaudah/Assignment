const userController = require('../controller/user_controller')
const postController = require('../controller/post_controller')
const userValidation = require('validations/user_validation')

module.exports = [
    { method: 'GET', path: '/user', options: userController.getAllUserDetails },
    { method: 'GET', path: '/user/{user_id}', options: userController.getUserInfo },
    { method: 'PUT', path: '/user/{user_id}', options: userController.updateUserInfo },
    { method: 'DELETE', path: '/user/{user_id}', options: userController.deleteUserInfo },
    {
        method: 'POST',
        path: '/signup',
        options: userController.userSignup
    },
    //{ method: 'PUT', path: '/user/{user_id}', options: userController.updateUserInfo },
    //{ method: 'DELETE', path: '/user/{user_id}', options: userController.deleteUser },
];




