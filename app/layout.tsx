import type {Metadata} from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: 'Rhodes Hills | Las Vegas',
  description: 'An Exclusive Community, Rising Above Las Vegas.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-obsidian text-navy font-sans antialiased selection:bg-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
