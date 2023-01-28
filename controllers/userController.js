const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    //get all users 
    getAllUsers(req, res){
        User.find({}
            .then((users) =>{
                console.log(users);
                res.json(users)
            })
            .catch((err)=>res.status(500).json(err)))
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.courseId})
        .select('--v')
        .then((user) =>
        !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(course))
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        })
    }, 
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user
            ? res.status(404).json({message: "No user with that ID"})
            : Thought.deleteMany({_id: {$in: user.thoughts}})
        )
        .then(()=>
            res.json({message: 'User and Thoughts deleted'}))
            .catch((err)=>{
                console.log(err)
                return res.status(500).json(err)
            })
    }
}