const bcrypt = require('bcrypt');

const validateUserİnput=(email,password)=>{
    return email && password;

}

const comparePassword=(password,hashpassword)=>{
    return bcrypt.compareSync(password,hashpassword);


}

module.exports={
    validateUserİnput,
    comparePassword
}