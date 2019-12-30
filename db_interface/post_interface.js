const model = require('models/user_post_model');
const responseMsg = require('utils/response_messages');

const createPost = async (data) => {
    try {

        const create_post = await model.post.create(data);
        return [null,create_post];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }

};

exports.createPost = createPost