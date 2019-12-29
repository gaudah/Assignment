const Joi = require('joi');

module.exports = (() => {
    return {

        create_user : {
            payload: {
                first_name: Joi.string().example('Aishwarya').description('This will be the first_name of user.'),
                last_name: Joi.string().example('Gaud').description('This will be the last_name of user.'),
                user_name: Joi.string().required().example('aishwarya_gaud').description('This will be the username'),
                email: Joi.string().required().example('aishwaryagaud17@gmail.com').description('This will be the email'),
                password: Joi.string().required().example('xyz##118989').description('This will be the password'),
                confirm_password: Joi.string().required().example('xyz##118989').description('This will be the confirm password'),
                //contact_no: Joi.number().required().example('9096556535').description('This will be the contact number').length(10),
                contact_no: Joi.number().required().example('9096556535').description('This will be the contact number'),
                profile_image_url: Joi.string().example('https://www.noupe.com/design/image-vector-editing/create-seo-friendly-urls-web-images-cloudinary-98839.html').description('This will be the profile image url'),
                location: Joi.string().example('Pune').description('This will be the current location of user.'),
                is_public:Joi.boolean().example('true').description('This will be the account type of user.'),
                address: Joi.string().example('Xyz road,Shivajinagar, Pune 411052').description('This will be the address of user.')
            },
        },
        get_user_info : {
            params: {
                user_id : Joi.string().required().example('5e07a051c70f8b54dda7e3e9').description('This will be user id.')},
        },
    };
})();
