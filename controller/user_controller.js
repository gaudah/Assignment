
const userValidation = require('validations/user_validation'),
      postValidation = require('validations/post_validation'),
      userFactory = require('factory/user_factory'),
      responseMsg = require('utils/response_messages'),
      StatusCodes = require('utils/status_codes'),
      Response = require('utils/responses')



/**
 *
 * API for user signup
 */

exports.userSignup  = {
    handler: userFactory.signupUser,
    description: 'User signup',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.create_user,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API to get all user details
 */

exports.getAllUserDetails  = {
    handler: userFactory.getAllUserDetails,
    description: 'Get all user details',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    //validate: userValidation.create_user,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API to get user details of specific user
 */

exports.getUserInfo  = {
    handler: userFactory.getUserInfo,
    description: 'Get user details of specific user',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.get_user_info,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API to update user details
 */

exports.updateUserInfo  = {
    handler: userFactory.updateUserInfo,
    description: 'Update user details',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.update_user_info,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API to delete user details
 */

exports.deleteUserInfo  = {
    handler: userFactory.deleteUserInfo,
    description: 'Delete user details',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.get_user_info,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API for user login
 */

exports.userLogin  = {
    handler: userFactory.loginUser,
    description: 'User login',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.login_user,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}

/**
 *
 * API for user logout
 */

exports.userLogout  = {
    handler: userFactory.logoutUser,
    description: 'User logout',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: userValidation.logout_user,
    plugins: {
        'hapi-swagger': {
            responses: {
                '201': [],
                '406': {
                    'description': 'Validation Error.'
                }
            }
        }
    }
}