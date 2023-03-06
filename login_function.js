async function loginUser(req,res){
    try{
        let data = req.body;
        if(data.email){
            let user = await usermodel.findOne({email:'abc@gmail.com'});
            if(user){
                if(user.password == data.password){
                    return res.json({
                        message:'user has logged in',
                    })
                }else{
                    return res.json({
                        message:'wrong credentials',
                    });
                }
            }else{
                return res.json({
                    message:'user not found',
                })
            }
        }else{
            return res.json({
                message:'empty field found',
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}