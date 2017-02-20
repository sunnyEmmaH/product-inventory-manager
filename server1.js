var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products');

app.use('/',express.static(path.join(__dirname,"/app")));

var products = require('./models/products');
console.log(products);

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json


app.get('/products', function(req, res){
    products.find(function(err, products){
        if(err)
            res.send(err);
        res.json(products);
    });
});

app.get('/product/:id', function(req, res) {
    var id = req.params.id;
    products.findOne({'_id': id}, function(err, prd){
        if(err)
            res.send(err);
        res.send(prd);
    })
});

app.post('/products', function(req, res) {
    var prd = new products();
    prd.name=req.body.name;
    prd.description=req.body.description;
    prd.price=req.body.price;
    prd.stock=req.body.stock;
    prd.packing=req.body.packing;
    prd.status=req.body.status;
        
    prd.save(function(err) {
        if (err)
            res.send(err);
        products.find(function(err, prds) {
            if (err)
                res.send(err);
            res.json(prds);
        });
    });
});

app.put('/product/:id', function(req, res) {
    var id = req.params.id;
    products.findOne({'_id':id}, function(err, prd){
        if(err){
            res.send(err);
        }
        prd.name = req.body.name;
        prd.price = req.body.price;
        prd.stock = req.body.stock;
        prd.packing = req.body.packing;
        prd.description = req.body.description;
        prd.status = req.body.status;
        prd.save(function(err){
            if(err)
                res.send(err);
            products.find(function(err, prds){
                if(err)
                    res.sned(err);
                res.json(prds);
            });
        });
    });

});

app.delete('/product/:id', function(req, res) {
    var id = req.params.id;
    products.remove({
        _id: id
    }, function(err, prd){
        if(err)
            res.send(err);
        console.log('removed');
        products.find(function(err, prds){
            if(err)
                res.send(err);
            res.json(prds);
        })
    });
});


app.listen(3000);
console.log("i am alive");
