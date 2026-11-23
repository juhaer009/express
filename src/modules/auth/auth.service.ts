import bcrypt from "bcryptjs";
import { pool } from "../../db";
import JWT from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload : {email : string; password : string})=>{
    //check if the user exists
    //check if the password match
    //check the user status
    //if pass all then generate jwt token
    const {email, password} = payload;
    const user = await pool.query(`
        SELECT * FROM users WHERE email = $1    
    `,[email])
    // console.log(user.rows[0]);
    if(user.rowCount===0){
        throw new Error("Invalid Credentials!!")
    }

    const mathcPassword = await bcrypt.compare(password, user.rows[0].password );
    if(!mathcPassword){
        throw new Error('Invalid Credentials!!');
    }

    if(!user.rows[0].is_active){
        throw new Error('Access Denied!!')
    }
    const jwtPayload = {
        id : user.rows[0].id,
        name : user.rows[0].name,
        email: user.rows[0].email
    }

    const accessToken = JWT.sign(jwtPayload, config.jwt_string, {expiresIn:"1d"},)
    return {accessToken, user: user.rows[0]};
}

export const authService = {
    loginUserIntoDB,
}
