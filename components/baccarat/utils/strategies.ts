import { Winner, WinnerType } from "../types/types";

type StrategyType =
  | "Martingale"
  | "Fibonacci"
  | "FixedAmount"
  | "FixedPercentage";

export interface BetSide {
  bet: number;
  side: WinnerType;
}

export interface BetStrategy {
  name: string;
  type: StrategyType;
  strategy: BetSide[];
}

export const playerBankerPlayerMartingale3: BetSide[] = [
  {
    bet: 1,
    side: Winner.player,
  },
  {
    bet: 2,
    side: Winner.banker,
  },
  {
    bet: 4,
    side: Winner.player,
  },
];

export const playerMartingale3: BetSide[] = [
  {
    bet: 1,
    side: Winner.player,
  },
  {
    bet: 2,
    side: Winner.player,
  },
  {
    bet: 4,
    side: Winner.player,
  },
];

export const bankerMartingale3: BetSide[] = [
  {
    bet: 1,
    side: Winner.banker,
  },
  {
    bet: 2,
    side: Winner.banker,
  },
  {
    bet: 4,
    side: Winner.banker,
  },
];

export const bankerPlayerBankerMartingale3: BetSide[] = [
  {
    bet: 1,
    side: Winner.banker,
  },
  {
    bet: 2,
    side: Winner.player,
  },
  {
    bet: 4,
    side: Winner.banker,
  },
];

export const fibonacciBanker4: BetSide[] = [
  {
    bet: 1,
    side: Winner.banker,
  },
  {
    bet: 2,
    side: Winner.banker,
  },
  {
    bet: 3,
    side: Winner.banker,
  },
  {
    bet: 5,
    side: Winner.banker,
  },
];

export const fibonacciPlayer4: BetSide[] = [
  {
    bet: 1,
    side: Winner.player,
  },
  {
    bet: 2,
    side: Winner.player,
  },
  {
    bet: 3,
    side: Winner.player,
  },
  {
    bet: 5,
    side: Winner.player,
  },
];

export const flatBanker: BetSide[] = [
  {
    bet: 1,
    side: Winner.banker,
  },
];

export const flatPlayer: BetSide[] = [
  {
    bet: 1,
    side: Winner.player,
  },
];

export const fixed10PercentBanker: BetSide[] = [
  {
    bet: 0.1,
    side: Winner.banker,
  },
];

export const fixed10PercentPlayer: BetSide[] = [
  {
    bet: 0.1,
    side: Winner.player,
  },
];

export const betStrategies: BetStrategy[] = [
  {
    name: "P-B-P-M3",
    type: "Martingale",
    strategy: playerBankerPlayerMartingale3,
  },
  {
    name: "Px3-M3",
    type: "Martingale",
    strategy: playerMartingale3,
  },
  {
    name: "Bx3-M3",
    type: "Martingale",
    strategy: bankerMartingale3,
  },
  {
    name: "B-P-B-M3",
    type: "Martingale",
    strategy: bankerPlayerBankerMartingale3,
  },
  {
    name: "Bx3-F4",
    type: "Fibonacci",
    strategy: fibonacciBanker4,
  },
  {
    name: "Px3-F4",
    type: "Fibonacci",
    strategy: fibonacciPlayer4,
  },
  {
    name: "Flat-B",
    type: "FixedAmount",
    strategy: flatBanker,
  },
  {
    name: "Flat-P",
    type: "FixedAmount",
    strategy: flatPlayer,
  },
  {
    name: "10p-B",
    type: "FixedPercentage",
    strategy: fixed10PercentBanker,
  },
  {
    name: "10p-P",
    type: "FixedPercentage",
    strategy: fixed10PercentPlayer,
  },
];
