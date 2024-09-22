import { MultiGameResult } from "../types/types";

export function tableSummaryData(multiGameResult: MultiGameResult) {
  const totalGames =
    (multiGameResult.bust ?? 0) + (multiGameResult.winner ?? 0);
  const winningPercentage = (
    ((multiGameResult?.winner ?? 0) / totalGames) *
    100
  ).toFixed(0);
  const bustPercentage = (
    ((multiGameResult?.bust ?? 0) / totalGames) *
    100
  ).toFixed(0);
  const totalWinnings = multiGameResult.outcomes.reduce(
    (acc, curr) => acc + curr.winnings,
    0
  );
  const averageWinnings = totalWinnings / totalGames;
  return {
    totalGames,
    winningPercentage,
    bustPercentage,
    totalWinnings,
    averageWinnings,
  };
}
