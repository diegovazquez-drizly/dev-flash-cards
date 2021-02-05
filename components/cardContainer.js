import { useEffect, useState } from 'react';
import styles from '../styles/Card.module.css';
import Card from './card';

export default function CardContainer({ category }) {

  const [cardData, setCardData] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    setCardData([]);
    if (currentCategory !== category) {
      fetch('/api/cards?category=' + category)
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            setCardData(data);
            setCurrentCategory(category);
            setCardNumber(0);
          } 
        })
        .catch(err => console.log(err));
    }
  }, [category]);

  function nextQuestion() {
    setCardNumber(number => {
      if (number === cardData.length - 1) return 0;
      else return number + 1;
    });
  }
  
  return (
    <div className={styles.root}>
      { cardData.length 
        ? 
          <>
            <h1 className={styles.categoryTitle}>{category}</h1>
            <Card card={cardData[cardNumber]} nextQuestion={nextQuestion}/>
          </>
        : null
      }
    </div>
    );
}