const mongoose = require('mongoose')
// mongoose.connect('mongodb://3.71.36.112:27017/admin',{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true},function(err) {
//     if(err) throw err
//     console.log("DATABASE CONNECTED");
// })
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://myUserAdmin:abc123@3.71.36.112:27017/admin',{useNewUrlParser:true, useUnifiedTopology:true},function(err) {
    if(err) throw err
    console.log("DATABASE CONNECTED");
})