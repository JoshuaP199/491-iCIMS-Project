const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    replies: { type: Array, required: false, default: [] },
    image: { data: Buffer, contentType: String, required: false },
    userID: { type: mongoose.Schema.Types.ObjectId, required: false, unique: false },
    likes: {type: Number, required: false, default: 0},
    reposts: {type: Number, required: false, default: 0},
    public: { type: Boolean, default: false, required: false, unique: false},
    createdAt: { type: Date, required: true, default: Date.now }
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;