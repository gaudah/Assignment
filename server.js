require('app-module-path').addPath(__dirname);
const Hapi = require('hapi');
const hapiAuthJWT = require('hapi-auth-jwt2');
const JWT         = require('jsonwebtoken');  // used to sign our content
const port        = process.env.PORT || 8000; // allow port to be set
const Joi = require('joi');
const mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:27017/innoplexus_db';
const Routes = require('./routes/routes');
const constants = require('./utils/constants')
const secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!

const people = {
    1: {
        id: 1,
        name: 'Anthony Valid User'
    }
};

// use the token as the 'authorization' header in requests
const token = JWT.sign(people[1], secret); // synchronous
console.log(token);
// bring your own validation function
const validate = async function (decoded, request, h) {
    console.log(" - - - - - - - decoded token:");
    console.log(decoded);
    console.log(" - - - - - - - request info:");
    console.log(request.info);
    console.log(" - - - - - - - user agent:");
    console.log(request.headers['user-agent']);

    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return { isValid: false };
    }
    else {
        return { isValid : true };
    }
};

const init = async() => {
    const server = new Hapi.Server({  port: 5000,
        host: 'localhost' });
    await server.register(hapiAuthJWT);
    // see: http://hapijs.com/api#serverauthschemename-scheme
    server.auth.strategy('jwt', 'jwt',
        { key: secret,
            validate,
            verifyOptions: { ignoreExpiration: true }
        });

    server.auth.default('jwt');
    for (let route in Routes) {
        console.log(Routes[route])
        await server.route(Routes[route]);
    }

    await server.start();
    // Once started, connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl,{ useNewUrlParser: true }).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
    return server;


};

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});
