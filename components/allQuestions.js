import React, {useEffect, useState} from "react";
import QuestionCard from "./questionCard";
import { Button } from "@mantine/core";
import styles from "../styles/Admin.module.css";
import CategoryContainer from "./categoryContainer";

export default function AllQuestions({setPage}) {
  // api call to fetch all questions
  // display all questions in a nice way
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCards = async () => {
      const res = await fetch('/api/all_cards');
      const data = await res.json();
      setCards(data.cards);
      setCategories(data.categories);
    }
    fetchAllCards();
  },[]);

  const cardsData = {};
  categories?.forEach(c => {
    cardsData[c.category_name] = [];
  });

  cards?.forEach(c => {
    cardsData[c.category_name]?.push(c);
  })

  const categoryButtons = Object.entries(cardsData).map(([categoryName, cards]) => {
    return (
      <CategoryContainer cards={cards} categoryName={categoryName} />
    )
  })

  return (
    <>
      <div className={styles.AllQuestionsContainer}>
      <div className={styles.AllQuestionsHeadingContainer}>
        <h2>All Questions</h2>
        <Button onClick={()=>setPage('home')} className={styles.HomeButton}>Home</Button>
      </div>
        {categoryButtons}
      </div>
    </>
  );
}
