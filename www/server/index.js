const express = require('express');
const bodyParser = require('body-parser');
const storageData = require('./storage/data.json');
const cors = require('cors');
const app = express();

app.listen(8888);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/products/add", bodyParser.json(), function(req, res) {
    console.log(req.body)
if (!req.body.name || !req.body.description || !req.body.price) return res.json({success: false, message: "Complete all fields."});
var productId = Date.now();
if (!storageData[productId]) {
    storageData[productId] = {
        name: "",
        description: "",
        price: ""
    };
};
storageData[productId] = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
};
res.json({success: true, message: "Successfully added."});
});

app.post("/products/remove", bodyParser.json(), function(req, res) {
if (!req.body.productId) return res.json({success: false, message: "Complete all fields."});
if (!storageData[req.body.productId]) return res.json({success: false, message: "Unexistant product."});
delete storageData[req.body.productId];
res.json({success: true, message: "Successfully removed."});
});

app.get("/products", bodyParser.json(), function(req, res) {
res.json({success: true, message: storageData});
});