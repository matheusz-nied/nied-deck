import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Páginas de login e registro do Flashcards App',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Flashcards App
            </h1>
          </Link>
          <p className="mt-2 text-gray-400">
            Revisão inteligente para o seu aprendizado
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}