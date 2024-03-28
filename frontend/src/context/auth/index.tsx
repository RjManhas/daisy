'use client';

import { Context, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const authContext = createContext<any>(undefined);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  //register function
  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/v1/auth/register/`, {
        username: username,
        password: password,
      });

      return response.data; // You might return this data or handle it as needed
    } catch (error) {
      // If there's an error, you can handle it here
      console.error('Registration failed:', error.response.data);
      throw error.response.data;
    }
  };

  return <authContext.Provider value={{ register }}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  return useContext(authContext);
}
