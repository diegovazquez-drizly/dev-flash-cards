import type { GameResultOutcomes } from "lib/baccarat-engine/types/gameResultEnums";

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
