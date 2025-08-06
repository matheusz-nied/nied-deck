"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-4xl space-y-12">
        
        {/* Seção Principal: Título e Call-to-Action */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:text-7xl">
            Flashcards App
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A sua ferramenta fullstack para revisão inteligente, com sincronização web/mobile,
            importação CSV e um sistema de fila de estudo adaptativa.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/login" className="px-8 py-3 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-lg">
              Entrar
            </Link>
            <Link href="/register" className="px-8 py-3 font-bold text-purple-400 border-2 border-purple-400 rounded-full hover:bg-purple-900 transition-colors duration-200">
              Cadastrar-se
            </Link>
          </div>
        </section>

        {/* Seção de Funcionalidades */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8">Recursos Principais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <FeatureCard
              title="Multi-plataforma"
              description="Aprenda em qualquer lugar com sincronização perfeita entre web e mobile (React Native)."
              icon="📱"
            />
            <FeatureCard
              title="Importação CSV"
              description="Importe seus flashcards em massa, de forma rápida e prática, diretamente de um arquivo CSV."
              icon="📄"
            />
            <FeatureCard
              title="Revisão Inteligente"
              description="Nosso algoritmo de fila de prioridade adaptativa otimiza o seu tempo de estudo."
              icon="🧠"
            />
            <FeatureCard
              title="TTS (Text-to-Speech)"
              description="Ouça a pronúncia de seus cards para uma experiência de aprendizado mais completa."
              icon="🗣️"
            />
            <FeatureCard
              title="Backend Plugável"
              description="Alterne facilmente entre Firebase (estudo) e Supabase (produção), mantendo a lógica de negócio desacoplada."
              icon="🔌"
            />
            <FeatureCard
              title="Arquitetura Limpa"
              description="Código organizado e fácil de manter, permitindo que o projeto evolua de forma sustentável."
              icon="🏗️"
            />

          </div>
        </section>
        
        {/* Seção de Tecnologias */}
        <section className="text-center pt-8">
          <h2 className="text-3xl font-bold mb-4">Tecnologias Usadas</h2>
          <p className="text-gray-400 text-lg">Next.js, React Native, Firebase, Supabase, Tailwind CSS</p>
        </section>
      </div>

      {/* Componente de Card de Funcionalidade */}
      <style jsx>{`
        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: #1f2937; /* gray-800 */
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);
        }
        .feature-icon {
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

// Componente para um card de funcionalidade
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-purple-300">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}