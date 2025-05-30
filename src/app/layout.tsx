import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Code Snippets',
  description: 'A collection of useful code snippets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white dark:bg-gray-900">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
