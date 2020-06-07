let express = require('express');
let postsRouter = require('./Posts/postsRoutes');
require("dotenv").config();


// run server
let server = express(); 


// middlewares================================================
// json format
server.use(express.json());

// Endpoints 
server.use("/api/posts", postsRouter);

// base GET at /
server.get('/', (req, res) => {
    res.status(200).json({
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        greeting: process.env.GREETING,
      });
})
// server at x port
// let port = 1123 ;
// for deployment
let port = process.env.PORT || 1123
server.listen(port, () => {
    console.log(`Running at port ${port}`);
})