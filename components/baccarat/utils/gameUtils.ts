import { BetStrategy } from "./strategies";
import GameResult from "../../../lib/baccarat-engine/types/gameResult";
import { Winner, WinnerType } from "../types/types";
import BaccaratGameEngine from "../../../lib/baccarat-engine/src/gameEngine/baccaratGameEngine";

export interface GameResults {
  bankRoll: number;
  winner: WinnerType;
  unitsWon: number;
  currentBet: number;
  currentSide: WinnerType;
  strategyIndex: number;
  id: string;
  handNumber: number;
  bust: boolean;
  targetReached: boolean;
}

export const odds = {
  [Winner.banker]: 458597,
  [Winner.player]: 446247,
  [Winner.tie]: 95156,
};

export const percentages = {
  [Winner.banker]: odds[Winner.banker] / 10000 + "%",
  [Winner.player]: odds[Winner.player] / 10000 + "%",
  [Winner.tie]: odds[Winner.tie] / 10000 + "%",
};

function randomNumberGenerator() {
  return Math.floor(Math.random() * 1000001);
}

export function dealHand(): Partial<GameResult> {
  const hand = randomNumberGenerator();
  const gameResult: Record<"outcome", WinnerType> = { outcome: Winner.tie };
  if (hand <= odds[Winner.banker]) gameResult.outcome = Winner.banker;
  else if (hand <= odds[Winner.banker] + odds[Winner.player])
    gameResult.outcome = Winner.player;
  else gameResult.outcome = Winner.tie;
  return gameResult as GameResult;
}

export function gameWithStrategy(
  strategy: BetStrategy[],
  bankRoll = 100,
  betSize = 10,
  hands = 10000
): GameResults[] {
  let strategyIndex = 0;
  let handNumber = 0;
  const results: GameResults[] = [];
  for (let i = 0; i < hands; i++) {
    const currentSide = strategy[strategyIndex].side;
    const currentBet = strategy[strategyIndex].bet * betSize;
    let unitsWon = 0;
    const result = dealHand();
    handNumber++;
    const gameData = {
      currentSide,
      currentBet,
    };
    if (result.outcome === currentSide) {
      bankRoll += currentBet;
      unitsWon =
        result.outcome === Winner.banker ? 0.95 * currentBet : currentBet;
      strategyIndex = 0;
    } else if (result.outcome !== Winner.tie) {
      bankRoll -= currentBet;
      unitsWon = -currentBet;
      strategyIndex++;
      if (strategyIndex > strategy.length - 1) {
        strategyIndex = 0;
      }
    }
    results.push({
      ...gameData,
      winner: result.outcome!,
      bankRoll,
      unitsWon,
      strategyIndex,
      handNumber,
      id: crypto.randomUUID(),
      bust: false,
      targetReached: false,
    });
    if (bankRoll <= 0 || bankRoll < strategy[strategyIndex].bet * betSize) {
      results.at(-1).bust = true;
      break;
    }
  }
  return results;
}

export function gameWithStrategyUsingEngine(
  strategy: BetStrategy[],
  bankRoll = 100,
  betSize = 10,
  hands = 10000,
  targetWinnings = 100
): GameResults[] {
  const initialBankRoll = bankRoll;
  const gameEngine = new BaccaratGameEngine();
  gameEngine.shoe.createDecks();
  gameEngine.shoe.shuffle();
  gameEngine.burnCards();

  let strategyIndex = 0;
  let handNumber = 0;
  const results: GameResults[] = [];

  for (let i = 0; i < hands; i++) {
    if (gameEngine.isBurnNeeded) {
      gameEngine.shoe.shuffle();
      gameEngine.burnCards();
    }

    const currentSide = strategy[strategyIndex].side;
    const currentBet = strategy[strategyIndex].bet * betSize;
    let unitsWon = 0;

    const hand = gameEngine.dealGame();

    const result = gameEngine.resultsEngine.calculateGameResult(hand);

    handNumber++;
    const gameData = {
      currentSide,
      currentBet,
    };

    if (result.outcome === currentSide) {
      bankRoll += currentBet;
      unitsWon =
        result.outcome === Winner.banker ? 0.95 * currentBet : currentBet;
      strategyIndex = 0;
    } else if (result.outcome !== Winner.tie) {
      bankRoll -= currentBet;
      unitsWon = -currentBet;
      strategyIndex++;
      if (strategyIndex > strategy.length - 1) {
        strategyIndex = 0;
      }
    }
    results.push({
      ...gameData,
      winner: result.outcome!,
      bankRoll,
      unitsWon,
      strategyIndex,
      handNumber,
      id: crypto.randomUUID(),
      bust: false,
      targetReached: false,
    });
    if (bankRoll <= 0 || bankRoll < strategy[strategyIndex].bet * betSize) {
      results.at(-1).bust = true;
      break;
    }
    if (initialBankRoll + targetWinnings <= bankRoll) {
      results.at(-1).targetReached = true;
      break;
    }
  }
  return results;
}
