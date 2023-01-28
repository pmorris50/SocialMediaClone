const { Schema } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        
    },
    {
        reactionBody: {
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

module.exports = reactionSchema