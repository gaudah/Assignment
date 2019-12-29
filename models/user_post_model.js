const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')

    userSchema = new Schema({
        first_name: {type : String},
        last_name: {type : String},
        user_name: {type : String,unique:true},
        email: {type : String,unique:true},
        password: { type: String, default: null },
        contact_no: [{type : Number}],
        profile_image_url: {type : String},
        location: { type: String, default: "" },
        is_public:{type:Boolean, default:true}, // account type can be public or private
        access_token: { type: String, default: null }, // i.e token
        registered_on: { type: Date, default: new Date().toISOString() },
        last_logged_in: { type: Date},
        address: {type : String}
    }),
        commentSchema = new Schema({
            comment_by : {type: String},
            msg: {type:String},
            created_date:{type: Date},
            like: {type:Number}
        }),
    post = new Schema({
        title: {type : String},
            description: {type : String},
        post_type: {type : String}, // i.e post type can be image,written blog etc.
            post_by:userSchema,
        url: {type : String},
            tags: [{type : String}],
        likes: {type:Number},
        comment: [commentSchema],
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
    {strict: false });


autoIncrement.initialize(mongoose.connection);

post.plugin(autoIncrement.plugin, {
    model: 'post',
    field: 'id',
    startAt: 1,
    incrementBy: 1});

const checkStrCapitalize = (str) => {
    return str.match(/[A-Z]/);
}


post.methods.validTitle = function( title ) {
    let result = "Invalid title entered"
    if (checkStrCapitalize(title) === null) {
        result = this.title;
    }
    return result;

};

user = mongoose.model('user', userSchema, 'user');
post = mongoose.model('post', post, 'post');

module.exports = {
    user:user,
    post:post
}
//exports.post = mongoose.model('post', post, 'post');
