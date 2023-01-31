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
            .then(async (thought) => {
                try {
                    const user = await User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $push: { thoughts: thought._id } },
                        { new: true }
                    );
                    res.json(thought);
                } catch (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: "Thought not found" });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: "Thought not found" });
                }
                res.json({ message: "Thought removed successfully" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thought) => {
                console.log("🚀 ~ file: thoughtController.js:117 ~ .then ~ thought", thought)
                if (!thought) {
                    return res.status(404).json({ message: "Thought not found" });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: "Thought not found" });
                }
                res.json({ message: "Reaction deleted successfully" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    

    

    
}
}



