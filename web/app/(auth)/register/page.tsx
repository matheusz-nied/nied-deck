'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleRegister = async () => {
    setError('');
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Verifica se o usuário já existe no Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // Cria um novo documento para o usuário
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        // Campos adicionais específicos para novos usuários
        isNewUser: !userDoc.exists(),
        lastLogin: new Date(),
      }, { merge: true }); // merge: true para não sobrescrever dados existentes

      router.push('/dashboard'); // Redireciona para o dashboard após o registro
    } catch (err: any) {
      console.error('Erro ao registrar com Google:', err);
      setError('Ocorreu um erro ao criar conta com o Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-center">Criar Conta</h2>
      <p className="text-center text-gray-400">Use sua conta Google para criar um perfil</p>
      
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-900 rounded-md">
          {error}
        </div>
      )}
      
      <div className="pt-2">
        <button
          onClick={handleGoogleRegister}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={24} />
          {isLoading ? 'Criando conta...' : 'Continuar com Google'}
        </button>
      </div>
      
      <div className="text-center text-gray-400">
        Já tem uma conta?{' '}
        <a href="/login" className="font-medium text-purple-400 hover:underline">
          Entrar
        </a>
      </div>
    </div>
  );
}