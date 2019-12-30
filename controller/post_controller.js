
const postValidation = require('validations/post_validation'),
    postFactory = require('factory/post_factory');



/**
 *
 * API to create post
 */

exports.createPost  = {
    //auth: 'jwt',
    auth: false,
    handler: postFactory.createPost,
    description: 'Create Post',
    tags: ['api', 'post'],
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
