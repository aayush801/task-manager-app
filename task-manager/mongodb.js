// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID();
console.log(id);


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log("unable to connect");
    }

    const db = client.db(databaseName);

    const makePromise = db.collection("list").deleteMany({completed : true})

    makePromise.then((result) => {
        console.log(result)
    }).catch((resolve) => {
        console.log(resolve)
    })
})




