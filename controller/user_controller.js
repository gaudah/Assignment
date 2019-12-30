
const userValidation = require('validations/user_validation'),
      postValidation = require('validations/post_validation'),
      userFactory = require('factory/user_factory'),
      responseMsg = require('utils/response_messages'),
      StatusCodes = require('utils/status_codes'),
      Response = require('utils/responses');
const Joi = require('joi');


/**
 *
 * API for user signup
 */

exports.userSignup  = {
    auth: false,
    handler: userFactory.signupUser,
    description: 'User signup',
    tags: ['api', 'user'],
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
    auth: 'jwt',
    handler: userFactory.getAllUserDetails,
    description: 'Get all user details',
    tags: ['api', 'user'],
    validate: {
        headers: Joi.object({
        'authorization': Joi.string().required()}).options({allowUnknown: true})},

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
    auth: 'jwt',
    handler: userFactory.getUserInfo,
    description: 'Get user details of specific user',
    tags: ['api', 'user'],
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
    auth: 'jwt',
    handler: userFactory.updateUserInfo,
    description: 'Update user details',
    tags: ['api', 'user'],
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
    auth: 'jwt',
    handler: userFactory.deleteUserInfo,
    description: 'Delete user details',
    tags: ['api', 'user'],
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
    auth: false,
    handler: userFactory.loginUser,
    description: 'User login',
    tags: ['api', 'user'],
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
    auth: 'jwt',
    handler: userFactory.logoutUser,
    description: 'User logout',
    tags: ['api', 'user'],
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