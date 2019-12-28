
const userInterface = require('db_interface/user_interface'),
    Response = require('utils/responses'),
    responseMsg = require('utils/response_messages'),
    StatusCodes = require('utils/status_codes'),
    bcrypt = require('bcrypt');

/**
 *
 * @param request
 * @param reply
 */
exports.signupUser = async (request, h) => {
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

        const [err_user, user_exist] = await userInterface.findOneUser({$or:[{email: data.email},{user_name:data.user_name}]});
        const checkPassword = String(data.password) === String(data.confirm_password) ? true : false;
        if (err_user || !checkPassword) {
            console.log(" Error in fetching user :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, (err_user)?responseMsg.ERROR:responseMsg.INVALID_PASSWORD, err_user);
            return response
        }

        let hash_password = await bcrypt.hash(data.password,10)
        console.log(" Encrypted password is :",hash_password)
        let data_create = {
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name,
            email: data.email,
            password: hash_password,
            contact_no: [data.contact_no],
            profile_image_url: data.profile_image_url,
            location: data.location,
            is_public: data.is_public,
            address: data.address
        }

        const [err_create, create_user] = await userInterface.createUser(data_create);
        if (err_create) {
            console.log(" Error in creation :", err_create)
            response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, responseMsg.ERROR, err_create);
            return response
            //response = h(Response.sendResponse(false, err_create, responseMsg.ERROR, StatusCodes.INTERNAL_SERVER_ERROR)).code(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        console.log(" Success in creation :", create_user)
        response = new Response(true, StatusCodes.CREATED, responseMsg.CREATED, create_user);
        //return response
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
        //return response
    }
    return response
};