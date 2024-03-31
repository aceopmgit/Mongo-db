const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; //it is written like this i.e., _db to signify it is used being internally in this file

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://aceopm:aceopmmongodb@cluster0.0mrcjbt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    //here in the previous line we are connecting with shop database if it exist and if not exist then it is created and then
    //connected .So in mongodb we do not need to create database prior  like in sql.
    //see video (7. Finishing the Database Connection) for understanding properly
    .then((client) => {
      console.log('**************************Connected!*******************************');
      _db = client.db() //here .db() will give us connection to shop database
      callback()
    }).catch((err) => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;//this is used to connect to the database and then storing the connection to the 
//database and therefore this will keep running
exports.getDb = getDb; //this returns access to that connected database
