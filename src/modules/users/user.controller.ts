import { Request, Response } from "express";
import { userService } from './user.service';

const createUser = async(req : Request, res: Response)=>{
  try {
  const result = await userService.createUserIntoDB(req.body);
  res.status(200).json({
    success: true,
    message:"User Created",
    data: result.rows[0],
  });
  } catch (error: any) {
    res.status(500).json({
    success: false,
    message: error?.message,
    error: error,
  });
  }
}

const getAllUsers = async (req : Request, res: Response)=>{
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
    success: true,
    message:"Users Retrieved Successfully",
    data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
    success: false,
    message: error?.message,
    error: error,
  });
  }
}

const getSingleUser = async (req : Request, res: Response)=>{
  try {
    const {id} = req.params;
    const result = await userService.getSingleUserFromDB(id as string)
    res.status(200).json({
    success: true,
    message:"User Retrieved Successfully",
    data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
    success: false,
    message: error?.message,
    error: error,
  });
  }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser
}