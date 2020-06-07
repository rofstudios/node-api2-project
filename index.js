let express = require('express');
let postsRouter = require('./Posts/postsRoutes');


// run server
let server = express(); 


// middlewares================================================
// json format
server.use(express.json());

// Endpoints 
server.use("/api/posts", postsRouter);

// base GET at /
server.get('/', (req, res) => {
    res.status(200).json({status: "up"})
})
// server at x port
let port = 1123 ;
server.listen(port, () => {
    console.log(`Running at port ${port}`);
})