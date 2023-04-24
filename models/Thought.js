const { Schema, Types } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ],
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    });

// Create a virtual property 'reactionCount' that retrieves the length of the thought's reactions array field on query.
ThoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;