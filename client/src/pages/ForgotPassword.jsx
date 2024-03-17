import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // Assuming you might want to handle errors
  const [loading, setLoading] = useState(false); // Assuming you might want to indicate loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      alert(data.message); // You might want to replace this with a more integrated UI message
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Forgot Password</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
              type='email'
              placeholder='Enter your email'
              className='border p-3 rounded-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <button
              disabled={loading}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}

export default ForgotPassword;
