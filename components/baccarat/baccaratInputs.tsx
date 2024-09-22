import { MultiSelect, NumberInput, Select } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import s from "./baccarat.module.scss";
import { betStrategies } from "./utils/strategies";

interface BaccaratInputsProps {
  numberOfHands: number | string;
  setNumberOfHands: Dispatch<SetStateAction<number | string>>;
  bankRoll: number | string;
  setBankRoll: Dispatch<SetStateAction<number | string>>;
  betSize: number | string;
  setBetSize: Dispatch<SetStateAction<number | string>>;
  targetWinnings: number | string;
  setTargetWinnings: Dispatch<SetStateAction<number | string>>;
  sessions?: number | string;
  setSessions?: Dispatch<SetStateAction<number | string>>;
  multiSession: boolean;
  betStrategy: string | string[];
  setBetStrategy: Dispatch<SetStateAction<string | string[]>>;
}

export default function BaccaratInputs({
  numberOfHands,
  setNumberOfHands,
  bankRoll,
  setBankRoll,
  betSize,
  setBetSize,
  targetWinnings,
  setTargetWinnings,
  sessions,
  setSessions,
  multiSession,
  betStrategy,
  setBetStrategy,
}: BaccaratInputsProps) {
  return (
    <div className={s.InputsContainer}>
      {/* <Title>Inputs</Title> */}
      <NumberInput
        className={s.NumberInput}
        label="Number of hands"
        id="numberOfHands"
        value={numberOfHands}
        min={1}
        onChange={setNumberOfHands}
      />
      <NumberInput
        className={s.NumberInput}
        label="Bet size"
        id="betSize"
        value={betSize}
        min={1}
        onChange={setBetSize}
      />
      <NumberInput
        className={s.NumberInput}
        label="Bank roll"
        id="bankRoll"
        value={bankRoll}
        min={1}
        onChange={setBankRoll}
      />
      <NumberInput
        className={s.NumberInput}
        label="Target Winnings"
        id="target"
        value={targetWinnings}
        min={1}
        onChange={setTargetWinnings}
      />
      {multiSession ? (
        <MultiSelect
          label="Betting Strategy"
          placeholder="Pick strategy"
          data={betStrategies.map((s) => s.name)}
          value={betStrategy as string[]}
          onChange={setBetStrategy}
        />
      ) : (
        <Select
          label="Betting Strategy"
          placeholder="Pick strategy"
          data={betStrategies.map((s) => s.name)}
          value={betStrategy as string}
          onChange={setBetStrategy}
        />
      )}
      {multiSession && (
        <NumberInput
          className={s.NumberInput}
          label="Number of sessions"
          id="sessions"
          value={sessions}
          min={1}
          onChange={setSessions}
        />
      )}
    </div>
  );
}
