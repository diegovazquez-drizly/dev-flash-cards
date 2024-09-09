import { Count, Winner } from "./types/types";
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
  return (
    <div className={s.SummaryContainer}>
      <Title>Summary</Title>
      <P>
        High water mark:&nbsp;<Span>{highWaterMark}</Span>
      </P>
      <P>
        Hands to bust:&nbsp;<Span>{handsToBust}</Span>
      </P>
      <P>
        Banker:&nbsp;
        <Span>
          {count[Winner.banker]} | {percentages[Winner.banker]}
        </Span>
      </P>
      <P>
        Player:&nbsp;
        <Span>
          {count[Winner.player]} | {percentages[Winner.player]}
        </Span>
      </P>
      <P>
        Tie:&nbsp;
        <Span>
          {count[Winner.tie]} | {percentages[Winner.tie]}
        </Span>
      </P>
    </div>
  );
}

export default BaccaratSummary;
