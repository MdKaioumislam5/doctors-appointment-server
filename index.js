const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hq31bdr.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    const doctorsAppointmentCollection = client.db("doctorsAppointment").collection("appointOptions");
    app.get("/doctorsAppointment", async (req, res) => {
        const query = {}
        const cursor = doctorsAppointmentCollection.find(query)
        const result = await cursor.toArray();
        res.send(result)
    })
}
run().catch(console.error)

app.get('/', (req, res) => {
  res.send('Finally doctors-appointment-server running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})