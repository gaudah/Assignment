
const userInterface = require('db_interface/user_interface'),
    postInterface = require('db_interface/post_interface'),
    Response = require('utils/responses'),
    responseMsg = require('utils/response_messages'),
    StatusCodes = require('utils/status_codes'),
    _ = require('lodash'),
    fs = require('fs');

const checkStrCapitalize = (str) => {
    return str.match(/[A-Z]/);
}

const validTitle = ( title ) => {
    let result = responseMsg.INVALID_TITLE
    if (checkStrCapitalize(title) === null) {
        result = title;
    }
    return result;
};

/**
 *
 * @param request
 * @param reply
 */
exports.createPost = async (request, h) => {
    let response
    try {
        let data = {}

        if (typeof request.payload === 'string') {
            data = JSON.parse(request.payload);
        } else if (typeof request.payload === 'object') {
            data = JSON.parse(JSON.stringify(request.payload));
        } else {
            console.log('Unknown body type' + (typeof request.payload));
        }
        let post_err;

        post_err = (data.post_type === 'URL' && !data.url)?responseMsg.INVALID_URL:(((data.post_type === 'IMG') || (data.post_type === 'Video') || (data.post_type === 'Audio')) && !data.path)?responseMsg.INVALID_PATH:null

        if (post_err || validTitle(data.title) === responseMsg.INVALID_TITLE ) {
            console.log(" Error in post_type :", post_err)
            response = new Response(false, StatusCodes.BAD_REQUEST, post_err || responseMsg.INVALID_TITLE, post_err || null);
            return response
        }

        let condition = {user_name: data.post_by}
        if (data.tags.length > 0) {
            data.tags.push(data.post_by)
            condition = {user_name: {$in: data.tags}}
        }
        const [err_user, user_exist] = await userInterface.findAllUsers(condition);

        let filter_user_details = user_exist.filter((each_user) => {
            if (each_user.user_name === data.post_by) {
                return each_user
            }
        })
        if (err_user || filter_user_details.length === 0) {
            console.log(" Error in fetching user :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, err_user || responseMsg.USER_NOT_PRESENT, err_user || null);
            return response
        }
        let filter_tags = user_exist.map((each_user) => {
            return each_user.user_name;
        });

        let filter_valid_tags = _.uniq( _.union(filter_tags, [filter_user_details[0].user_name]));

        /*let base64Str
        if (data.path) {
            base64Str = new Buffer(fs.readFileSync(data.path)).toString("base64")
        }*/
        let data_update = {
            title: data.title,
            description: data.description,
            post_type: data.post_type,
            url: data.url,
            post_hidden_from: data.post_hidden_from,
            likes: (data.is_like)?1:0,
            tags: filter_valid_tags,
            comment:data.comment.map((each_comment) => {
                return {
                    comment_by: data.user_name,
                    msg: each_comment.msg,
                    created_date: new Date(),
                    like: (each_comment.is_like)?1:0,
                }
            }),

            location: data.location,
        }

        const [err_update_user, user_details] = await userInterface.findOneAndUpdateByCondition({"_id":filter_user_details[0]._id},{$push: {'posts': data_update}},{new: true});
        if (err_update_user) {
            console.log(" Error in updating user details :", err_update_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.USER_NOT_PRESENT, {});
            return response
        }
        console.log(" Success in creation of post :", user_details)
        response = new Response(true, StatusCodes.CREATED, responseMsg.CREATED, user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

