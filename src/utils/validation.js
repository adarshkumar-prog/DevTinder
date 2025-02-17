const validator = require('validators');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
};

const validateEditProfileData = (req) => {
   try{
    const allowedEditFields = [
        "firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
        
        const isEditAllowed = Object.keys(req.body)
        .every(field => allowedEditFields.includes(field));

        return isEditAllowed;
   }catch(err){
    resizeBy.status(400).send("ERROR : " + err.message);
   }
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}