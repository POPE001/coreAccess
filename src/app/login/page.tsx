"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '../../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import { PulseLoader } from 'react-spinners';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: false, password: false });
    setErrorMessage('');

    let formIsValid = true;

    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: true }));
      formIsValid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: true }));
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    setLoading(true); // Start loading

    try {
      const data = { email, password };
      const response = await signIn(data);
      console.log('Sign in success:', response);

      // Store the token in localStorage
      localStorage.setItem('token', response.token);

      // Navigate to the home page after successful sign in
      router.push('/');
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      console.error('Sign in error:', message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
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
              disabled={loading} // Disable the button while loading
            >
              {loading ? <PulseLoader size={10} color={"#fff"} /> : 'Sign In'}
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
        <div className="text-sm text-center mt-4">
          <Link legacyBehavior href="/signup">
            <a className="font-medium text-core-pink hover:text-core-pink-light">
              Don't have an account? Sign Up
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
