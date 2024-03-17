import React, { useState } from 'react';

const ResetPasswordForm = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/auth/rest-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword, confirmPassword })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            console.log('Password reset successfully!');
            // Redirect user to login page or display success message
        } catch (error) {
            console.error(error);
            // Handle errors appropriately (e.g., display user-friendly error messages)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPasswordForm;
