//Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;

const Posts = require('./Posts');
const OffensiveWords = require('./OffensiveWords');
const Comments = require('./Comments');

const url = "mongodb://localhost:27017/postsDB";

module.exports = {
    async dbConnect() {
        const conn = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });  
        //colecciones: 
        this.postsCol = new Posts(conn);
        this.offensiveWordsCol = new OffensiveWords(conn);
        this.commentsCol = new Comments(conn);
        console.log("Connected to Mongo");
    }
};



