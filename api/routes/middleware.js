//
// import jwt from 'jsonwebtoken';
//
//
// export const authenticateJWT = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//
//     if (authHeader) {
//         const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
//
//         await jwt.verify(token, process.env.JWT_KEY, (err, user) => { // Use JWT_KEY instead of JWT_SECRET
//             if (err) {
//                 console.log('JWT Verification Error:', err.message);
//                 return res.status(403).send({ message: 'Access Denied: Invalid token.', error: err.message });
//             }
//
//             req.user = user;
//             next();
//         });
//     } else {
//         res.status(401).send({ message: 'Access Denied: No token provided.' });
//     }
// };
