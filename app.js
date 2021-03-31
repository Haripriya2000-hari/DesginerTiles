const express = require('express');
const db = require('./database');
const bodyparser = require('body-parser');


var app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("This website is listening to the port" + port);
})

//static files
app.use(bodyparser.json())
app.use(express.static('public'))
app.use('/stylesheet', express.static(__dirname + 'public/stylesheet'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fontawesome-free-5.15.1-web', express.static(__dirname + 'public/fontawesome-free-5.15.1-web'))


app.set('views', './views')
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})


app.get('/TypeTile', (req, res) => {
    // console.log("super")
    db.fulldatas(req, res);

})

app.post('/TypeTile', (req, res) => {
    // console.log("fine")

    var uid = req.body.userid;
    var oldid = req.body.oldid;
    var name = req.body.name;
    var img = req.body.imagesrc;
    var cost = req.body.cost;
    db.addtocart2(uid, oldid, img, name, 1, cost, res)
})


app.get('/TypeTile/:id/:name', (req, res) => {
    db.description(req, res);
    // res.send(req.params.id + req.params.name)
})

app.get('/TypeTile/marble/:id/:name', (req, res) => {
    db.marbledescription(req, res);
    // res.send(req.params.id + req.params.name)
})

var cartcurid = 0;

app.post('/TypeTile/:id/:name', (req, res) => {
    var uid = req.body.userid;
    var oldid = req.body.oldid;
    var img = req.body.imagesrc;
    var name = req.body.name;
    var piece = req.body.piece;
    var cost = req.body.cost;
    db.addtocart(uid, oldid, img, name, piece, cost, res);
})



app.post("/TypeTile", (req, res) => {
    var uid = req.body.userid;
    var oldid = req.body.oldid;
    var img = req.body.imagesrc;
    var name = req.body.name;
    var piece = 1;
    var cost = req.body.cost;
    db.addtocart(uid, oldid, img, name, piece, cost, res);

})
app.post('/TypeTile/:id/:name/wishlist', (req, res) => {
    var uid = req.body.userid;
    var oldid = req.body.oldid;
    var img = req.body.imagesrc;
    var name = req.body.name;
    var piece = req.body.piece;
    var cost = req.body.cost;
    db.addtowishlist(uid, oldid, img, name, piece, cost, res);
})


app.get("/:uid/addtocart", (req, res) => {
    db.cartdata(req, res)


})


app.get("/:uid/wishlist", (req, res) => {
    db.wishlistdata(req, res)

})
app.delete("/:uid/addtocart", (req, res) => {
    var id = req.body.id;
    db.deleteitem(req, res, id)
})

app.delete("/:uid/wishlist", (req, res) => {
    var id = req.body.id;
    db.deleteitemwishlist(req, res, id)
})

app.get("/:uid/accountinfo", (req, res) => {
    db.accountinfodata(req, res)
})

app.post("/:uid/addtoacc", (req, res) => {
    db.addtoacc(req, res)


})

app.get("/:uid/myorders", (req, res) => {
    db.myorders(req, res)
})

app.post("/myorders", (req, res) => {
    var uid = req.body.userid;
    var oldid = req.body.oldid;
    var img = req.body.imagesrc;
    var name = req.body.name;
    var piece = req.body.piece;
    var cost = req.body.cost;

    db.addtoorders(uid, oldid, img, name, piece, cost, res);

})

app.get("/TypeTileupdate/:id/:oldid/:name", (req, res) => {
    db.updatecart(req, res)
})


app.put('/TypeTile/cartupdate', (req, res) => {
    var id = req.body.id;
    var cost = req.body.cost;
    var piece = req.body.piece;
    console.log("dd" + id + cost + piece)
    db.updatecart2(req, res, id, cost, piece)

})


app.get('/whislistupdate/:id/:oldid/:name', (req, res) => {
    db.updatewishlist(req, res)
})

app.put('/TypeTile/wishlistupdate', (req, res) => {
    var id = req.body.id;
    var cost = req.body.cost;
    var piece = req.body.piece;
    console.log("dd" + id + cost + piece)
    db.updatewishlist2(req, res, id, cost, piece)

})