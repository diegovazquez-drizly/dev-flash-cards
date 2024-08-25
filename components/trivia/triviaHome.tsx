import { useMemo, useState } from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import TriviaCardFront from "./triviaCardFront";
import TriviaControls from "./triviaControls";
import useGetQuestions from "./useGetQuestions";
import TagsFilter from "./tagsFilter";
import s from "./trivia.module.scss";
import Storage from "../../utils/storage";

export default function TriviaHome() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const { questions, tags } = useGetQuestions();
  const questionHistory = Storage.get();

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        if (filters.length === 0) return true;
        const tags = [q.tag_1, q.tag_2, q.tag_3].map((t) => t.toLowerCase());
        return filters.some((f) => tags.includes(f.toLowerCase()));
      })
      .filter((q) => {
        return !questionHistory?.includes(q.id);
      });
  }, [questions, filters, questionHistory]);

  if (!filteredQuestions || !filteredQuestions?.length)
    return <LoadingSpinner />;

  const tagKeys = Object.keys(tags);

  return (
    <div className={s.TriviaContainer}>
      <h1 className={s.Heading}>Trivia</h1>
      <TriviaControls
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        questionCount={filteredQuestions.length}
      />
      <TagsFilter tagKeys={tagKeys} setFilters={setFilters} />
      <TriviaCardFront
        questions={filteredQuestions}
        questionIndex={currentQuestionIndex}
        key={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}
