'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Using async/await for cleaner code and better error handling
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user;
      console.log(user);
      // Verifica se o usuário já existe no Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc);
      
      // Se o usuário não existir, cria um novo documento
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      } else {
        // Atualiza a data de último login
        await setDoc(userDocRef, {
          lastLogin: new Date()
        }, { merge: true });
      }
      
      // Redireciona para o dashboard após o login
      router.push('/');
    } catch (err: any) {
      console.error('Erro ao fazer login com Google:', err);
      setError('Ocorreu um erro ao fazer login com o Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center">Entrar</h2>
      <p className="text-center text-gray-400">Use sua conta Google para acessar o aplicativo</p>
      
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-900 rounded-md">
          {error}
        </div>
      )}
      
      <div className="pt-2">
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={24} />
          {isLoading ? 'Entrando...' : 'Entrar com Google'}
        </button>
      </div>
      
      <div className="text-center text-gray-400">
        Não tem uma conta? Basta fazer login com Google para criar automaticamente.
      </div>
    </div>
  );
}