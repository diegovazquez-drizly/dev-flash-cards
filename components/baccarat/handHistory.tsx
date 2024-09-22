import { GameResults } from "./types/types";
import React from "react";
import { Table } from "@mantine/core";
import s from "./baccarat.module.scss";
import BaccaratLineChart from "./baccaratLineChart";
import { Accordion } from "@mantine/core";

interface HandHistoryProps {
  gameResults: GameResults[];
}

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

const HistoryTable = ({ gameResults }: HandHistoryProps) => {
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
};

export default function HandHistory({ gameResults }: HandHistoryProps) {
  const accordiansItems = [
    {
      value: "Line graph",
      content: <BaccaratLineChart gameResults={gameResults} />,
    },
    {
      value: "Table",
      content: <HistoryTable gameResults={gameResults} />,
    },
  ];
  const items = accordiansItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.content}</Accordion.Panel>
    </Accordion.Item>
  ));

  if (!gameResults || !gameResults.length) return null;

  return (
    <>
      <Accordion defaultValue="Line graph">{items}</Accordion>
    </>
  );
}
