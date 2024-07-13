import axios from 'axios';
import { API_BASE_URL } from '@/config';

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Sign up failed');
    } else {
      throw new Error('Network Error');
    }
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Sign in failed');
    } else {
      throw new Error('Network Error');
    }
  }
};
