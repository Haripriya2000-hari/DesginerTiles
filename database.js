const { name } = require('ejs');
const mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'designertiles',
    multipleStatements: true
});
conn.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Successfully connected!!")
    }
})

function fulldatas(req, res) {
    let fullsql = "SELECT * FROM granites ; SELECT * FROM marbles";

    conn.query(fullsql, [2, 1], (err, result) => {
        if (err) {
            throw err;
        } else {
            // console.log(result[0]);
            // console.log(result[1]);
            res.render('TypeTile', { title1: "Granitedata", title1: "Marbledata", granitedata: result[0], marbledata: result[1] })
        }
    })
}

function description(req, res) {
    let sql = "SELECT * FROM granites WHERE id =?";
    id = req.params.id;
    conn.query(sql, [id], (err, result) => {
        if (err) { throw err } else {
            // console.log(result[0].id);
            // console.log("s")
            res.render('description', { title: "Description", des: result })
                // res.send(result)
        }
    })
}

function marbledescription(req, res) {
    let sql = "SELECT * FROM marbles WHERE id =?";
    id = req.params.id;
    conn.query(sql, [id], (err, result) => {
        if (err) { throw err } else {
            // console.log(result[0].id);
            console.log(result)
            res.render('description', { title: "Description", des: result })
                // res.send(result)
        }
    })

}

function addtocart(uid, oldid, img, name, piece, cost, res) {
    let values = [img, uid, oldid, name, cost, piece]
    let sql = 'INSERT INTO cart (imageurl, userid, oldid, name, cost, peice)  VALUES(?,?,?,?,?,?)'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("successfly added products to the cart")

        }
    })


}


function addtocart2(uid, oldid, img, name, piece, cost, res) {

    let values = [img, uid, oldid, name, cost, piece]
    console.log(values)
    let sql = 'INSERT INTO cart (imageurl, userid, oldid, name, cost, peice)  VALUES(?,?,?,?,?,?)'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("successfully added products to the cart")

        }
    })

}


function addtowishlist(uid, oldid, img, name, piece, cost, res) {
    let values = [img, uid, oldid, name, cost, piece]
    console.log(values)
    let sql = 'INSERT INTO wishlist (imageurl, userid, oldid, name, cost, peice)  VALUES(?,?,?,?,?,?)'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("successfully added product to the Wishlist")

        }
    })

}

function cartdata(req, res) {
    let value = [req.params.uid]
    let sql = 'SELECT * FROM cart WHERE userid=?';


    conn.query(sql, value, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.render('AddtoCart', { title: "Add to Cart", cartdatas: result })
        }
    })

}

function wishlistdata(req, res) {
    let value = [req.params.uid]
    let sql = 'SELECT * FROM wishlist WHERE userid=?';


    conn.query(sql, value, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.render('wishlist', { title: "Add to wishlist", wishlistdatas: result })
        }
    })

}


function deleteitem(req, res, id) {
    let uid = req.params.uid
    let values = [uid, id];
    var sql = ' DELETE FROM cart WHERE userid=? AND id =?'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("success")
        }
    })
}

function deleteitemwishlist(req, res, id) {
    let uid = req.params.uid
    let values = [uid, id];
    var sql = ' DELETE FROM wishlist WHERE userid=? AND id =?'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("successfully deleted item for wishlist")
        }
    })
}

function accountinfodata(req, res) {
    let values = [req.params.uid];
    var sql = ' SELECT * FROM account_details WHERE user_id=?'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.render("Accountinfo", { title: "accountinfo", accountdata: result })
        }
    })

}

function addtoacc(req, res) {
    var values = [req.body.uid, req.body.name, req.body.laname, req.body.city, req.body.location, req.body.landmark, req.body.pincode, req.body.phoneno, req.body.alphone]
    var sql =
        'INSERT into account_details(user_id, first_name,last_name, location, city, landmark, pincode, phone_no, alternate_phone_no) VALUES(?,?,?,?,?,?,?,?,?)';

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        } else {

        }
    })
}

function myorders(req, res) {
    let values = [req.params.uid]
    let sql = "SELECT * FROM myorders WHERE userid =?"

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err;

        } else {
            res.render('myorder', { title: "orders", myorderdata: result })
        }
    })

}

function addtoorders(uid, oldid, img, name, piece, cost, res) {
    let values = [uid, img, oldid, name, cost, piece]
    let sql = 'INSERT INTO myorders (userid,imageurl, oldid, name, cost, peice)  VALUES(?,?,?,?,?,?)'

    conn.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            res.send("Order placed successfully");

        }
    })

}

function updatecart(req, res) {
    let values = [req.params.id, req.params.oldid]
    let sql = "";
    if (req.params.oldid > 10) {
        sql = 'SELECT c.id,c.imageurl,m.cost AS cost1,m.image2 AS img2, m.image3 AS img3,m.image4 AS img4, m.image5 AS img5, m.description, c.cost, c.peice, c.name, c.oldid FROM cart c JOIN marbles m ON c.oldid = m.id WHERE c.id = ?'
    } else {
        sql = 'SELECT c.id,c.imageurl,g.cost AS cost1, g.image2 AS img2, g.image3 AS img3,g.image4 AS img4, g.image5 AS img5,g.description, c.cost, c.peice, c.name, c.oldid FROM cart c JOIN granites g ON c.oldid = g.id WHERE c.id =?';
    }
    conn.query(sql, values, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(values)
            console.log(data)
            res.render('desupdate', { title: "update", result: data })
        }
    })
}

function updatecart2(req, res, id, cost, piece) {
    let values = [cost, piece, id];
    console.log(values)
    var sql = 'UPDATE cart set cost = ? , peice = ? WHERE id = ?'
    conn.query(sql, values, (err, data) => {
        if (err) {
            throw err;
        } else {

            res.send("Updated in your cart")
        }
    })

}


function updatewishlist(req, res) {
    let values = [req.params.id]
    let sql = "";
    if (req.params.oldid > 10) {
        sql = 'SELECT w.id,w.imageurl,m.cost AS cost1,m.image2 AS img2, m.image3 AS img3,m.image4 AS img4, m.image5 AS img5, m.description, w.cost, w.peice, w.name, w.oldid FROM wishlist w JOIN marbles m ON w.oldid = m.id WHERE w.id = ?'
    } else {
        sql = 'SELECT w.id,w.imageurl,g.cost AS cost1,g.image2 AS img2, g.image3 AS img3,g.image4 AS img4, g.image5 AS img5, g.description, w.cost, w.peice, w.name, w.oldid FROM wishlist w JOIN granites g ON w.oldid = g.id WHERE w.id =?';
    }


    conn.query(sql, values, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(values)
            console.log(data)
            res.render('wislistupdate', { title: "update", result: data })
        }
    })

}

function updatewishlist2(req, res, id, cost, piece) {
    let values = [cost, piece, id];
    console.log(values)
    var sql = 'UPDATE wishlist set cost = ? , peice = ? WHERE id = ?'
    conn.query(sql, values, (err, data) => {
        if (err) {
            throw err;
        } else {

            res.send("Updated in your wishlist")
        }
    })

}








module.exports = { updatewishlist, updatecart, myorders, accountinfodata, wishlistdata, addtoacc, addtocart2, cartdata, addtocart, addtoorders, fulldatas, description, marbledescription, deleteitem, updatewishlist2, addtowishlist, deleteitemwishlist, updatecart2 }