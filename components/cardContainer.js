import styles from '../styles/Card.module.css';
import { useEffect, useState } from 'react';
import Card from './card';

export default function CardContainer() {
  const [didFetch, setDidFetch] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const category = 'React';

  useEffect(() => {
    if (!didFetch) {
      fetch('/api/cards?category=' + category)
        .then(res => res.json())
        .then(data => {
          setDidFetch(true);
          setCardData(data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  function nextQuestion() {
    setCardNumber(state => {
      if (state === cardData.length - 1) return 0;
      else return state + 1;
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