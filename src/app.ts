import express, { Application, Request, Response } from "express"
import { pool } from './db/index';
const app : Application= express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))


app.get('/', (req: Request, res: Response) => {
  // console.log(req);
  // res.send('This is root route')
  res.status(200).json({
    success: true,
    message:"This is root route",
    author: "PH",
  })
});

app.post("/api/v1/users", async(req : Request, res: Response)=>{
  try {
    // console.log(req.body);
    const {name, email, password, age} = req.body;
    const result = await pool.query(`
      insert into users(name, email, password, age) VALUES 
      ($1,$2,$3,$4) RETURNING *`, [name, email,password,age]
    )
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
});

app.get("/api/v1/users", async (req : Request, res: Response)=>{
  try {
    const result = await pool.query(`
      SELECT * FROM users  
    `)
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
})

app.get("/api/v1/users/:id", async (req : Request, res: Response)=>{
  try {
    const {id} = req.params;
    const result = await pool.query(`
      SELECT * FROM users WHERE id = $1
    `,[id])
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
})

export default app;
