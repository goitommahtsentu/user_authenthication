import express from 'express'
import authRoute from "./routes/auth.route.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
app.use("/api/auth", authRoute)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});




