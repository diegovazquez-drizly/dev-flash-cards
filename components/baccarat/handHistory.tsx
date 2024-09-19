import { GameResults } from "./utils/gameUtils";
import React from "react";
import { Table } from "@mantine/core";
import s from "./baccarat.module.scss";

const renderRow = (row: GameResults) => {
  return (
    <Table.Tr key={row.id}>
      <Table.Td>{row.currentSide}</Table.Td>
      <Table.Td>{row.winner}</Table.Td>
      <Table.Td>{row.currentBet}</Table.Td>
      <Table.Td>{row.unitsWon}</Table.Td>
      <Table.Td>{row.bankRoll}</Table.Td>
    </Table.Tr>
  );
};

interface HandHistoryProps {
  gameResults: GameResults[];
}

export default function HandHistory({ gameResults }: HandHistoryProps) {
  return (
    <div className={s.Table}>
      <Table>
        <Table.Caption>Baccarat Hand History</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Bet</Table.Th>
            <Table.Th scope="col">Winner</Table.Th>
            <Table.Th scope="col">Bet size</Table.Th>
            <Table.Th scope="col">Units won</Table.Th>
            <Table.Th scope="col">Bankroll</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{gameResults.map((row) => renderRow(row))}</Table.Tbody>
      </Table>
    </div>
  );
}
