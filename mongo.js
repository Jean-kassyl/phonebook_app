// const mongoose = require('mongoose')


// if(process.argv.length < 3){
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// }



// let password = process.argv[2];

// const url = `mongodb+srv://kass_admin:${password}@cluster0.vafjdjo.mongodb.net/phonebookDB?retryWrites=true&w=majority`;


// const personSchema = mongoose.Schema({
//     name: String,
//     number: String
// })

// const Person = mongoose.model('Person', personSchema)

// if(process.argv[3] && process.argv[4]){
//     mongoose
//     .connect(url)
//     .then(result => {
//         console.log("db connected")

//         const person = new Person({
//             name: process.argv[3],
//             number: process.argv[4]
//         })

//         return person.save()
//     })
//     .then(result => {
//         console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//         mongoose.connection.close()
//     })
//     .catch(err => console.log(err))

// }else {
//     mongoose
//         .connect(url)
//         .then(result => {
//             console.log("connection success")

//             Person.find({})
//                 .then(result => {
//                     console.log("phonebook:")
//                     result.forEach(person => console.log(person))

//                     mongoose.connection.close()
//                 })
//         })
// }


