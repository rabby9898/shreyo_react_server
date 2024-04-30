const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 2000;

//

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://shreyo00:NLMKV4i1HkxZ6J4Z@cluster0.qczjssr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    const createCollections = client
      .db("shreyoDB")
      .collection("createContract");

    app.post("/contracts", async (req, res) => {
      const contract = req.body;
      const result = await createCollections.insertOne(contract);
      res.send(result);
    });

    app.get("/contracts", async (req, res) => {
      const result = await createCollections.find().toArray();
      res.send(result);
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Shreyo Server..");
});

app.listen(port, () => {
  console.log(`Shreyo is running on port ${port}`);
});
