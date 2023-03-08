// this helps us to provide security to the webpages 
// this can be used by npm i jsonwebtoken
// three arguments we needed to get a token to authorize - payload secret and algorith
// payload is the value we want to authorize and secret is our secret key we can put anything we want 
// to generate the token we have to write as jwt.sign(payload,secret)
// and to verify we can write it as jwt.verify(secret,token_value)
// we have to store this jwt token generated to know that whether its correct or not 
// to do this operation we can send the value of the token in the cookies so that we can access this at the time of verification

const jwt = require('jsonwebtoken')

//we want to add anything or can genreate by crypro npm package
const secret = "abcgtheyr"
const token = jwt.sign({email:this.username},secret);
res.cookie('jwt',token,{httpOnly:true});
//to verify
const isVerified = jwt.verify(sceret,req.cookie.jwt);
if(isVerified)
{
    //allow to perform operation
}else{
    res.json('operation not allowed')
}
