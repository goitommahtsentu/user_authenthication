import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice.js";

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const {loading,error}=useSelector((state )=> state.user)
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart())


        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data)
            if (data.success===false) {
              dispatch(signInFailure(data.message))
            }

            dispatch(signInSuccess(data))
            navigate('/'); // Navigate on successful sign in, adjust the path as needed
        } catch (error) {
           dispatch(signInFailure(error.message))
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <img src="/../public/stove.png" alt="Stove Guard Logo" className="mb-8" />
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" placeholder='Email' id='email'
                       className='border p-3 rounded-large' onChange={handleChange}/>
                <input type="password" placeholder='Password' id='password'
                       className='border p-3 rounded-large' onChange={handleChange}/>
                <div className="flex justify-between items-center">
                    <a href="/forgot-password" className="text-lg text-indigo-600 hover:underline">Forgot password?</a>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Login In'}
                    </button>
                </div>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to='/sign-up'><span className='text-blue-700'>Sign up</span></Link>
            </div>

            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
};

export default SignIn;
