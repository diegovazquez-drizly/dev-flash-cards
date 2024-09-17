import { Count, MultiGameResult, Winner } from "./types/types";
import { percentages } from "./utils/gameUtils";
import s from "./baccarat.module.scss";

const P = ({ children }: { children?: React.ReactNode }) => (
  <p className={s.Label}>{children}</p>
);
const Span = ({ children }: { children?: React.ReactNode }) => (
  <span className={s.Value}>{children}</span>
);

export const Title = ({ children }: { children?: React.ReactNode }) => (
  <p className={s.Title}>{children}</p>
);

interface BaccaratMultiSummaryProps {
  multiGameResult: MultiGameResult;
}

interface BaccaratMultiSummariesProps {
  multiGameResults: MultiGameResult[];
}

function BaccaratMultiSummary({ multiGameResult }: BaccaratMultiSummaryProps) {
  if (!multiGameResult)
    return (
      <div className={s.SummaryContainer}>
        <Title>Summary</Title>
      </div>
    );
  const totalGames =
    (multiGameResult.bust ?? 0) + (multiGameResult.winner ?? 0);
  const winningPercentage = ((multiGameResult?.winner ?? 0) / totalGames) * 100;
  const bustPercentage = ((multiGameResult?.bust ?? 0) / totalGames) * 100;
  const totalWinnings = multiGameResult.outcomes.reduce(
    (acc, curr) => acc + curr.winnings,
    0
  );
  const averageWinnings = totalWinnings / totalGames;
  const endBankroll = totalGames * 100 + totalWinnings;
  return (
    <div className={s.SummaryContainer}>
      <Title>{multiGameResult.strategyName} Summary</Title>
      {totalGames ? (
        <>
          <P>
            Winner:&nbsp;<Span>{winningPercentage.toFixed(2)}%</Span>
          </P>
          <P>
            Bust:&nbsp;<Span>{bustPercentage.toFixed(2)}%</Span>
          </P>{" "}
          <P>
            Avg Winnings:&nbsp;<Span>{averageWinnings.toFixed(2)}</Span>
          </P>
        </>
      ) : null}
    </div>
  );
}

export default function BaccaratMultiSummaries({
  multiGameResults,
}: BaccaratMultiSummariesProps) {
  return (
    <>
      {(multiGameResults ?? []).map((result) => (
        <BaccaratMultiSummary
          key={result.strategyName}
          multiGameResult={result}
        />
      ))}
    </>
  );
}
