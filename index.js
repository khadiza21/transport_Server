const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("mental application");
});


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trassyes.mixiffr.mongodb.net/?retryWrites=true&w=majority&appName=trassyes`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    const reviewCollection = client.db("trasportsytem").collection("review");
    const categoriesCollection = client
      .db("trasportsytem")
      .collection("categories");
    const cartypesCollection = client
      .db("trasportsytem")
      .collection("cartypes");
    const userCollection = client.db("trasportsytem").collection("users");
    const busDriverCollection = client
      .db("trasportsytem")
      .collection("busdriveraccount");
    const carDriverCollection = client
      .db("trasportsytem")
      .collection("cardriveraccount");
    const aboutCart = client.db("trasportsytem").collection("aboutcart");


    //  for user and admin 
    // crate user admin a
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
//find all users and admin
    app.get("/users", async (req, res) => {
      const userlists = await userCollection.find().toArray();
      res.send(userlists);
    });
//find one user/admin 
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: id };
      console.log(query);
      const result = await userCollection.findOne(query);
      console.log(result);
      res.send(result);
    });




    // busdriver
    app.post("/busdriveraccount", async (req, res) => {
      const busdriver = req.body;
      const query = { email: busdriver.email };
      const existingBusDriver = await busDriverCollection.findOne(query);
      if (existingBusDriver) {
        return res.send({ message: " already exists", insertedId: null });
      }
      const result = await busDriverCollection.insertOne(busdriver);
      res.send(result);
    });

    app.get("/busdriveraccount", async (req, res) => {
      const busdriverlist = await busDriverCollection.find().toArray();
      res.send(busdriverlist);
    });

    app.get("/busdriveraccount/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await busDriverCollection.findOne(query);
      res.send(result);
    });



    // cardriver
    app.post("/cardriveraccount", async (req, res) => {
      const cardriver = req.body;
      const query = { email: cardriver.email };
      const existingCarDriver = await carDriverCollection.findOne(query);
      if (existingCarDriver) {
        return res.send({ message: " already exists", insertedId: null });
      }
      const result = await carDriverCollection.insertOne(cardriver);
      res.send(result);
    });

    app.get("/cardriveraccount", async (req, res) => {
      const cardriverlist = await carDriverCollection.find().toArray();
      res.send(cardriverlist);
    });


    // car items types 
    app.get("/cartypes", async (req, res) => {
      const cartypesresult = await cartypesCollection.find().toArray();
      res.send(cartypesresult);
    });


    // service category
    app.get("/categories", async (req, res) => {
      const catresult = await categoriesCollection.find().toArray();
      res.send(catresult);
    });


    // all reviews 
    app.get("/review", async (req, res) => {
      const revresult = await reviewCollection.find().toArray();
      res.send(revresult);
    });

    // about page data
    app.get("/aboutcart", async (req, res) => {
      const aboutc = await aboutCart.find().toArray();
      res.send(aboutc);
    });

    console.log("connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`this is bk ${port}`);
});
