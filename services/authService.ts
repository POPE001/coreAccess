import { supabase } from '@/utils/supabaseClient';

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
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    });

    if (error) throw error;
    return authData;
  } catch (error: any) {
    throw new Error(error.message || 'Sign up failed');
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return authData;
  } catch (error: any) {
    throw new Error(error.message || 'Sign in failed');
  }
};

