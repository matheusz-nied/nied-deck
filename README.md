# Flashcards App

Um app fullstack para revisão inteligente de flashcards, com sincronização web/mobile, TTS, importação CSV e algoritmo de repetição espaçada (SM-2).  
**Stack:** Next.js, React Native (Expo), Firebase/Supabase.

---

## ✨ Visão Geral

- **Multi-plataforma:** Web (Next.js) e Mobile (React Native)
- **Backend plugável:** Firebase (estudo) e Supabase (produção)
- **Funcionalidades:** Auth, CRUD, revisão com TTS, importação CSV, sync, SM-2
- **Arquitetura limpa:** Fácil alternância entre backends

---

## 🧱 Arquitetura

┌────────────┐ ┌──────────────┐ ┌────────────┐
│ Next.js │ │ React Native │ │ CSV Import │
│ (Frontend) │ <---> │ (Mobile) │ <---> │ (Web/File) │
└────┬───────┘ └────┬─────────┘ └────┬───────┘
│ │ │
▼ ▼ ▼
┌────────────────────────────────────────────┐
│ Data Layer (Firebase/Supabase) │
│ - Auth │
│ - CRUD decks/cards │
│ - Sync │
│ - Algoritmo SM-2 │
│ - Importação CSV │
└────────────────────────────────────────────┘


---

## 🚀 Tecnologias

- **Frontend:** Next.js (TypeScript, Tailwind), React Native (Expo)
- **Backend/Data:** Firebase (Auth, Firestore) e Supabase (Auth, Tables)
- **Core:** Lógica de negócio e SM-2 em TypeScript
- **Sync offline:** SQLite (expo-sqlite) no mobile

---

## 📂 Estrutura de Pastas

flashcards-app/
├── web/ # Next.js (Web)
├── mobile/ # React Native (Mobile)
├── core/ # Lógica de negócio, interfaces, SM-2
├── infra/
│ ├── firebase/ # Implementação Firebase
│ └── supabase/ # Implementação Supabase
├── shared/ # Tipos e validadores comuns
├── docs/ # Documentação extra
└── README.md


---

## 🛠️ Como rodar

### Pré-requisitos

- Node.js, npm/yarn, Expo CLI
- Conta no Firebase e/ou Supabase

### Setup

```bash
# Web
cd web
npm install
npm run dev

# Mobile
cd mobile
npm install
expo start
Configure as variáveis de ambiente conforme .env.example em cada projeto.
Veja docs/setup.md para detalhes de configuração do Firebase/Supabase.
📋 Funcionalidades
Login/Cadastro seguro (Firebase/Supabase Auth)
CRUD de decks e flashcards
Revisão com TTS (mobile)
Importação de flashcards via CSV
Sincronização web/mobile
Algoritmo SM-2 para revisão espaçada
Veja detalhes em docs/funcionalidades.md

📦 Banco de Dados
Estrutura de dados compatível com Firebase e Supabase.
Veja docs/database.md para detalhes.

🔄 Alternância entre Firebase e Supabase
A lógica de negócio é desacoplada do backend.
Para alternar, basta trocar a implementação no arquivo de configuração:

ts
Copy
// core/services/index.ts
import { FirebaseDeckService } from '../../infra/firebase/DeckService'
// import { SupabaseDeckService } from '../../infra/supabase/DeckService'

export const deckService = new FirebaseDeckService()
// export const deckService = new SupabaseDeckService()
🧠 Algoritmo SM-2
O algoritmo de repetição espaçada está implementado em core/sm2.ts.
Veja explicação e exemplos em docs/sm2.md.

🖼️ Prints e Vídeos
 Web:
 Mobile:
 Vídeo demo
🗺️ Roadmap
 Base funcional (Firebase)
 CRUD decks/cards
 Importação CSV
 Sincronização offline
 Alternância para Supabase
 Deploy e polish
📄 Licença
MIT

👤 Autor
Seu Nome — LinkedIn
