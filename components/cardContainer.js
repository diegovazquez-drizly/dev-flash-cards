import { useEffect, useState } from 'react';
import styles from '../styles/Card.module.css';
import Card from './card';

export default function CardContainer({ category }) {

  const [didFetch, setDidFetch] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
      
  useEffect(() => {
    setDidFetch(false);
    setCardData([]);
    if (!didFetch) {
      fetch('/api/cards?category=' + category)
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            setDidFetch(true);
            setCardData(data);
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
      { didFetch && cardData.length 
        ? 
          <>
            <h1>{category}</h1>
            <Card card={cardData[cardNumber]} nextQuestion={nextQuestion}/>
          </>
        : <h1>Loading</h1>
      }
    </div>
    )
}