import { Winner, WinnerType } from "../types/types";

export interface BetStrategy {
  bet: number;
  side: WinnerType;
}

export interface BetStrategies {
  name: string;
  strategy: BetStrategy[];
}

export const playerBankerPlayerMartingale3: BetStrategy[] = [
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

export const playerMartingale3: BetStrategy[] = [
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

export const bankerMartingale3: BetStrategy[] = [
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

export const bankerPlayerBankerMartingale3: BetStrategy[] = [
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

export const fibonacciBanker4: BetStrategy[] = [
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
]

export const fibonacciPlayer4: BetStrategy[] = [
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
]

export const flatBanker: BetStrategy[] = [
  {
    bet: 1,
    side: Winner.banker,
  },
]

export const flatPlayer: BetStrategy[] = [
  {
    bet: 1,
    side: Winner.player,
  },
]
export const betStrategies: BetStrategies[] = [
  {
    name: "P-B-P-M3",
    strategy: playerBankerPlayerMartingale3,
  },
  {
    name: "Px3-M3",
    strategy: playerMartingale3,
  },
  {
    name: "Bx3-M3",
    strategy: bankerMartingale3,
  },
  {
    name: "B-P-B-M3",
    strategy: bankerPlayerBankerMartingale3,
  },
  {
    name: "Bx3-F4",
    strategy: fibonacciBanker4,
  },
  {
    name: "Px3-F4",
    strategy: fibonacciPlayer4,
  },
  {
    name: "Flat-B",
    strategy: flatBanker,
  },  {
    name: "Flat-P",
    strategy: flatPlayer,
  },
];
