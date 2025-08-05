# Models do Sistema - Nied Flash

Este documento define os modelos de dados utilizados no sistema de flashcards, compatíveis tanto com Firebase (Firestore) quanto com Supabase (PostgreSQL).

-----

## 📋 Visão Geral dos Models

O sistema possui 4 entidades principais:

  * **User**: Usuários do sistema.
  * **Deck**: Coleções de flashcards organizadas por tema/idioma.
  * **Flashcard**: Cards individuais com frente e verso.

-----

## 👤 User

Representa os usuários do sistema.

### Estrutura:

```typescript
interface User {
  id: string;                    // UUID único
  email: string;                 // Email do usuário (único)
  displayName?: string;          // Nome de exibição (opcional)
  photoURL?: string;             // URL da foto de perfil (opcional)
  createdAt: Date;               // Data de criação da conta
  updatedAt: Date;               // Última atualização
  preferences?: {                // Preferências do usuário
    defaultLanguage: string;     // Idioma padrão (ex: "pt-BR")
    ttsEnabled: boolean;         // TTS habilitado por padrão
    dailyGoal: number;           // Meta diária de cards
  };
}
```

### Implementação:

  * **Firebase**: Coleção `users`
  * **Supabase**: Tabela `users`
  * **Autenticação**: Gerenciada pelo provider (Firebase Auth / Supabase Auth)

-----

## 📚 Deck

Representa uma coleção de flashcards organizados por tema, idioma ou categoria.

### Estrutura:

```typescript
interface Deck {
  id: string;                    // UUID único
  userId: string;                // ID do usuário proprietário
  name: string;                  // Nome do deck (ex: "Inglês - Básico")
  description?: string;          // Descrição opcional
  languageCode: string;          // Código do idioma (ex: "en", "es", "fr")
  category?: string;             // Categoria (ex: "idiomas", "medicina")
  color?: string;                // Cor para identificação visual
  isPublic: boolean;             // Se o deck é público ou privado
  totalCards: number;            // Total de cards no deck
  createdAt: Date;               // Data de criação
  updatedAt: Date;               // Última atualização
  lastStudiedAt?: Date;          // Última vez que foi estudado
}
```

### Implementação:

  * **Firebase**: Coleção `decks`
  * **Supabase**: Tabela `decks`
  * **Relacionamento**: `userId` referencia `User.id`

-----

## 🃏 Flashcard

Representa um card individual com frente e verso.

### Estrutura:

```typescript
interface Flashcard {
  id: string;                    // UUID único
  deckId: string;                // ID do deck proprietário
  front: string;                 // Frente do card (pergunta/palavra)
  back: string;                  // Verso do card (resposta/tradução)
  hint?: string;                 // Dica opcional
  example?: string;              // Exemplo de uso opcional
  audioURL?: string;             // URL do áudio (se houver)
  imageURL?: string;             // URL da imagem (se houver)
  tags?: string[];               // Tags para organização
  difficulty: 'easy' | 'medium' | 'hard'; // Dificuldade percebida
  createdAt: Date;               // Data de criação
  updatedAt: Date;               // Última atualização
  isActive: boolean;             // Se o card está ativo para revisão
}
```

### Implementação:

  * **Firebase**: Coleção `flashcards`
  * **Supabase**: Tabela `flashcards`
  * **Relacionamento**: `deckId` referencia `Deck.id`

-----


## 📝 Índices Recomendados

Para otimizar as consultas mais comuns:

### Firebase (Firestore):

  * `decks`: Índice composto em `userId` + `updatedAt`
  * `flashcards`: Índice composto em `deckId` + `isActive`


### Supabase (PostgreSQL):

```sql
-- Índices para otimização
CREATE INDEX idx_decks_user_updated ON decks(user_id, updated_at DESC);
CREATE INDEX idx_flashcards_deck_active ON flashcards(deck_id, is_active);
```

-----

## 🚀 Exemplos de Uso

### Buscar decks de um usuário:

```typescript
// Interface
const decks = await deckService.getUserDecks(userId);
```

**Firebase**

```typescript
const decks = await db.collection('decks')
  .where('userId', '==', userId)
  .orderBy('updatedAt', 'desc')
  .get();
```

**Supabase**

```typescript
const { data: decks } = await supabase
  .from('decks')
  .select('*')
  .eq('user_id', userId)
  .order('updated_at', { ascending: false });
```


-----

## 📋 Validações

### Regras de Negócio:

  * Um usuário só pode acessar seus próprios decks.
  * Cards só podem pertencer a decks do mesmo usuário.
  

### Validação de Schema:

```typescript
// Exemplo com Zod
const DeckSchema = z.object({
  name: z.string().min(1).max(100),
  languageCode: z.string().length(2),
  isPublic: z.boolean(),
  // ... outros campos
});
```

