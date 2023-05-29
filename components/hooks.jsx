import { useState, useEffect } from "react";

export function useGetCategories() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return categoryData;
}

export function useGetAllCards() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCards = async () => {
      const res = await fetch("/api/all_cards");
      const data = await res.json();
      setCards(data.cards);
      setCategories(data.categories);
    };
    fetchAllCards();
  }, []);

  return [cards, categories];
}
