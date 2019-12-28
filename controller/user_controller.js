
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