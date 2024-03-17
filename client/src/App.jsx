import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPasswordForm from "./pages/NewPassword.jsx";


const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:id/:token" element={<ResetPasswordForm/>}/>
        </Routes>
    </BrowserRouter>;
};

export default App;
