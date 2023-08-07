// layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Remove the export statement for metadata
// export const metadata = {
//   title: 'SparkStyle',
//   description: 'Catered fashion',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
