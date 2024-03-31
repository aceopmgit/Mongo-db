const getDb = require('../util/database').getDb; // this gives us access to the database and we can use it interact with our database


class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log('***************************************************', result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


module.exports = Product;
