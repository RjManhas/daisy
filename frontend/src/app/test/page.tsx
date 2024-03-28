'use client';

import { useAppContext } from 'src/context/test';

export default function HomePage() {
  const { name, setName, auth, setAuth } = useAppContext();
  return (
    <>
      <span>{name} </span>

      <button
        onClick={() => {
          setName('rowan');
        }}
      >
        {' '}
        Change name
      </button>
      {'  '}
      <span>{name}</span>

      <br />

      <span>{auth}a</span>

      <button
        onClick={() => {
          setAuth(3);
        }}
      >
        Change auth
      </button>
    </>
  );
}
