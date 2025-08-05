# API / Data Layer

O app utiliza uma camada de abstração para alternar entre Firebase e Supabase.  
Abaixo, exemplos de métodos disponíveis:

## AuthService

| Método         | Descrição                | Parâmetros           |
| -------------- | ------------------------ | -------------------- |
| `register`     | Cria novo usuário        | email, senha         |
| `login`        | Login de usuário         | email, senha         |
| `logout`       | Logout                   | -                    |
| `getUser`      | Retorna usuário logado   | -                    |

## DeckService

| Método         | Descrição                | Parâmetros           |
| -------------- | ------------------------ | -------------------- |
| `getDecks`     | Lista decks do usuário   | userId               |
| `createDeck`   | Cria novo deck           | dados do deck        |
| `getCards`     | Lista cards de um deck   | deckId               |
| `addCard`      | Adiciona card ao deck    | deckId, dados do card|
| `updateCard`   | Atualiza card            | cardId, dados do card|
| `deleteCard`   | Remove card              | cardId               |
| `updateDeck`   | Atualiza deck            | deckId, dados do deck|
| `deleteDeck`   | Remove deck              | deckId               |

