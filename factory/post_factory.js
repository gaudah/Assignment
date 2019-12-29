
const userInterface = require('db_interface/user_interface'),
    postInterface = require('db_interface/post_interface'),
    Response = require('utils/responses'),
    responseMsg = require('utils/response_messages'),
    StatusCodes = require('utils/status_codes'),
    bcrypt = require('bcrypt');

const fs = require('fs')
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

        if (post_err ) {
            console.log(" Error in post_type :", post_err)
            response = new Response(false, StatusCodes.BAD_REQUEST, post_err, post_err);
            return response
        }

        let condition = {user_name: data.post_by}
        if (data.tags.length > 0) {
            data.tags.push(data.post_by)
            condition = {user_name: {$in: data.tags}}
        }
        const [err_user, user_exist] = await userInterface.findAllUsers(condition);
        if (err_user || user_exist.length === 0) {
            console.log(" Error in fetching user :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, err_user || responseMsg.USER_NOT_PRESENT, err_user || null);
            return response
        }
        let filter_user_details = user_exist.filter((each_user) => {
            if (each_user.user_name === data.post_by) {
                return each_user
            }
        })
        /*let base64Str
        if (data.path) {
            base64Str = new Buffer(fs.readFileSync(data.path)).toString("base64")
        }*/
        let data_create = {
            title: data.title,
            description: data.description,
            post_type: data.post_type,
            post_by: filter_user_details[0],
            path: data.path,
            url: data.url,
            post_hidden_from: data.post_hidden_from,
            likes: (data.is_like)?1:0,
            tags: (data.tags.length > 0)?data.tags: [],
            comment:(data.comment.length > 0)?[{
                comment_by: data.user_name,
                msg: data.comment.msg,
                created_date: new Date(),
                like: (data.comment.is_like)?1:0
            }]:[],
            location: data.location,
        }
        const [err_create, create_post] = await postInterface.createPost(data_create);
        if (err_create) {
            console.log(" Error in creation of post :", err_create)
            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, responseMsg.ERROR, err_create);
            return response
        }
        console.log(" Success in creation of post :", create_post)
        response = new Response(true, StatusCodes.CREATED, responseMsg.CREATED, create_post);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

