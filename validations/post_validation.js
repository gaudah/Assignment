const Joi = require('joi');

module.exports = (() => {
    return {

        create_post : {
            payload: {
                title: Joi.string().required().example('Pqr').description('This will be the title of post.'),
                description: Joi.string().example('Rst').description('This will be the description of post.'),
                //post_type: Joi.string().valid('IMG', 'Story','Video','Boomerang','Live','URL','Written_blog').required().example('IMG').description('type of email template'),
                post_type: Joi.string().valid('IMG', 'Story','Video','Audio','URL','Written_blog').required().example('IMG').description('post_type of post'),
                post_by: Joi.string().required().example('xyz_pqr').description('This will be the username who is posting the post'),
                path: Joi.string().example('/home/xyz/Downloads/trial.png').description('This will be the path of image or video or audio we want to post'),
                url: Joi.string().example('https://www.noupe.com/design/image-vector-editing/create-seo-friendly-urls-web-images-cloudinary-98839.html').description('This will be the post url'),
                post_hidden_from: Joi.array().items(Joi.string().example('Pqr').description('This will be the username of user from which we want to hide post.')).required(),
                is_like: Joi.boolean().example('true').description('This will be the post we want to like').default(false),
                tags: Joi.array().items(
                    Joi.string().example('xyz##118989').description('This will be the username to whom we want to tag'),
                ).required(),
                comment:  Joi.array().items(
                    Joi.object({
                        msg: Joi.string().required().example('post is nice').description('post message'),
                        is_like: Joi.boolean().example('true').description('This will be the comment we want to like').default(false),

                    }).required()
                ).required(),
            },
        },
    };
})();
