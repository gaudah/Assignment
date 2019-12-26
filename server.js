'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');

const MongoDBUrl = 'mongodb://localhost:27017/innoplexus_db';
const Routes = require('./Routes/RoutesHapi.js')

const server = Hapi.server({
    port: 5000,
    host: 'localhost'
});


server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return "Application is running";
        }
    });


for (var route in Routes) {
   console.log(Routes[route])
   server.route(Routes[route]);
}


(async () => {
  try {  
    await server.start();
    await server.register(require('inert'));

    // Once started, connect to Mongo through Mongoose 
    mongoose.connect(MongoDBUrl,{ useNewUrlParser: true }).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {  
    console.log(err)
  }
})();





