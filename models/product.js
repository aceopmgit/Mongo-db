const mongodb = require('mongodb')
const getDb = require('../util/database').getDb; // this gives us access to the database and we can use it interact with our database


class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new mongodb.ObjectId(id);
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this }) //to understand update watch video 14 of nosql
    }
    else {
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then(result => {
        console.log('***************************************************', result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products
      }).catch((err) => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()// here next is used because here also find will return the cursor and since here find has aonly one document , next moves us to that document
      .then((product) => {
        console.log(product);
        return product;
      }).catch((err) => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log('Product Deleted');
      }).catch((err) => {
        console.log(err)
      })

  }
}


module.exports = Product;
