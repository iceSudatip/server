const functions = require('firebase-functions');

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var cors = require('cors');
app.use(cors());

var config = {
    apiKey: "AIzaSyChYUax_htKiqj7b2xCSDJ7Jv-pSYQrOtk",
    authDomain: "client-server-65a8b.firebaseapp.com",
    databaseURL: "https://client-server-65a8b.firebaseio.com",
    projectId: "client-server-65a8b",
    storageBucket: "client-server-65a8b.appspot.com",
    messagingSenderId: "365236052003"
  };
  firebase.initializeApp(config);

exports.api = functions.https.onRequest(app);

//var bears = [];

router.route('/lipsticks')
    .post(function (req, res) {
        //var bear = {};

        var lipstick_brand = req.body.brand;
        var lipstick_id = req.body.id;
        var lipstick_price = req.body.price;
        var lipstick_number = req.body.lipstick_number;
        
        // bears.push(bear);
       
            firebase.database().ref('lipsticks/' + lipstick_id).set({
              brand:  lipstick_brand,
              id: lipstick_id,
              price : lipstick_price
            });
          
        res.json({ message: 'created! ' });//ตอบกลับ
    })
router.route('/lipsticks')
    .get(function (req, res) {
        var lipsticks_path = firebase.database().ref('lipsticks/');
        lipsticks_path.on('value',function (snapshot) {
            res.send(snapshot.val())
        });
        //res.send(lipsticks)
    })


/*router.route('/bears/:bear_id')
    .get(function (req, res) {
        var id = req.params.bear_id;
        res.send(bears[id])
    })
router.route('/bears/:bear_id')
    .put(function (req, res) {
        var id = req.params.bear_id;
        bears[id].name = req.body.name;
        bears[id].id = req.body.id;
        res.send(bears[id])
    })*/
router.route('/lipsticks/:lipstick_id')
    .delete(function (req, res) {
        var id = req.params.lipstick_id;
        var lipsticks_path = firebase.database().ref('/lipsticks/' + id)
        firebase.database().ref(lipsticks_path).remove()
        res.json({ message: 'lipsticks delete! ' });
    });

app.use('/api', bodyParser.json(), router);
app.listen(8000);