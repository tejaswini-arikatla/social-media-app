const router = require("express").Router();
const User = require("../models/User");


// GET ALL USERS

router.get("/", async(req,res)=>{

    try{

        const users =
        await User.find()
        .select("-password");

        res.json(users);

    }catch(err){

        res.status(500).json(err);
    }
});


// FOLLOW USER

router.put("/follow/:id", async(req,res)=>{

    try{

        const userToFollow =
        await User.findById(
            req.params.id
        );

        const currentUser =
        await User.findById(
            req.body.currentUserId
        );

        if(!userToFollow){

            return res.status(404).json({
                message:"User not found"
            });
        }

        if(
            !userToFollow.followers.includes(
                currentUser._id
            )
        ){

            userToFollow.followers.push(
                currentUser._id
            );

            currentUser.following.push(
                userToFollow._id
            );

            await userToFollow.save();
            await currentUser.save();
        }

        res.json({
            message:"Followed"
        });

    }catch(err){

        res.status(500).json(err);
    }
});

// GET USER BY ID

router.get("/:id", async (req, res) => {

    try {

        const user =
        await User.findById(req.params.id)
        .select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

router.put("/profilepic/:id", async(req,res)=>{

    try{

        const user =
        await User.findByIdAndUpdate(

            req.params.id,

            {
                profilePic:
                req.body.profilePic
            },

            {
                new:true
            }
        );

        res.json(user);

    }catch(err){

        res.status(500).json(err);
    }
});

module.exports = router;