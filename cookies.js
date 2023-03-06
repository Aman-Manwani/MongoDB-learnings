//to use cookies we have to use a npm library named cookie parser
const cookies = require('cookie-parser');

function setCookies(req,res){
    // first param is name of cookie 2nd is default value of cookie 
    // 3rd param is till the cookiw is valid and other is security purpose
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.send('cookie has been set');
}

function getcookies(req,res){
    let cookies  = req.cookie;
    console.log(cookies);
    res.send('cookies received');
}