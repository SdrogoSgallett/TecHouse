const mongoose = require('mongoose');
const uri = "mongodb+srv://davideleonellistud:itbWZX9etTUStbb9@cluster0.ygcxgeo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectionParams = {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
}

const connect = () => {
    mongoose.connect(uri, connectionParams)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
}

module.exports = {connect};