import express from "express";
import cors from "cors";
import 'dotenv/config';

import {MongoClient} from 'mongodb';

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db('game-store');
const games = database.collection('games');


const PORT = process.env.PORT;

client.connect();
console.log("MongoDB is connected");


const app = express();
app.use(cors());
app.use(express.json());



app.listen(PORT,()=>{ console.log("App is running"); });

app.get('/', async(req, res)=>{
const allGames =  await  games.find().toArray();
res.json(allGames);

});

app.post('/add', async(req, res)=>{
    let newName = (Math.random() + 1).toString(36).substring(7);
    let gameName = 'New Game is '+newName;
  await  games.insertOne({name: gameName,favorite: true});
  res.json('Item was added.');
});


