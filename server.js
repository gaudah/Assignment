require('app-module-path').addPath(__dirname);
const Hapi = require('hapi'),
      hapiAuthJWT = require('hapi-auth-jwt2'),
      config = require('config');
      mongoose = require('mongoose'),
      MongoDBUrl = `mongodb://${config.database.mongo.host}:${config.database.mongo.port}/${config.database.mongo.name}`;
      Routes = require('./routes/routes'),
      constants = require('./utils/constants'),
      secret = constants.JWT_SECRET, // Never Share This! even in private GitHub repos!
      userInterface = require('./db_interface/user_interface');

// bring your own validation function
const validate = async function (decoded, request, h) {
    try {
        let user_id = (request.params)?request.params.user_id:"",
            user_name = ""
        if (request.payload) {
            user_name = (request.payload.user_name)?(request.payload.user_name):(request.payload.post_by)?(request.payload.post_by):"";
        }

        let email = (request.payload)?request.payload.email:"";
        if ((user_id === "" || user_id === undefined) && (user_name === "" || user_name === undefined) && (email === "" || email === undefined)) {
            user_id = decoded.userId
        }

        // do your checks to see if the person is valid
        const [err_user, user_details] = await userInterface.findOneUserDetails({$or: [{_id: user_id},{email:email},{user_name:user_name}]});

        if (err_user) {
            console.log(" Error in fetching user details :", err_user)
            return {isValid: false};
        } else {
            let result = {isValid: true}
            if (String(user_details.access_token) !== String(request.headers['authorization'])) {
                console.log(" Invalid Session ")
                result.isValid = false
                result.errorMessage = "Invalid Session"
                result.statusCode = 407
            }
            console.log(" Token result ",result)
            return result
        }
    }
    catch (e) {
        console.log(" Error in validate method of server :",e)
    }
};

const init = async() => {
    /*const server = new Hapi.Server({  port: 5000,
        host: 'localhost' });*/
    const server = new Hapi.Server({ port: `${config.server.port}`, host: `${config.server.host}`});
    await server.register(hapiAuthJWT);
    // see: http://hapijs.com/api#serverauthschemename-scheme
    server.auth.strategy('jwt', 'jwt',
        { key: secret,
            validate,
            verifyOptions: { ignoreExpiration: false }  // ignore expired tokens if set to true
        });

    server.auth.default('jwt');

    for (let route in Routes) {
        console.log(Routes[route])
        await server.route(Routes[route]);
    }

    await server.start();
    // Once started, connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl,{ useNewUrlParser: true }).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    return server;


};

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});
