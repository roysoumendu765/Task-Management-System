import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {username: username, password: password};

    try {
      const response =await axios.post(
        'http://localhost:5000/taskmate/login',
         loginData,
         {
          headers: {
            'Content-type': 'application/json',
          }
         }    
      );

      if(response.status === 200){
        localStorage.setItem("token", response.data.message);
        navigate('/dashboard', { state: username}) 
        console.log("Login Successful");       
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Something Went Wrong: ${error}`,
      });
    }
    console.log('Sign In with:', username, password);

  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
      Swal.fire("Passwords don't match.");
      return;
    }

    const userData = {username: username, password: password,confirmpassword: confirmPassword};

    try {
      const response = await axios.post(
        'http://localhost:5000/taskmate/register',
        userData,
        {
          headers:{
            'Content-type': 'application/json',
          }
        }
      );

      if(response.status === 200){
        console.log("Registration Successful.");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${response.data.message}`
        })
        setIsSignIn(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Something Went Wrong: ${error}`,
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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