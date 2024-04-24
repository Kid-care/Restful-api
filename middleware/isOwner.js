const isOwner = async (req , res , next) =>{
    if(req.user.roles === 'owner'){
        next();
    }else{
        res.status(401).send('You are not authorized to access this route');
    }
}
module.exports = isOwner ;