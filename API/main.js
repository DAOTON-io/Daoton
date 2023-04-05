//Api to write data to the mongo db database. It uses blockchain address to identify the user.

import express from 'express';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import config from './config.js';
// const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001')
import IPFS from 'nano-ipfs-store';

const ipfs = IPFS.at("https://ipfs.infura.io:5001");

// const fs = require('fs');
import fs from 'fs';
//getCurrentValue
import getCurrentValue from './utils/get_current_value.js';
const serverPort = 1423;
import cors from 'cors'
import axios from 'axios';
import { Stream } from 'stream';
const app = express();
var ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
app.use(cors())
app.use(bodyParser.json({limit: "10mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

var url = config.mongoUrl;

app.get('/', async (req, res) => {
    res.json("hi");
});

//Get DAOs collection from mongo db and return it in json format
app.get('/getDAOs', async (req, res) => {
    var db= await MongoClient.connect(url)
    var dbo = db.db("DAOTON");
    var result = await dbo.collection("DAOs").find({}).toArray();
    res.json(result);
    db.close();
});

//fake authentication for testing purposes only. It will be replaced by the real authentication.
//Create a JWT for the user using the blockchain address and return auth token
app.post('/auth', (req, res) => {
    var address = req.body.address;
    const user = { address: address };
    var token = jwt.sign(user, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
});

//Get Contracts filtered by DAO_Id from contracts collection from mongo db and return it in json format
app.get('/getContracts/:id', async (req, res) => {
    var db= await MongoClient.connect(url)
    var dbo = db.db("DAOTON");
    var result = await dbo.collection("Contracts").find({DAO_Id: req.params.id}).toArray()
    res.json(result);
    db.close();
});

app.get('/getContractDetails/:id', async (req, res) => {
    var db= await MongoClient.connect(url)
    var dbo = db.db("DAOTON");
    var result = await dbo.collection("Contracts").find({contract_address: req.params.id}).toArray()
    res.json(result);
    db.close();
});

//Save a new DAO in the DAOs collection in mongo db. Auth with JWT
app.post('/saveDAO', async (req, res) => {
    var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, config.secret, async function(err, decoded) {
    // if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    var db = await MongoClient.connect(url)
    var dbo = db.db("DAOTON");
    var sender = req.body.address;
    // create image file from base64 string and save it in the server
    var base64Data = req.body.DAO_Image.replace(/^data:image\/png;base64,/, "");
    await fs.writeFile("/root/ton/public/images/"+req.body.DAO_Name+".png", base64Data, 'base64', function(err) {
        console.log(err);
    });
    let image = fs.readFileSync("/root/ton/public/images/"+req.body.DAO_Name+".png")
    let imageBuffer = new Buffer(req.body.DAO_Image);
    // save image file in ipfs
    const result = await ipfs.add(imageBuffer);
    var myobj = { DAO_Name: req.body.DAO_Name, Creator: sender, DAO_Description: req.body.DAO_Description, DAO_Address: req.body.DAO_Address, DAO_Token_Address : req.body.DAO_Token_Address, DAO_Token_Symbol : req.body.DAO_Token_Symbol, DAO_Image: result};
    await dbo.collection("DAOs").insertOne(myobj)
    db.close();
    res.status(200).send({ auth: true, message: 'DAO saved successfully' });
    


    // var myobj = { DAO_Name: req.body.DAO_Name, Creator: sender, DAO_Description: req.body.DAO_Description, DAO_Address: req.body.DAO_Address, DAO_Token_Address : req.body.DAO_Token_Address, DAO_Token_Symbol : req.body.DAO_Token_Symbol};
    // await dbo.collection("DAOs").insertOne(myobj)
    // db.close();
    // res.status(200).send({ auth: true, message: 'DAO saved successfully' });
// });
});

//return image file from ipfs
app.get('/image/:cid', async (req, res) => {
    const cid = req.params.cid;
    //https://ipfs.filebase.io/ipfs/:cid returns base64 encoded image string but not the image itself. We need to decode it first.
    const url = "https://gateway.pinata.cloud/ipfs/"+cid;
    if (!fs.existsSync("/root/ton/public/images/"+cid+".png")) {
        try{
            const response = await fetch(url);
        const data = await response.text();
        //from string to image
        var base64Data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile("/root/ton/public/images/"+cid+".png", base64Data, 'base64', function(err) {
            console.log(err);
        }
        );
    }catch(error){
                console.log(error);
            }
    }
    //send image to the client
    const r = fs.createReadStream("/root/ton/public/images/"+cid+".png") // or any other way to get a readable stream
  const ps = new Stream.PassThrough() // <---- this makes a trick with stream error handling
  Stream.pipeline(
   r,
   ps, // <---- this makes a trick with stream error handling
   (err) => {
    if (err) {
      console.log(err) // No such file or any other kind of error
      return res.sendStatus(400); 
    }
  })
  ps.pipe(res)
    
});


//Save a new contract in the contracts collection in mongo db. Auth with JWT
app.post('/saveContract', async (req, res) => {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, config.secret, async function(err, decoded) {
        // if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        var db = await MongoClient.connect(url)
        var dbo = db.db("DAOTON");
        var sender = req.body.address;
        var myobj = { contract_name: req.body.contract_name, contract_address: req.body.contract_address, contract_description: req.body.contract_description, DAO_Id: req.body.DAO_Id};
        await dbo.collection("Contracts").insertOne(myobj)
        db.close();
        res.status(200).send({ auth: true, message: 'Contract saved successfully' });
    // });
});

//get current value of a contract
app.get('/getCurrentValue/:id', async (req, res) => {
    
        res.json(getCurrentValue(req.id));

});


app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`));

