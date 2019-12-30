
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
        console.log("USER GET :",check_user_exist)
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
        const check_user_exist = await model.user.findOneAndUpdate(condition,data,{new: true});
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
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }
};

const findAggregatedQueryResponse = async (aggregatedArray) => {
    try {
        const check_user_exist = await model.user.aggregate(aggregatedArray);
        return [null,check_user_exist];
    }
    catch (e) {
        console.log(" Error :",e);
        return [e];
    }

};


exports.findOneUser = findOneUser;
exports.createUser = createUser;
exports.findAllUsers = findAllUsers;
exports.findOneUserDetails = findOneUserDetails;
exports.findOneAndUpdateByCondition = findOneAndUpdateByCondition;
exports.findOneAndDeleteByCondition = findOneAndDeleteByCondition;
exports.findAggregatedQueryResponse = findAggregatedQueryResponse;