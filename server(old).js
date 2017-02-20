var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products');

app.use('/',express.static(path.join(__dirname,"/app")));
/*var products=[   
    {id:1, name:'Ayur Natural Rajastharo', price:110, stock:150, packing:'100 gm', description: 'Mehendi', status : true},
    {id:2, name:'Bruajiosdr ser es ', price:400, stock:15, packing:'50 g', description: 'Hair gel', status : true}, 
    {id:3, name:'Brejwi Osr Ser', price:199, stock:50, packing:'100 g', description: 'Fuiejrnew', status : true},
    {id:4, name:'Jerkwejo', price:174, stock:5, packing:'200 ml', description: 'Fuisodf', status : true},
    {id:5, name:'JLrjewir Asd', price:110, stock:30, packing:'100 ml', description: 'sdfjskf', status : true},
    {id:6, name:'18 FJosdf', price:275, stock:15, packing:'100 gm', description: 'SDfsdfs', status : true},
    {id:7, name:'Jiosdfu S', price:25, stock:50, packing:'100 g', description: 'ASd Asd', status : true}
];*/

var products = require('./models/products');
var ProNum = products.length;
console.log(products);
console.log(ProNum);

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json


app.get('/products', function(req, res){
		res.json(products);
});

app.get('/product/:id', function(req, res) {
    var id = req.params.id;

    for (i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            res.json(products[i]);
        }
    }
});

app.post('/product', function(req, res) {
	//get new id
    ProNum++;
    var product = {
        "id": ProNum,
        "name": req.body.name,
		"price": req.body.price,
        "stock": req.body.stock,
        "packing": req.body.packing,
        "description": req.body.description,
        "status" : req.body.status
    };
    products.push(product);
    res.send("created a new product");
});

app.put('/product/:id', function(req, res) {
    var id = req.params.id;
    for (i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            products[i].name = req.body.name;
			products[i].price = req.body.price;
            products[i].stock = req.body.stock;
            products[i].packing = req.body.packing;
            products[i].description = req.body.description;
            products[i].status = req.body.status;
            res.send("updated done");
        }
    }

});

app.delete('/product/:id', function(req, res) {
    var id = req.params.id;
    for (i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            products.splice(i, 1);
            res.send("delete successful");
        }
    }
});


app.listen(3000);
console.log("i am alive");
