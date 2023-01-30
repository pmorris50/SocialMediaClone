const { Schema } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        
    },
    {
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        reactionbody: {
            type: String,
            required: true,
            maxLength: 280,
        }
    },
    {
        username: {
            type: String,
            required: true,
            max_length: 280,
        }
    }

)
reactionSchema
    .virtual("createdAtFormatted")
    .get(function () {
        return moment(this.createdAt).format("MM/DD/YYYY");
    });

module.exports = reactionSchema