const { Schema, model } = require('mongoose');
const validator = require('validator');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 50,
            unique: true,
            trim: true
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Invalid Email']
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{type: Schema.Types.ObjectId, ref: 'user'}]
        
    },
    {
        toJson: {
            getters: true,
        }
    }
);

userSchema
.virtual('friendCount')
.get(function (){
    return this.friends.length;
});


const User = model('user', userSchema);
module.exports = User;