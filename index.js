const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fos1t9l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const productCollection = client.db('emaJohnDb').collection('products');

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            console.log(product);
            const result = await productCollection.insertOne(product)
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('from server');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
