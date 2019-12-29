
const userValidation = require('validations/user_validation'),
    postValidation = require('validations/post_validation'),
    postFactory = require('factory/post_factory'),
    responseMsg = require('utils/response_messages'),
    StatusCodes = require('utils/status_codes'),
    Response = require('utils/responses')



/**
 *
 * API to create post
 */

exports.createPost  = {
    handler: postFactory.createPost,
    description: 'Create Post',
    tags: ['api', 'user'],
    auth: false,
    //auth : 'simple',
    validate: postValidation.create_post,
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
