const { MongoClient, Collection, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_STRING}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const cols = {};
async function run() {
  try {
    await client.connect();
    const petadoption = client.db("petadoption");
    const users = petadoption.collection("users");
    const pets = petadoption.collection("pets");
    cols.users = users;
    cols.pets = pets;
    console.log("pinged your database, connected");
  } catch (error) {
    console.log(error);
  } finally {
  }
}
run();

module.exports = cols;
