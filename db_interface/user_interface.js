
const model = require('models/user_post_model');
const responseMsg = require('utils/response_messages');

const findOneUser = async (condition) => {
    try {
        const check_user_exist = await model.user.findOne(condition);
        if (check_user_exist) {
            return [responseMsg.USER_ALREADY_EXISTS];
        }
        return [null,check_user_exist];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
};

const createUser = async (data) => {
    try {

        const create_mandate = await model.user.create(data);
        return [null,create_mandate];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }

};

const findAllUsers = async (condition) => {
    try {
        const check_user_exist = await model.user.find(condition);
        return [null,check_user_exist];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
};

const findOneUserDetails = async (condition) => {
    try {
        const check_user_exist = await model.user.findOne(condition);
        if (!check_user_exist) {
            return [responseMsg.USER_NOT_PRESENT];
        }
        return [null,check_user_exist];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
};

const findOneAndUpdateByCondition = async (condition, data)  => {
    try {
        const check_user_exist = await model.user.findOneAndUpdate(condition,data);
        if (!check_user_exist) {
            return [responseMsg.USER_NOT_PRESENT];
        }
        return [null,check_user_exist];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
};

const findOneAndDeleteByCondition = async (condition) => {
    try {
        const check_user_exist = await model.user.findOneAndDelete(condition);
        if (!check_user_exist) {
            return [responseMsg.USER_NOT_PRESENT];
        }
        return [null,check_user_exist];
        /*const check_user_exist = await model.user.remove(condition);
        if (!check_user_exist) {
            return [responseMsg.USER_NOT_PRESENT];
        }
        return [null,check_user_exist];*/
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
    /*user.remove(condition).then(success_data => {
        success_callback(success_data);
    }, error_data => {
        error_callback(error_data);
    });*/
};

exports.findOneUser = findOneUser;
exports.createUser = createUser;
exports.findAllUsers = findAllUsers;
exports.findOneUserDetails = findOneUserDetails;
exports.findOneAndUpdateByCondition = findOneAndUpdateByCondition;
exports.findOneAndDeleteByCondition = findOneAndDeleteByCondition