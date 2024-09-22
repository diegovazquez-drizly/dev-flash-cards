import React from "react";
import { Table } from "@mantine/core";
import s from "./baccarat.module.scss";
import { MultiGameResult } from "./types/types";
import { tableSummaryData } from "./utils/tableUtils";

const renderRow = (row: MultiGameResult, i: number) => {
  const { averageWinnings, bustPercentage, winningPercentage } =
    tableSummaryData(row);
  return (
    <Table.Tr key={i}>
      <Table.Td>{row.strategyName}</Table.Td>
      <Table.Td>{winningPercentage}%</Table.Td>
      <Table.Td>{bustPercentage}%</Table.Td>
      <Table.Td>{averageWinnings}</Table.Td>
    </Table.Tr>
  );
};

interface TableSummary {
  multiGameResults: MultiGameResult[];
}

export default function TableSummary({ multiGameResults }: TableSummary) {
  console.log(multiGameResults, "multiGameResults");

  return (
    <div className={s.MultiHandHistoriesContainer}>
      <div className={s.Table}>
        <Table captionSide="top">
          <Table.Caption>Multi</Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th scope="col">Strategy</Table.Th>
              <Table.Th scope="col">Winner</Table.Th>
              <Table.Th scope="col">Bust</Table.Th>
              <Table.Th scope="col">Avg Winnings</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <>
              {multiGameResults.map((row, i) => renderRow(row, i))}
            </>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
