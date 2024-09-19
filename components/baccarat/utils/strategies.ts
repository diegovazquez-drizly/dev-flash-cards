import { Winner, WinnerType } from "../types/types";

export interface BetStrategy {
  bet: number;
  side: WinnerType;
}

export interface BetStrategies {
  name: string;
  strategies: BetStrategy[];
}

export const playerBankerPlayerMartingale2: BetStrategy[] = [
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

export const playerMartingale2: BetStrategy[] = [
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

export const bankerMartingale2: BetStrategy[] = [
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

export const bankerPlayerBankerMartingale2: BetStrategy[] = [
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

export const betStrategies: BetStrategies[] = [
  {
    name: "P-B-P-M2",
    strategies: playerBankerPlayerMartingale2,
  },
  {
    name: "Px3-M2",
    strategies: playerMartingale2,
  },
  {
    name: "Bx3-M2",
    strategies: bankerMartingale2,
  },
  {
    name: "B-P-B-M2",
    strategies: bankerPlayerBankerMartingale2,
  },
];
