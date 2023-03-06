//this is a way to incrypt a password ib mixing it with a pre generated salt 
//this increases our website database security
//for this we have to use a library named bcrypt
const bcrypt = require('bcrypt');

//to use this we have to make pre hook so that we can change the password in database before saving
userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    //1st param is value we want to incrypt and 2nd is the salt used for the encryption
    let hashedString = await bcrypt.hash(this.password,salt);
    console.log(hashedString);
})