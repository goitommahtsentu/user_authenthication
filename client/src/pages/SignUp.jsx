import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


 const SignUp=()=> {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // check password matches
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return; // Stop the form submission
        }
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        id="username"
                        placeholder="Full Name"
                        autoComplete="name"
                        className="w-full border-gray-300 rounded-md shadow-lg
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="w-full border-gray-300 rounded-md shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        className="w-full border-gray-300 rounded-md shadow-lg focus:border-indigo-300
                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-enter Password"
                        autoComplete="new-password"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                    <div className="flex justify-center items-center gap-4">
                        <button
                            disabled={loading}
                            className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Login In'}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm">Have an account?</p>
                    <Link to="/sign-in" className="text-indigo-600 hover:underline">Sign in</Link>
                </div>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </div>

    );
}
export default SignUp;