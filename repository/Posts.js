const ObjectId = require('mongodb').ObjectId;
module.exports = class Posts {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('posts');
    }
    addPost(post) {
        const newPost = {
            author: post.author,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            date: post.date,
            urlToImage: post.urlToImage,
            comments: post.comments
        };
        return await this.collection.insertOne(newPost);
    }
    getAllPosts() {
        return await this.collection.find({}).toArray();
    }
    getPostById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
    deletePostById(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
    modifyPost(postReq,id) {
        //Create object with needed fields and assign id
        const newPost = {
            author: postReq.author,
            nickname: postReq.nickname,
            title: postReq.title,
            content: postReq.content,
            date: postReq.date,
            urlToImage: postReq.urlToImage,
            comments: postReq.comments
        };
        //Update resource
        return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newPost });
    }
}