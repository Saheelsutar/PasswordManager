
const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const cors=require('cors')

dotenv.config()

const app = express()
const port = 3000
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';
client.connect();

app.use(cors());

app.use(bodyparser.json())
//Get all the passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save a password
app.post('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const data = await collection.insertOne(password);
res.send({success:true,result:data})
})

//Delete a password by id
app.delete('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const data = await collection.deleteOne(password);
res.send({success:true,result:data})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
