
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
        }
        console.log(" Success in creation :", create_user)
        response = new Response(true, StatusCodes.CREATED, responseMsg.CREATED, create_user);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.getAllUserDetails = async (request, h) => {
    let response
    try {

        const [err_user, user_details] = await userInterface.findAllUsers({});
        if (err_user) {
            console.log(" Error in fetching user details :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, err_user, err_user);
            return response
        }

        console.log(" Success in fetching user details :", user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.FETCHED, user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.getUserInfo = async (request, h) => {
    let response
    try {
        let data = {}

        if (typeof request.params === 'string') {
            data = JSON.parse(request.params);
        } else if (typeof request.params === 'object') {
            data = JSON.parse(JSON.stringify(request.params));
        } else {
            console.log('Unknown body type' + (typeof request.params));
        }

        if (data.user_id.length !== 24) {
            console.log(" Invalid user_id length ",data.user_id.length)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.INVALID_USER_ID, null);
            return response
        }
        const [err_user, user_details] = await userInterface.findOneUserDetails({"_id":request.params.user_id});
        if (err_user) {
            console.log(" Error in fetching user details :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.USER_NOT_PRESENT, {});
            return response
        }

        console.log(" Success in fetching user details :", user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.FETCHED, user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.updateUserInfo = async (request, h) => {
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

        if (request.params.user_id.length !== 24) {
            console.log(" Invalid user_id length ",request.params.user_id.length)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.INVALID_USER_ID, null);
            return response
        }
        let data_update = {
            first_name: data.first_name,
            last_name: data.last_name,
            contact_no: [data.contact_no],
            profile_image_url: data.profile_image_url,
            location: data.location,
            is_public: data.is_public,
            address: data.address
        }

        const [err_user, user_details] = await userInterface.findOneAndUpdateByCondition({"_id":request.params.user_id},data_update);
        if (err_user) {
            console.log(" Error in updating user details :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.USER_NOT_PRESENT, {});
            return response
        }

        console.log(" Success in updating user details :", user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.UPDATED, user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.deleteUserInfo = async (request, h) => {
    let response
    try {
        let data = {}

        if (typeof request.params === 'string') {
            data = JSON.parse(request.params);
        } else if (typeof request.params === 'object') {
            data = JSON.parse(JSON.stringify(request.params));
        } else {
            console.log('Unknown body type' + (typeof request.params));
        }

        if (data.user_id.length !== 24) {
            console.log(" Invalid user_id length ",data.user_id.length)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.INVALID_USER_ID, null);
            return response
        }
        const [err_user, user_details] = await userInterface.findOneAndDeleteByCondition({"_id":request.params.user_id});
        if (err_user) {
            console.log(" Error in deleting user details :", err_user)
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.USER_NOT_PRESENT, {});
            return response
        }

        console.log(" Success in deleting user details :", user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.DELETED, user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.loginUser = async (request, h) => {
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
        if (!data['email'] && !data['user_name']) {
            console.log("email or user_name must be provided ",data['email'],data['user_name'])
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.MANDATORY_EMAIL_USERNAME, null);
            return response
        }

        const [err_user, user_exist] = await userInterface.findOneUserDetails({$or:[{email: data.email},{user_name:data.user_name}]});
        if (err_user) {
            console.log(" Error in fetching user details :", err_user)
            response = new Response(false, StatusCodes.UNAUTHORIZED, responseMsg.INCORRECT_CREDENTIALS, null);
            return response
        }

        let hash_password = await bcrypt.compare(data.password,user_exist.password)
        console.log(" Decrypted password is :",hash_password)
        if (!hash_password) {
            response = new Response(false, StatusCodes.UNAUTHORIZED, responseMsg.INCORRECT_CREDENTIALS, null);
            return response
        }
        const [err_update_user, update_user_details] = await userInterface.findOneAndUpdateByCondition({"_id":user_exist._id},{last_logged_in: new Date()});

        console.log(" Success in login :", update_user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.LOGIN, update_user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};

/**
 *
 * @param request
 * @param reply
 */
exports.logoutUser = async (request, h) => {
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
        if (!data['email'] && !data['user_name']) {
            console.log("email or user_name must be provided ",data['email'],data['user_name'])
            response = new Response(false, StatusCodes.BAD_REQUEST, responseMsg.MANDATORY_EMAIL_USERNAME, null);
            return response
        }

        const [err_user, user_exist] = await userInterface.findOneUserDetails({$or:[{email: data.email},{user_name:data.user_name}]});
        if (err_user) {
            console.log(" Error in fetching user details :", err_user)
            response = new Response(false, StatusCodes.UNAUTHORIZED, responseMsg.INCORRECT_CREDENTIALS, null);
            return response
        }

        const [err_update_user, update_user_details] = await userInterface.findOneAndUpdateByCondition({"_id":user_exist._id},{access_token: null});

        console.log(" Success in logout :", update_user_details)
        response = new Response(true, StatusCodes.OK, responseMsg.LOGOUT, update_user_details);
    }
    catch (err) {
        response = new Response(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, err);
    }
    return response
};
