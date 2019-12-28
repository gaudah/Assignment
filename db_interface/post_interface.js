import post from 'models/post_post_model'

const deletePost = (key, value, success_callback, error_callback) => {
    const condition = {};
    condition[key] = value;
    post.remove(condition).then(success_data => {
        success_callback(success_data);
    }, error_data => {
        error_callback(error_data);
    });
};


const findOnePost = (key, value, success_callback, error_callback) => {
    const condition = {};
    condition[key] = value;
    post.findOne(condition).then(success_data => {
        if(success_data) {
            success_callback(success_data);
        } else {
            error_callback(null);
        }
    }, error_data => {
        error_callback(error_data);
    });
};

const findPost = (condition) => {
    return post.findOne(condition);
};

const findPostsByCondition = (condition, parameters, success_callback, error_callback) => {
    if(parameters === undefined) {
        parameters = {};
    }
    post.find(condition, parameters).then(success_data => {
        if(success_data !== null) {
            success_callback(success_data);
        } else {
            error_callback(success_data);
        }
    }, error_data => {
        error_callback(error_data);
    });
};


const createPost = (projectObject, success_callback, error_callback) => {

    const projectModelObject = new post(projectObject);

    projectModelObject.save((err, docs) => {
        if(err) {
            error_callback(err);
        } else {
            success_callback(docs);
        }
    });

};


const updatePost = (projectObject, success_callback, error_callback) => {

    projectObject.save((err, docs) => {
        if(err) {
            error_callback(err);
        } else {
            success_callback(docs);
        }
    });

};

const findOneAndUpdateByCondition = (condition, objectToUpdate, success_callback, error_callback)  => {
    "use strict";
    post.findOneAndUpdate(condition, objectToUpdate, {new: true}, (err, result) => {
        if(err) {
            error_callback(err);
        } else {
            success_callback(result);
        }
    })
};

const findPostsByOrCondition = (condition, parameters, success_callback, error_callback) => {
    if(parameters === undefined) {
        parameters = {};
    }
    post.or(condition, parameters).then(success_data => {
        if(success_data !== null) {
            success_callback(success_data);
        } else {
            error_callback(success_data);
        }
    }, error_data => {
        error_callback(error_data);
    });
};

const updatePostByCondition = (condition, parameters) => {
    return post.collection.update(condition, parameters);
};


exports.deletePost = deletePost;
exports.findOnePost = findOnePost;
exports.findPostsByCondition = findPostsByCondition;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.findOneAndUpdateByCondition = findOneAndUpdateByCondition;
exports.findPost = findPost;
exports.findPostsByOrCondition = findPostsByOrCondition;
exports.updatePostByCondition = updatePostByCondition;
