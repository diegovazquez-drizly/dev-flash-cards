import { Count, Winner } from "./types/types";
import { percentages } from "./utils/gameUtils";
import s from "./baccarat.module.scss";
import { Divider } from "@mantine/core";

interface SummaryLineProps {
  title: string;
  value: string | number;
}
const SummaryLine = ({ title, value }: SummaryLineProps) => {
  return (
    <p className={s.SummaryLine}>
      <span className={s.Label}>{title}:</span>
      <span className={s.Value}>{value}</span>
    </p>
  );
};

export const Title = ({ children }: { children?: React.ReactNode }) => (
  <p className={s.Title}>{children}</p>
);

interface BaccaratSummaryProps {
  count: Count;
  highWaterMark: number;
  handsToBust: number;
}
function BaccaratSummary({
  count,
  highWaterMark,
  handsToBust,
}: BaccaratSummaryProps) {
  const leftSection = [
    {
      title: "Max",
      value: highWaterMark,
    },
    {
      title: "Bust #",
      value: handsToBust,
    },
  ];
  const rightSection = [
    {
      title: "Banker",
      value: `${count[Winner.banker]} | ${percentages[Winner.banker]}`,
    },
    {
      title: "Player",
      value: `${count[Winner.player]} | ${percentages[Winner.player]}`,
    },
    {
      title: "Tie",
      value: `${count[Winner.tie]} | ${percentages[Winner.tie]}`,
    },
  ];

  if (!count || !Object.values(count).reduce((a, b) => a + b, 0)) return null;

  console.log("count", count);

  return (
    <div className={s.SummaryContainer}>
      <Title>Summary</Title>
      <div className={s.SectionsContainer}>
        <div className={s.Section}>
          {leftSection.map((s) => (
            <SummaryLine key={s.title} {...s} />
          ))}
        </div>
        <Divider orientation="vertical" m={"xs"} />
        <div className={s.Section}>
          {rightSection.map((s) => (
            <SummaryLine key={s.title} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BaccaratSummary;
