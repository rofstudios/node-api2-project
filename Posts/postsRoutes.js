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

 router.get('/:id', (req, res) => {
     let id = req.params.id;

     db.findById(id)
     .then(post => {
         if(post) {
             res.status(200).json(post);
         }
         else {
             res.status(404).json({ message: "The post with the specified ID does not exist"});
         }
     })
     .catch(err => {
         console.log(err, '500 error :id')
         res.status(500).json({error: "The post information could not be retrieved."})
     })

 })

 router.get('/:id/comments', (req, res) => {
    let id = req.params.id;
    // let postId = req.body.post_id;
    
    db.findPostComments(id)
    .then(comments => {
        if(comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err, "err 500 /:id/comments")
        res.status(500).json({ error: "The comments information could not be retrieved."})
    })  
 })

router.post('/', (req, res) => {
    let newPost = req.body;
    db.insert(newPost)
    .then(post => {
        if(newPost.title || newPost.contents){
            res.status(201).json(newPost)
        } else {
            res.status(404).json({ errorMessage: "Please provide title and content for the post"});
        }
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

// posts a new comment to the incoming path resource
router.post('/:id/comments', (req, res) => {
    let id = req.params.id
    let newComment = req.body;

    if(newComment) {
        if(!newComment.text) {
            res.status(400).json({errorMessage: "Please provide text for the comment"})
        } else {
            db.insertComment({...newComment, post_id: id})
            .then(comment => {
                res.status(201).json(newComment )
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        }
    
    } else {
        res.status(404).json({ error: "The post with the specified ID does not exist."})
    }

})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(post => {
        if(post === 1) { // maybe best practice is to do > 0?
            res.status(200).json({post})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
})

router.put('/:id', (req, res) => {
    // db.update(req.params.id, req.body)
    // .then(updated => {
        // if(updated === 1) {
            if(!req.body.title || !req.body.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post"});
            } else {
                db.update(req.params.id, req.body)
                .then(updated => {
                    if(updated === 1) {
                        res.status(200).json(req.body)
                    } else {
                        res.status(404).json({ message: "The post with the specified ID does not exist"})
                    }
                })
                .catch(err => {
                    console.log(err, "500 put/:id")
                    res.status(500).json({ error: "The post could not be modified"})
                })
            }
        // } else {
            // res.status(404).json({ message: "The post with the specified ID does not exist"})
        // }
    // })
    // .catch(err => {
    //     console.log(err, "500 put/:id")
    //     res.status(500).json({ error: "The post could not be modified"})
    // })
})

module.exports = router;
