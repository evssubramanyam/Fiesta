const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    phno:{type:String,required:true},
    events:{type:Array,required:false}},
    {collection:'users'}
)


const model = mongoose.model('UserSchema',UserSchema)

module.exports = model