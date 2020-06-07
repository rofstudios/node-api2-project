let express = require('express');
let router = express.Router();

let db = require('../data/db');

// Endpoints 
 router.get('/', (req, res) => {
    //  let bodyReq = req.body;
     db.find()
     .then(posts => {
         res.status(200).json(posts)
     })
     .catch(err => {
         console.log(err)
         res.status(500).json({errorMessage: "Cannot retrieve data"})
     })
 })

module.exports = router;
