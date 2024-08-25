import React from "react";
import s from "./trivia.module.scss";

interface TriviaControlsProps {
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questionCount: number;
}

export default function TriviaControls({
  setCurrentQuestionIndex,
  questionCount,
}: TriviaControlsProps) {
  const goBack = () => {

    setCurrentQuestionIndex((i) => (i > 0 ? i - 1 : questionCount - 1));
  };
  const goForward = () => {
    setCurrentQuestionIndex((i) => (i + 1) % questionCount);
  };
  const randomQuestion = () => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questionCount));
  };
  return (
    <div className={s.TriviaControlsContainer}>
      <button
        className={s.TriviaControlsButton}
        title="Go back"
        onClick={goBack}
      >
        👈
      </button>
      <button
        className={s.TriviaControlsButton}
        title="Random question"
        onClick={randomQuestion}
      >
        🎲
      </button>
      <button
        className={s.TriviaControlsButton}
        title="Go forward"
        onClick={goForward}
      >
        👉
      </button>
    </div>
  );
}
