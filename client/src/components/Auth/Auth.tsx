import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const validateSignUp = () => {
    const validationErrors: typeof errors = {};
    if (!validateEmail(username)) {
      validationErrors.username = 'Please enter a valid email address.';
    }
    if (!validatePassword(password)) {
      validationErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, and one number.';
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(username)) {
      Swal.fire('Please enter a valid email.');
      return;
    }

    const loginData = { username, password };

    try {
      const response = await axios.post('https://task-management-app-backend-8814.onrender.com/taskmate/login', loginData, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.message);
        localStorage.setItem('useremail', username);
        navigate('/dashboard', { state: username });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Something went wrong: ${error}`,
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignUp()) {
      return;
    }

    const userData = { username, password, confirmpassword: confirmPassword };

    try {
      const response = await axios.post(
        'https://task-management-app-backend-8814.onrender.com/taskmate/register',
        userData,
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${response.data.message}`,
        });
        setIsSignIn(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Something went wrong: ${error}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {isSignIn ? (
          <form onSubmit={handleSignIn}>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sign In
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignIn(false)}
                className="text-blue-500 hover:underline"
              >
                Sign Up here
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sign Up
            </button>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignIn(true)}
                className="text-blue-500 hover:underline"
              >
                Sign In here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;