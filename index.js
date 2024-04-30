const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('mental application')
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trassyes.mixiffr.mongodb.net/?retryWrites=true&w=majority&appName=trassyes`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
   
    const reviewCollection = client.db("trasportsytem").collection("review");
    const categoriesCollection = client.db("trasportsytem").collection("categories");
    const cartypesCollection = client.db("trasportsytem").collection("cartypes");

    app.get('/review', async(req, res) => {
      const revresult = await reviewCollection.find().toArray();
      res.send(revresult);
    })
    

   
    app.get('/categories', async(req, res) => {
      const catresult = await categoriesCollection.find().toArray();
      res.send(catresult);
    })


    app.get('/cartypes', async(req, res) => {
      const cartypesresult = await cartypesCollection.find().toArray();
      res.send(cartypesresult);
    })
   
   
    console.log("connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=> {
    console.log(`this is bk ${port}`);
})