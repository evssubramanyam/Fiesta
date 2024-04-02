const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    eventname: {type: String,required: true},
    city: {type: String,required: true},
    address: {type: String,required: true},
    time:{type:String,required:true},
    date:{type:String, required:true, default:100},
    users:{type:Array,required:false}

},
{collection:'events'})
const model = mongoose.model('EventModel',eventSchema)

module.exports = model