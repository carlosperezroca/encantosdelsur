import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encantos del Sur',
  description: 'Guía visual de escapadas bonitas en el sur',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
