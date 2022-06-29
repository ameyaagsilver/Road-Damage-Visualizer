console.log("Starting the server...");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path')
var admin = require("firebase-admin");

var serviceAccount = require("./serviceKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://road-damage-detector-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.firestore();


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log("Express JS App is listening on your localhost:3000...");
    let allDamages = getAllDamages();
    // console.log(allDamages);
});

async function getAllDamages() {
    let allDamages = [];
    (await db.collection('Damages').get()).forEach(document => {
        allDamages.push(document.data());
    });

    // console.log(allDamages);
    return allDamages;
}

app.get('/allDamages', (req, res) => {
    console.log("Requesting for damages...")
    getAllDamages().then((allDamages) => {
        res.send(allDamages);
    });
})

app.get('/', (req, res) => {
    res.sendFile('D:/Projects/Road Damage Visualizer/client/map.html');
})

app.use(express.static(path.join('D:/Projects/Road Damage Visualizer/client','css')));