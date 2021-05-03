const mongoose = require('mongoose');

const cardsSchema = mongoose.Schema({

    userName: {type:String, required:true},
    title: { type: String, required: true },
    job: { type: String, required: true },
    status: { type: String, required: true },
    desc: { type: String, required: true },
    dateApplied: { type:Date, required: true },
    dateUpdated: { type:Date, required: true },
});

let Cards = mongoose.model('Cards', cardsSchema);

module.exports = Cards;