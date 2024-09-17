import { GameResults } from "./utils/gameUtils";
import React from "react";
import { Table } from "@mantine/core";
import s from "./baccarat.module.scss";
import { MultiGameResult, Outcome } from "./types/types";

const renderRow = (row: Outcome, i: number) => {
  return (
    <Table.Tr key={i}>
      <Table.Td>{row.didWin ? "Win" : "Bust"}</Table.Td>
      <Table.Td>{row.winnings}</Table.Td>
    </Table.Tr>
  );
};

interface MultiHandHistoryProps {
  multiGameResult: MultiGameResult;
}

interface MultiHandHistoriesProps {
  multiGameResults: MultiGameResult[];
}

function MultiHandHistory({ multiGameResult }: MultiHandHistoryProps) {
  if (!multiGameResult) {
    return (
      <div className={s.Table}>
        <Table>
          <Table.Caption>Baccarat Sessions History</Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th scope="col">Outcome</Table.Th>
              <Table.Th scope="col">Winnings</Table.Th>
            </Table.Tr>
          </Table.Thead>
        </Table>
      </div>
    );
  }

  const { outcomes, strategyName } = multiGameResult;
  const totalWinnings = outcomes.reduce((acc, curr) => acc + curr.winnings, 0);

  return (
    <div className={s.Table}>
      <Table captionSide="top">
        <Table.Caption>{strategyName}</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Outcome</Table.Th>
            <Table.Th scope="col">Winnings</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <>
            {outcomes.map((row, i) => renderRow(row, i))}
            <Table.Tr>
              <Table.Td style={{ fontWeight: "bold" }}>Total</Table.Td>
              <Table.Td>{totalWinnings}</Table.Td>
            </Table.Tr>
          </>
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default function MultiHandHistories({
  multiGameResults,
}: MultiHandHistoriesProps) {
  return (
    <div className={s.MultiHandHistoriesContainer}>
      {multiGameResults.map((result) => (
        <MultiHandHistory key={result.strategyName} multiGameResult={result} />
      ))}
    </div>
  );
}
