import { useState } from "react";
import BaccaratInputs from "./baccaratInputs";
import BaccaratSummary from "./baccaratSummary";
import HandHistory from "./handHistory";
import { Count, MultiGameResult, Outcome, Winner } from "./types/types";
import { GameResults, gameWithStrategyUsingEngine } from "./utils/gameUtils";
import {
  BetStrategies,
  playerBankerPlayerMartingale2,
} from "./utils/strategies";
import s from "./baccarat.module.scss";
import { Button, Divider } from "@mantine/core";
import BaccaratMultiSummaries from "./baccaratMultiSummary";
import MultiHandHistory from "./multiHandHistory";
import { betStrategies as strategies } from "./utils/strategies";

const INITIAL_BANKROLL = 100;
const INITIAL_BET_SIZE = 10;
const INITIAL_NUMBER_OF_HANDS = 100;

interface Props {
  multiSession: boolean;
}

function Baccarat({ multiSession }: Props) {
  const [betSize, setBetSize] = useState<number | string>(INITIAL_BET_SIZE);
  const [bankRoll, setBankRoll] = useState<number | string>(INITIAL_BANKROLL);
  const [sessions, setSessions] = useState<number | string>(1);
  const [targetWinnings, setTargetWinnings] = useState<number | string>(
    INITIAL_BANKROLL
  );
  const [numberOfHands, setNumberOfHands] = useState<number | string>(
    INITIAL_NUMBER_OF_HANDS
  );
  const [count, setCount] = useState<Count>({
    [Winner.banker]: 0,
    [Winner.player]: 0,
    [Winner.tie]: 0,
  });
  const [highWaterMark, setHighWaterMark] = useState(INITIAL_BANKROLL);
  const [handsToBust, setHandsToBust] = useState<number>();
  const [gameResults, setGameResults] = useState<GameResults[]>([]);
  const [multiGameResults, setMultiGameResults] = useState<MultiGameResult[]>([]);
  const [betStrategies, setBetStrategies] = useState<string | string[]>([
    strategies[0].name,
  ]);

  const resetGameState = async () => {
    setCount({
      [Winner.banker]: 0,
      [Winner.player]: 0,
      [Winner.tie]: 0,
    });
    setHighWaterMark(+bankRoll);
    setHandsToBust(undefined);
  };

  const dealHands = () => {
    resetGameState().then(() => {
      const count = {
        [Winner.banker]: 0,
        [Winner.player]: 0,
        [Winner.tie]: 0,
      };
      const bettingStrategy = strategies.find(
        (s) => s.name === betStrategies
      ).strategies;
      const gameResults = gameWithStrategyUsingEngine(
        bettingStrategy,
        +bankRoll,
        +betSize,
        +numberOfHands,
        +targetWinnings
      );
      setGameResults(gameResults);
      let highWaterMark = 0;
      gameResults.forEach((game) => {
        if (game.bankRoll > highWaterMark) highWaterMark = game.bankRoll;
        count[game.winner] += 1;
      });
      setCount((state) => ({ ...state, ...count }));
      setHighWaterMark(highWaterMark);
      if (gameResults.at(-1)?.bust)
        setHandsToBust(gameResults.at(-1).handNumber);
    });
  };

  const dealMultiHands = () => {
    const bettingStrategies: BetStrategies[] = strategies.filter((strategy) =>
      betStrategies.includes(strategy.name)
    );
    const resultsArray: MultiGameResult[] = [];
    for (const strategy of bettingStrategies) {
      const outcomes: Outcome[] = [];
      const results: MultiGameResult = {
        winner: 0,
        bust: 0,
        outcomes,
        strategyName: strategy.name,
      };
      for (let i = 0; i < +sessions; i++) {
        const gameResults = gameWithStrategyUsingEngine(
          playerBankerPlayerMartingale2,
          +bankRoll,
          +betSize,
          +numberOfHands,
          +targetWinnings
        );
        const didBust = gameResults.at(-1)?.bust;
        const winnings = gameResults.at(-1)?.bankRoll - +bankRoll;
        results.outcomes.push({
          didWin: !didBust,
          winnings,
        });
        if (didBust) results.bust += 1;
        else results.winner += 1;
      }
      resultsArray.push(results);
    }
    setMultiGameResults(resultsArray);
  };

  return (
    <>
      <div className={s.BaccaratSummaryContainer}>
        <BaccaratInputs
          betSize={betSize}
          bankRoll={bankRoll}
          numberOfHands={numberOfHands}
          setBetSize={setBetSize}
          setBankRoll={setBankRoll}
          setNumberOfHands={setNumberOfHands}
          targetWinnings={targetWinnings}
          setTargetWinnings={setTargetWinnings}
          multiSession={multiSession}
          sessions={multiSession ? sessions : null}
          setSessions={multiSession ? setSessions : null}
          betStrategy={betStrategies}
          setBetStrategy={setBetStrategies}
        />
        <Divider m={8} size="sm" orientation="vertical" />
        {!multiSession ? (
          <BaccaratSummary
            count={count}
            highWaterMark={highWaterMark}
            handsToBust={handsToBust}
          />
        ) : (
          <BaccaratMultiSummaries multiGameResults={multiGameResults} />
        )}
      </div>
      <Button
        className={s.DealButton}
        type="button"
        onClick={multiSession ? dealMultiHands : dealHands}
      >
        Deal hands
      </Button>
      {multiSession ? (
        <MultiHandHistory multiGameResults={multiGameResults} />
      ) : (
        <HandHistory gameResults={gameResults} />
      )}
    </>
  );
}

export default Baccarat;
