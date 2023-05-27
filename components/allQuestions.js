import React, {useEffect, useState} from "react";
import QuestionCard from "./questionCard";

export default function AllQuestions() {
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
  },[])
  console.log(cards)
  return (
    <QuestionCard card={cards[0]}/>
  );
}
