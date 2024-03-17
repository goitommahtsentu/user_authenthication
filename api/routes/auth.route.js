import express from "express";
import {ForgotPassword, ResetPassword, signin, signup} from "../controller/auth.controller.js";


const router=express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/forgot-password',ForgotPassword)
router.post('/rest-password',ResetPassword)



export default router;