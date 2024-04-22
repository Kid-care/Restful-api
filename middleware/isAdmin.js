const responseStatus = require("../handlers/responseStatus.handler");
const Admin = require("../models/admin.model");

const isAdmin = async (req, res, next) => {
  if (! req.user.isAdmin){ {
    
    return res.status(403).send('you are not admin...');
  }
  next();
}
 
};
module.exports = isAdmin;