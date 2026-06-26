const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER

router.post("/register", async (req,res)=>{

    try{

        const hashedPassword =
        await bcrypt.hash(
            req.body.password,
            10
        );

        const user = new User({

            username:req.body.username,
            email:req.body.email,
            password:hashedPassword

        });

        await user.save();

        res.status(201).json({
            message:"User Registered"
        });

    }catch(err){

        res.status(500).json(err);
    }
});


// LOGIN

router.post("/login", async (req,res)=>{

    try{

        const user =
        await User.findOne({
            email:req.body.email
        });

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });
        }

        const validPassword =
        await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!validPassword){

            return res.status(400).json({
                message:"Invalid Password"
            });
        }

        const token =
        jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET
        );

        res.json({

            token,
            username:user.username,
            userId:user._id

        });

    }catch(err){

        res.status(500).json(err);
    }
});

module.exports = router;