import styles from '../styles/Card.module.css';
import {useState, useRef} from 'react';

export default function Card({ card, nextQuestion }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const hintRef = useRef();
  const innerRef = useRef();

  const buttonText = !showHint ? 'Show Hint?' : 'Hide Hint?';
  const answerText = !showAnswer ? 'Show Answer' : 'Next Question ➡️'; 

  function handleHintClick(e) {
    if (showHint) {
      hintRef.current.style.visibility = 'hidden';
      setShowHint(false);
    } else {
      hintRef.current.style.visibility = 'inherit';
      setShowHint(true);
    }
  }

  function handleAnswerClick(e) {
    if (answerText === 'Next Question ➡️') {
      nextQuestion();
      setShowHint(false);
      setShowAnswer(false);
      innerRef.current.style.transform = 'none';
      hintRef.current.style.visibility = 'hidden';
    } else {
      setShowAnswer(true);
      innerRef.current.style.transform = 'rotateY(180deg)';
    }
  }

  return (
    <>
      <div className={styles.flipCard}>
        <div className={styles.question}>{card.card_question}</div>
        <div className={styles.flipCardInner} ref={innerRef}>
          <div className={styles.flipCardFront}>
            <div className={styles.hintWrapper}>
              <button className={styles.hintButton} onClick={handleHintClick}>{buttonText}</button>
              <div className={styles.hint} ref={hintRef}>{card.card_hint}</div>
            </div>
          </div>
          <div className={styles.flipCardBack}> 
            <div>
              <p>{card.card_answer}</p>
              <div>{card.card_code}</div>
              <a>{card.card_source}</a>
            </div>
          </div>
        </div>
      </div>
      <button 
        className={styles.answerButton} 
        onClick={handleAnswerClick}
      >
        {answerText}
      </button>
    </>
  );
}

