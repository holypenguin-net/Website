import Link from 'next/link';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <head />
      <body>
        <div>
            <Link href='/'>Home</Link>
            <Link href='/games'>Games</Link>
            <Link href='/register'>Register</Link>
            <Link href='/login'>Login</Link>        
        </div>
          {children}
      </body>
    </html>
  );
}
