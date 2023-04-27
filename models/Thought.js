const { Schema, Types, model } = require('mongoose');

const reactionSchema = require('./Reaction');

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
            get: (createdAtVal) => createdAtVal.toLocaleDateString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
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