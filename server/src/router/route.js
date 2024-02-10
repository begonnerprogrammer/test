const express = require('express');
const router = new express.Router();
const Collection = require('../schema/schema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors=require("cors")
const path = require("path");
const multer = require("multer");
const PostModel = require('../schema/postmodel');
const Contact = require("../schema/contact");
//context api part
const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("the token is missing")
    }
    else {
        jwt.verify(token, "jwt-swcret-key", (err, decoded) => {
            if (err) {
                return res.json("the token is wrong")
            }
            else {
                req.email = decoded.email;
                req.username = decoded.name;
                next();
            }
        })
    }
}

//Authorization
const verify = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.json("the token is not there")
    }
    else {
        jwt.verify(token, "jwt-swcret-key", (err, decoded) => {
            if (err) return res.json("token is wrong")
            next();
        })
    }
}

 

router.get("/",(req,res)=>{
       res.json("Hello")
})

//logout functionality
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json("success");
})



//authentication at home page
router.get("/home", verify, (req, res) => {
    //responce to use effect after next is executed
    return res.json("success")
})



//authentication
router.get("/test", verifyuser, (req, res) => {
    //responce to use effect after next is executed
    //responce will come with assigning jwt not before you fool
    return res.json({ email: req.email, username: req.username })
})



//login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    Collection.findOne({ email: email })
        .then(user => {


            //comparing hashed password
            if (user) {
                bcrypt.compare(password, user.password, (err, responce) => {
                    if (responce) {
                        //creating token
                        const token = jwt.sign({ email: user.email, name: user.name }, "jwt-swcret-key", { expiresIn: 100000 })
                        res.cookie("token", token);
                        res.json("success");
                    }
                    else {
                        res.json("notsuccess")
                    }
                })
            }
            else {
                res.json("no record existed")
            }
        })
        .catch(err => console.log(err))
})


//contact form
router.post("/contact", (req, res) => {
    const { name, email, subject, massage } = req.body;

    const user = new Contact({ name, email, subject, massage });


    user.save().then(() => {
        res.status(201).json({ massage: "Massage send" });
    })
        .catch((e) => { console.log(e) })

})


//signUp
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;




    //hashing password

    bcrypt.hash(password, 10).then(hash => {
        Collection.findOne({ email: email }).then(user => {



            if (user) {
                res.json("already have an acount")
            }
            else {

                const user = new Collection({ name, email, password: hash });



                user.save().then(() => {
                    res.status(201).json({ massage: "Massage send" });
                })
                    .catch((e) => { console.log(e) })








            }
        }
        )
    })
        .catch(err => console.log(err))





})


router.delete('/deletepost/:id', (req, res) => {
    PostModel.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.json("Success"))
        .catch(e => console.log(e))
})

//using multer library
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage
})

//file upload
router.post("/create", upload.single('file'), (req, res) => {
    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename,
        //cratiung another field for user authntication for edit or delete
        email: req.body.email
    })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})



router.get('/getposts', (req, res) => {
    PostModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
})




router.get('/getpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate(
        { _id: id }, {
        title: req.body.title,
        description: req.body.desc
    }
    )
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})

module.exports = router;