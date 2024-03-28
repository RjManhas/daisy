'use client';

import { Context, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const AppContext = createContext<any>(undefined);

export function AppWarper({ children }: { children: React.ReactNode }) {
  function getRandomNumber() {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Round the number to the nearest integer (0 or 1)
    // and add 1 to shift the range to 1 and 2
    return Math.floor(randomNumber * 2) + 1;
  }
  let [name, setName] = useState('rj');
  const router = useRouter();

  let [auth, setAuth] = useState(1);
  useEffect(() => {
    // Function to check validity against the API
    const checkValidity = async () => {
      try {
        // Check the validity in the API response\
        const number = getRandomNumber();
        console.log(number);
        setAuth(number);
      } catch (error) {
        console.error('Error checking validity:', error);
      }
    };

    // Initial check when component mounts
    checkValidity();

    // Set up interval to check validity every 5 minutes
    const interval = setInterval(checkValidity, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (auth == 3) {
      router.push('/');
    }
  }, [auth]);

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        auth,
        setAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
