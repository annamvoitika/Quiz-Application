const mongoose = require('mongoose');
const { MongoMemoryServer }= require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

//connect to database
module.exports.connect = async() => {
    const uri = await mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    };
    await mongoose.connect(uri, mongooseOpts);
}

//close connection
module.exports.closeDatabase = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

//clear all db data after each test
module.exports.clearDatabase = async() => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}