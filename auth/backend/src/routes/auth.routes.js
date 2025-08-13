import express from 'express'
import { login, register } from '../controllers/auth.controllers.js';
let router=express.Router()

//register //        http://localhost:3000/api/v1/auth/register
router.post("/register",register)

//login  //           http://localhost:3000/api/v1/auth/login
router.post("/login",login)

export default router;