const { Schema, modal } = require('mongoose');
const moment = require('moment');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        username: {
            type: String,
            required: true
        }
    },
    {
        reactions:
            [reactionSchema]
        
    }
)


thoughtSchema
    .virtual("createdAtFormatted")
    .get(function () {
        return moment(this.createdAt).format("MM/DD/YYYY");
    });


thoughtSchema
    .virtual("reactionCount")
    .get(function (){
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;