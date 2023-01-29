const {ObjectId} = require('mongoose').Types;
const {Thought, User} = require('../models');

//Aggregate function to count the number of Thoughts
const thoughtCount = async () =>
Thought.aggregate()
.count('thoughtCount')
.then((numberOfThoughts) => numberOfThoughts);

//Aggregate function to count number of reactions for each thought use $match, $unwind, and $group 
const reactionCount = async (thoughtId) =>
Thought.aggregate([
    {$match: {_id: ObjectId(thoughtId)}},
    {
        $unwind: '$reactions'
    },
    { 
        $group: {
            _id: ObjectId(thoughtId),
            reactionNum: {$count: '$reactions'}

        }
    }
    
])

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) =>{
            const thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount(),
            };
            return res.json(thoughtObj)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('__v')
        .then(async(thought) =>{
            !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.json({
                    thought,
                    reactionCount: await reactionCount(req.params.thoughtId),
                })

        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
        
    },
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) =>{
                console.log(err)
                res.status(500).json(err)
            })
    },
    
}

