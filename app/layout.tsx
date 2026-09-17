import '@/styles/globals.css';
import { Toaster  } from 'react-hot-toast';

export const metadata = {
  title: 'Placement Hub',
  description: 'Connecting Students, Companies and Placement Teams in One Platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}