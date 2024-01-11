const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/eduwork-native';  // Ganti localhost dengan 127.0.0.1
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
})();

const db = client.db('eduwork-native');
module.exports = db;
