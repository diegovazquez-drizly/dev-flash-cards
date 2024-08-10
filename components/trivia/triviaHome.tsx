import { useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import TriviaCardFront from "./triviaCardFront";
import TriviaControls from "./triviaControls";
import useGetQuestions from "./useGetQuestions";

export default function TriviaHome() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = useGetQuestions();
  return (
    <>
      {!questions || !questions?.length ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Trivia</h1>
          <TriviaControls
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questionCount={questions.length}
          />
          <TriviaCardFront
            questions={questions}
            questionIndex={currentQuestionIndex}
            key={currentQuestionIndex}
          />
        </>
      )}
    </>
  );
}
