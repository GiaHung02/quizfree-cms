import { Inter } from 'next/font/google';
import '@/styles/all.scss';
import Navbar from '@/components/navbar';
import styles from './page.module.scss';
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

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className={styles.wrapper}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
