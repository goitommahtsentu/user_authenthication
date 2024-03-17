// This import now matches the ESM export syntax
import pool from '../db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";
import crypto from 'crypto'; // Ensure you import your database pool
import dotenv from 'dotenv';


dotenv.config();


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10); // Consider using hash instead of hashSync for async operation

    try {
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        await pool.query(query, [username, email, hashedPassword]);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};




export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = userResult.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid username or password');
        }

        const token = await jwt.sign({ id: user.id },
            process.env.JWT_KEY || 'fallback_secret_for_debugging',
            );

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
    } catch (error) {
        console.error('Error during sign in:', error);
        next(error);
    }
};

export const ForgotPassword=async (req, res,next) => {
    const { email } = req.body;
    try {
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userQuery.rows.length === 0) {
            return res.status(404).send('User with the given email does not exist.');
        }

        const user = userQuery.rows[0];
        const token = jwt.sign({userId: user.id},
            process.env.JWT_KEY,
        );
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        const  mailOptions = {
            from: 'goitommahtsentu@gmail.com',
            to: 'goitishma@gmail.com',
            subject: 'forgot password',
            text: `http://localhost:5173/reset-password/${user.id}/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                return res.send({Status:"success", Message:'email sent successfully'})
            }
        });

    }catch (e) {
      next(e)
    }
}

export const ResetPassword= async (req, res) => {
    const {token, newPassword} = req.body;
    try {
        const payload = jwt.verify(token, 'yourSecretKey');
        const userId = payload.userId;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        res.send('Your password has been updated successfully.');
    } catch (error) {
        res.status(500).send('Error resetting your password.');
    }
}
