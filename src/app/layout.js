import { Inter } from 'next/font/google';
import '@/styles/all.scss';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "quizfree",
  description: "",
  icons: {
    icon: '/images/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
