

# Flashcards App

Um app fullstack para revisão inteligente de flashcards, com sincronização web/mobile, TTS, importação CSV e algoritmo de fila de prioridade adaptativa.

**Stack:** Next.js, React Native (Expo), Firebase/Supabase.



## ✨ Visão Geral

  - **Mobile:** React Native (Expo).
  - **Web:** React.js (Next.js) para cadastro de decks e flashcards.
  - **Backend plugável:** Firebase (estudo) e Supabase (produção).
  - **Funcionalidades:** Auth, CRUD, revisão com TTS, importação CSV, sync.
  - **Arquitetura limpa:** Fácil alternância entre backends.
  - **Sistema de revisão:** Fila de estudo infinita com prioridade adaptativa.

-----

## 🧱 Arquitetura

```
┌────────────┐       ┌──────────────┐    
│ Next.js    │       │ React Native │     
│ (Frontend) │ <---> │   (Mobile)   │ 
└────┬───────┘       └────┬─────────┘   
     │                    │                  
     ▼                    ▼                     
┌────────────────────────────────────────────┐
│        Data Layer (Firebase/Supabase)      │
│   - Auth                                   │
│   - CRUD decks/cards                       │
│   - Sync                                   │
│   - Importação CSV                         │
└────────────────────────────────────────────┘
```

-----

## 🚀 Tecnologias

  - **Frontend:** Next.js (TypeScript, Tailwind).
  - **Mobile:** React Native (Expo).
  - **Backend/Data:** Firebase (Auth, Firestore) e Supabase (Auth, Tables).
  - **Sync offline:** SQLite (expo-sqlite) no mobile.

-----

## 📂 Estrutura de Pastas

```
flashcards-app/
├── web/             # Next.js (Web)
├── mobile/          # React Native (Mobile)
├── core/            # Lógica de negócio, interfaces
├── infra/
│   ├── firebase/    # Implementação Firebase
│   └── supabase/    # Implementação Supabase
├── shared/          # Tipos e validadores comuns
├── docs/            # Documentação extra
└── README.md
```

-----

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
```

Configure as variáveis de ambiente conforme `.env.example` em cada projeto. Veja `docs/setup.md` para detalhes de configuração do Firebase/Supabase.

-----

## 📋 Funcionalidades

  - Login/Cadastro seguro (Firebase/Supabase Auth)
  - CRUD de decks e flashcards
  - Revisão com TTS (mobile)
  - Importação de flashcards via CSV
  - Sincronização mobile
  - Sistema de fila de estudo infinita com prioridade adaptativa

Veja detalhes em `docs/funcionalidades.md`.

-----

## 📦 Banco de Dados

Estrutura de dados compatível com Firebase e Supabase.

Veja `docs/database.md` para detalhes.

-----

## 🔄 Alternância entre Firebase e Supabase

A lógica de negócio é desacoplada do backend. Para alternar, basta trocar a implementação no arquivo de configuração:

```ts
// core/services/index.ts

import { FirebaseDeckService } from '../../infra/firebase/DeckService';
// import { SupabaseDeckService } from '../../infra/supabase/DeckService'

export const deckService = new FirebaseDeckService();
// export const deckService = new SupabaseDeckService()
```

-----

## 🖼️ Prints e Vídeos

  - **Web:** [Link para imagem]
  - **Mobile:** [Link para imagem]
  - **Vídeo demo:** [Link para vídeo]

-----

## 🗺️ Roadmap

  - Base funcional (Firebase)
  - CRUD decks/cards
  - Importação CSV
  - Sincronização offline
  - Alternância para Supabase
  - Deploy e polish

-----

## 📄 Licença

[MIT](LICENSE.md)

-----

## 👤 Autor

Seu Nome — [LinkedIn](Link para o perfil do LinkedIn)