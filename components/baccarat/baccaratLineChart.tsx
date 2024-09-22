import { LineChart } from "@mantine/charts";
import { GameResults } from "./types/types";

const transformGameResults = (gameResults: GameResults[]) => {
  return gameResults.map((o, i) => {
    return {
      handNumber: o.handNumber,
      bankRoll: o.bankRoll,
    };
  });
};

interface BaccaratLineChartProps {
  gameResults: GameResults[];
}
export default function BaccaratLineChart({
  gameResults,
}: BaccaratLineChartProps) {
  if (!gameResults) return null;

  const data = transformGameResults(gameResults);
  return (
    <LineChart
      w={"100%"}
      h={300}
      data={data}
      dataKey="handNumber"
      series={[{ name: "bankRoll", color: "indigo.6" }]}
      curveType="linear"
    />
  );
}
