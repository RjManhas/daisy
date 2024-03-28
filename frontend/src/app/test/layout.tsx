'use client';
import { AppWarper } from 'src/context/test';

export default function RootLayout({ children }: any) {
  return <AppWarper>{children}</AppWarper>;
}
