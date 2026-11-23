import bcrypt from "bcryptjs";
import { pool } from "../../db";
import { IUser } from "./user.interface";

const createUserIntoDB = async(payload : IUser)=>{
    const {name, email, password, age} = payload;
    const hashPassword = await bcrypt.hash(password,10);
    const result = await pool.query(`
      insert into users(name, email, password, age) VALUES 
      ($1,$2,$3,$4) RETURNING *`, [name, email,hashPassword,age]
    );
    delete result.rows[0].password;
    return result;
}

const getAllUsersFromDB = async ()=>{
  const result = await pool.query(`
      SELECT * FROM users  
    `)
  return result;
}

const getSingleUserFromDB = async (id : string)=>{
  const result = await pool.query(`
      SELECT * FROM users WHERE id = $1
    `,[id])
  return result
}

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB
}