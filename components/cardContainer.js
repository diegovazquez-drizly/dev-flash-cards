import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Card.module.css";
import Card from "./card";
import cardTransition from "../helperFunctions/cardTransition";
import LoadingSpinner from "./loadingSpinner/loadingSpinner";

//TODO: use reducer for state instead of so many useStates

export default function CardContainer({ category }) {
  const [cardData, setCardData] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    setCardData([]);
    if (currentCategory !== category) {
      if (currentCategory) {
        setShowLoading(true);
        setTimeout(() => setShowLoading(false), 750);
      }
      setCurrentCategory(category);
      fetch("/api/cards?category=" + category)
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            cardTransition(parentRef, childRef, setCardData, data);
            setCardData(data);
            setCardNumber(0);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [category]);

  function nextQuestion() {
    setCardNumber((number) => {
      if (number === cardData.length - 1) return 0;
      else return number + 1;
    });
  }

  return (
    <div className={styles.root} ref={parentRef}>
      {cardData.length ? (
        <div className={styles.cardsContainer} ref={childRef}>
          <h1 className={styles.categoryTitle}>{category}</h1>
          <Card card={cardData[cardNumber]} nextQuestion={nextQuestion} />
        </div>
      ) : null}
      {showLoading ? (
        <LoadingSpinner height="200px" fill="darkgray" duration="1s" />
      ) : null}
    </div>
  );
}
