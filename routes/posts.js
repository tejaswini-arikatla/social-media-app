const router = require("express").Router();
const Post = require("../models/Post");


// CREATE POST
router.post("/", async (req, res) => {

    try {

        if (!req.body.content || req.body.content.trim() === "") {
            return res.status(400).json({
                message: "Post cannot be empty"
            });
        }
        const newPost = new Post({

            username:
            req.body.username,

            content:
            req.body.content

        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


// GET ALL POSTS
router.get("/", async (req, res) => {

    try {

        const posts = await Post.find()
        .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});


// LIKE POST
router.put("/like/:id", async (req, res) => {

    try {

        const post = await Post.findById(
            req.params.id
        );

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.likes += 1;

        await post.save();

        res.json(post);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

// ADD COMMENT

router.put("/comment/:id", async (req,res)=>{

    try{

        const post =
        await Post.findById(req.params.id);

        if(!post){

            return res.status(404).json({
                message:"Post not found"
            });
        }

        if (!req.body.text || req.body.text.trim() === "") {

            return res.status(400).json({
                message: "Comment cannot be empty"
            });

        }
        post.comments.push({
            text:req.body.text
        });

        await post.save();

        res.json(post);

    }catch(err){

        res.status(500).json({
            message:err.message
        });
    }
});

// DELETE POST

router.delete("/:id", async (req, res) => {

    try {

        const post =
        await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });
        }

        await Post.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Post Deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

// EDIT POST

router.put("/edit/:id", async (req, res) => {

    try {

        const updatedPost =
        await Post.findByIdAndUpdate(

            req.params.id,

            {
                content: req.body.content
            },

            {
                new: true
            }
        );

        res.json(updatedPost);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;