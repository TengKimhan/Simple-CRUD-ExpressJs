// create members api

const express = require("express");
const router = express.Router();
const members = require("../../Members"); // load Members.js
const uuid = require("uuid");
const { route } = require("express/lib/application");
const req = require("express/lib/request");
const res = require("express/lib/response");

// get all members
router.get("/", (req, res) => {
    res.json(members);
  });
  
// get specific member
router.get('/:id', (req, res) => {
    // res.send(req.params)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({message: `Member with this id ${req.params.id} not found!`});
    }
});

// create member
router.post("/", (req, res) => {
    // res.json({message: "Success"});
    // res.send(req.body);

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    };

    if (!newMember.name || !newMember.email){
        return res.status(400).json({message: "Please input name or email"});
    } 
        
    members.push(newMember);
    // res.json(members);
    // redirect to home page
    res.redirect("/");
})

// update member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        // update
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                member.status = updateMember.status ? updateMember.status : member.status;

                res.json({message: "Update success", member});
            }
        });
    } else{
        res.status(400).json({message: "Not found"});
    }
});

// delete member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        res.json({message: "Deleted success!", members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else{
        res.status(400).json({message: "Not found"});
    }

});

module.exports = router;