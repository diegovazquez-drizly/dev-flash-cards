import React from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Admin.module.css";
import CategoryContainer from "./categoryContainer";
import { useGetAllCards } from "./hooks";

export default function AllQuestions({ setAdminPage }) {
  const [cards, categories] = useGetAllCards();
  const cardsData = {};

  categories?.forEach((c) => {
    cardsData[c.category_name] = [];
  });

  cards?.forEach((c) => {
    cardsData[c.category_name]?.push(c);
  });

  const categoryButtons = Object.entries(cardsData).map(
    ([categoryName, cards]) => {
      return (
        <CategoryContainer
          cards={cards}
          categoryName={categoryName}
          key={categoryName}
        />
      );
    }
  );

  return (
    <>
      <div className={styles.AllQuestionsContainer}>
        <div className={styles.AllQuestionsHeadingContainer}>
          <h2>All Questions</h2>
          <Button
            onClick={() => setAdminPage("home")}
            className={styles.HomeButton}
          >
            Admin Home
          </Button>
        </div>
        {categoryButtons}
      </div>
    </>
  );
}
