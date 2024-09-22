import { Button, Divider } from "@mantine/core";
import { useState } from "react";
import s from "./baccarat.module.scss";
import BaccaratInputs from "./baccaratInputs";
import BaccaratSummary from "./baccaratSummary";
import TableSummary from "./baccaratTableSummary";
import HandHistory from "./handHistory";
import MultiHandHistory from "./multiHandHistory";
import {
  Count,
  GameResults,
  GameResultsObject,
  MultiGameResult,
  Outcome,
  Winner,
} from "./types/types";
import { gameWithStrategyUsingEngine } from "./utils/gameUtils";
import {
  BetStrategies,
  betStrategies as strategies,
} from "./utils/strategies";

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
  const [multiGameResults, setMultiGameResults] = useState<MultiGameResult[]>(
    []
  );
  const [gameResultsObject, setGameResultsObject] =
    useState<GameResultsObject>();
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
      )?.strategy;
      if (!bettingStrategy) return alert("No strategy selected");
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
    const gameResultsObject: GameResultsObject = {};
    for (const strategy of bettingStrategies) {
      const outcomes: Outcome[] = [];
      const results: MultiGameResult = {
        winner: 0,
        bust: 0,
        outcomes,
        strategyName: strategy.name,
      };
      const currentStrategy = strategies.find(
        (s) => s.name === strategy.name
      ).strategy;
      for (let i = 0; i < +sessions; i++) {
        const gameResults = gameWithStrategyUsingEngine(
          currentStrategy,
          +bankRoll,
          +betSize,
          +numberOfHands,
          +targetWinnings
        );
        gameResultsObject[strategy.name] ||= [];
        gameResultsObject[strategy.name].push(gameResults);
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
    setGameResultsObject(gameResultsObject);
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
        <div className={s.DealButtonWrapper}>
          <Button
            className={s.DealButton}
            type="button"
            onClick={multiSession ? dealMultiHands : dealHands}
          >
            Deal hands
          </Button>
        </div>
        <Divider m={"md"} orientation="horizontal" />
        {!multiSession ? (
          <BaccaratSummary
            count={count}
            highWaterMark={highWaterMark}
            handsToBust={handsToBust}
          />
        ) : (
          <TableSummary multiGameResults={multiGameResults} />
        )}
      </div>

      <Divider m={"md"} orientation="horizontal" />
      {multiSession ? (
        <MultiHandHistory multiGameResults={multiGameResults} />
      ) : (
        <HandHistory gameResults={gameResults} />
      )}
    </>
  );
}

export default Baccarat;
