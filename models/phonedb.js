const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.connect(url)
    .then( (result) => {
        console.log("connected to the db")
    })
    .catch(err => {
        console.log("an error occured" + err.message)
    })

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v){
                return /(^\d\d{1,2})-\d+/.test(v)
            }
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema)