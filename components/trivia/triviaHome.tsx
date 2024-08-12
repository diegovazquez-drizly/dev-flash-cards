import { useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import TriviaCardFront from "./triviaCardFront";
import TriviaControls from "./triviaControls";
import useGetQuestions from "./useGetQuestions";
import { MultiSelect } from "@mantine/core";
import TagsFilter from "./tagsFilter";
import s from "./trivia.module.scss";

export default function TriviaHome() {
  const [value, setValue] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { questions, tags } = useGetQuestions();

  if (!questions || !questions?.length) return <LoadingSpinner />;

  const tagKeys = Object.keys(tags);

  return (
    <div className={s.TriviaContainer}>
      <h1>Trivia</h1>
      <TriviaControls
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        questionCount={questions.length}
      />
      <TagsFilter tagKeys={tagKeys} />
      <TriviaCardFront
        questions={questions}
        questionIndex={currentQuestionIndex}
        key={currentQuestionIndex}
      />
    </div>
  );
}
