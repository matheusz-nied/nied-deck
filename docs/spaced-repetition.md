# Sistema de Revisão: Fila de Estudo Infinita com Prioridade Adaptativa

Este documento descreve a implementação do sistema de revisão de flashcards baseado em uma fila de prioridade adaptativa.

## Visão Geral

O sistema utiliza uma abordagem de **Fila de estudo infinita com prioridade adaptativa**, onde os cards são reorganizados dinamicamente após cada resposta com base na dificuldade que o usuário seleciona.

Esta abordagem é ideal para manter a experiência contínua e engajadora, mesmo com poucos cards.

## Estrutura do Sistema

### 1. Flashcard (estrutura básica)

```ts
export type Flashcard = {
  id: string;
  front: string;
  back: string;
  timesSeen: number;
};
```

### 2. Fila de cards (Array rotativo)

```ts
let cardQueue: Flashcard[] = []; // fila dinâmica
```

### 3. Dificuldade

```ts
export enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
  Impossible = 4,
}
```

## Lógica de Reordenação

A função principal: `reorderCards()`

```ts
function reorderCards(
  queue: Flashcard[],
  answeredCard: Flashcard,
  difficulty: Difficulty
): Flashcard[] {
  // Remove o card respondido da fila atual
  const withoutCard = queue.filter(card => card.id !== answeredCard.id);

  // Define a nova posição do card com base na dificuldade
  const insertAtIndex = {
    [Difficulty.Easy]: withoutCard.length, // Joga pro fim
    [Difficulty.Medium]: 4,                // Volta depois de 4 cards
    [Difficulty.Hard]: 2,                  // Volta rápido
    [Difficulty.Impossible]: 1             // Reaparece quase imediatamente
  }[difficulty];

  // Garante que o índice de inserção não ultrapasse os limites do array
  const safeIndex = Math.min(insertAtIndex, withoutCard.length);

  // Reinsere o card na nova posição
  withoutCard.splice(safeIndex, 0, {
    ...answeredCard,
    timesSeen: answeredCard.timesSeen + 1,
  });

  return withoutCard;
}
```

## Exemplo de Uso

```ts
let cardQueue: Flashcard[] = [
  { id: "1", front: "A", back: "Apple", timesSeen: 0 },
  { id: "2", front: "B", back: "Banana", timesSeen: 0 },
  { id: "3", front: "C", back: "Cat", timesSeen: 0 },
  { id: "4", front: "D", back: "Dog", timesSeen: 0 },
];

function answerCard(difficulty: Difficulty) {
  const currentCard = cardQueue[0]; // Pega o primeiro da fila
  cardQueue = reorderCards(cardQueue, currentCard, difficulty);
  return currentCard;
}
```

## Resultados

A fila se reorganiza automaticamente, então:

- **Acertou fácil?** O card volta para o fim da fila
- **Errou?** O card reaparece após 1-2 cards
- Sempre há algo para estudar
- Não há necessidade de contar dias/tempo

## Melhorias Futuras

- Salvar `timesSeen` em persistência local (AsyncStorage, SQLite, etc)
- Adicionar pontuação por acerto
- Visualizar cards "mais difíceis"
- Adicionar modo "modo estudo aleatório"
