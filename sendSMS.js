var sid = "AC7dfd37af5fedf4ae8719b3dad2538584";
const auth_token = "de1593b5770f27588d548067eac9e0fa";

const asyncHandler = require("express-async-handler");
const {userModel , validateRegisterUser } = require('./models/userModel');
const twilio = require("twilio")(sid, auth_token);
const JWT = require("jsonwebtoken");

const sendSMS = async (userName,phoneNumber,userId,code) => {
  try {
    const message = await twilio.messages.create({
      from: "+16415524124",
      to: phoneNumber,
      body: `Hello ${userName} , your code is ${code}`,
    });

    console.log("Message has been sent:", message.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
} 


const forgotPasswordController = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const curr = "+2"
    var phone = phoneNumber.toString();
    phone = curr.concat(phone);
    const userdate = await userModel.findOne({phoneNumber: phoneNumber });

    if (!userdate) {
      res.status(200).send({
        success: false,
        message: "User is not registered",
      });
    }

    const secret = process.env.JWT_SECRET + userdate.password;
    const code = Math.floor(100000 + Math.random() * 900000);
    await sendSMS(userdate.userName, phone, userdate.id, code);

    res.status(200).send({
      success: true,
      message: "Code sent successfully",
    });

  } catch (error) {
    console.error("Error in forgot password:", error);

    res.status(200).send({
      success: false,
      message: "Error in forgot password",
    });
  }
};


// reset password

const resetPasswordController = async(req,res)=>{
  try{
    const {phoneNumber ,code , password} = req.body;
    const user = await userModel.findOne({phoneNumber: phoneNumber});
    if(!user){
      res.status(200).send({
        success: false,
        message: "User is not registerd",
      });
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = JWT.verify(code , secret);
    if(payload.id === user){
      user.password = await hashPassword(password);
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password reset successfully",
      });
    }else{
      res.status(200).send({
        success: false,
        message: "Invalid code",
      });
    }
  }catch(error){
    console.error("Error in reset password:", error);
    res.status(200).send({
      success: false,
      message: "Error in reset password",
    });
  }
}

module.exports = {
  sendSMS,
  forgotPasswordController,
  resetPasswordController
};





