const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    isDone: {type: Boolean, default: false},
    time: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Todo', schema);