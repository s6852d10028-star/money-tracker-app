import { Kanit } from 'next/font/google';
import './globals.css';

// กำหนดการใช้งานฟอนต์ Kanit
const kanit = Kanit({ 
  subsets: ['latin', 'thai'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-kanit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}