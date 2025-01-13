const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // lo schema rapreesenta come sono costruiti i nostri dati

const TopicSchema = new Schema({
    topic: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    },
    date: {
        type :Date,
        default:Date.now()
    }
});

module.exports = Item = mongoose.model("topic",TopicSchema);