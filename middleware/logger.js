const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.protocol}://${'host'}${req.originalUrl}`);
    next();
  }

module.exports = logger;  