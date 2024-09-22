const enum GameResultOutcomes {
  Player = "player",
  Banker = "banker",
  Tie = "tie",
}

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

export type WinnerType =
  | "player"
  | "banker"
  | "tie"
  | GameResultOutcomes.Player
  | GameResultOutcomes.Banker
  | GameResultOutcomes.Tie;

export const Winner: Record<"player" | "banker" | "tie", WinnerType> = {
  player: "player",
  banker: "banker",
  tie: "tie",
} as const;

export type Count = Record<string, number>;

export interface Outcome {
  didWin: boolean;
  winnings: number;
}

export interface MultiGameResult {
  winner: number;
  bust: number;
  outcomes: Outcome[];
  strategyName: string;
}

export type GameResultsObject = Record<string, GameResults[][]>;
