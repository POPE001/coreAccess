'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';

const SignUp: React.FC = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ fullname: false, email: false, password: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const [successMessage, setSuccessMessage] = useState(''); // State to handle success message
  const [mounted, setMounted] = useState(false); // State to check if component is mounted
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrors({ fullname: false, email: false, password: false });
    setIsLoading(true);

    let formIsValid = true;
    if (!fullname) {
      setErrors(prevErrors => ({ ...prevErrors, fullname: true }));
      formIsValid = false;
    }
    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: true }));
      formIsValid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: true }));
      formIsValid = false;
    }

    if (!formIsValid) {
      setIsLoading(false);
      return;
    }

    try {
      const data = { username: fullname, email, password };
      const response = await signUp(data);
      setIsLoading(false);
      setSuccessMessage('Sign up successful! Redirecting to login...');
      setTimeout(() => {
        if (mounted) {
          router.push('/login');
        }
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      const message = getErrorMessage(error);
      setErrorMessage(message);
      console.error('Sign up error:', message);
    }
  };

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="fullname"
              required
              className={`appearance-none rounded-md w-full mt-1 px-3 py-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">Full name is required.</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-md w-full mt-1 px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`appearance-none rounded-md w-full mt-1 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-core-pink hover:bg-core-pink-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? <PulseLoader size={10} color={"#fff"} /> : 'Sign Up'}
            </button>
          </div>
        </form>
        {isLoading && <div>Loading...</div>} {/* Display loading indicator */}
        {successMessage && <div>{successMessage}</div>} {/* Display success message */}
        {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
        <div className="text-sm text-center mt-4">
          <Link legacyBehavior href="/login">
            <a className="font-medium text-core-pink hover:text-core-pink-light">
              Already have an account? Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
