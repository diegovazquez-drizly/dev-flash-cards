import { useEffect, useState } from "react";
import { Question } from "../../types/question";
import { TagInfo } from "../../types/tagInfo";

interface QuestionsResponse {
  questions: Question[];
  tags: TagInfo;
}

export default function useGetQuestions() {
  const [res, setRes] = useState<QuestionsResponse>();

  useEffect(() => {
    const fetchQuestions = async (): Promise<QuestionsResponse> => {
      const res = await fetch("api/get_questions");
      const questions = await res.json();
      return questions;
    };

    fetchQuestions()
      .then((data) => {
        setRes(data);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!res) return {};

  const { questions, tags } = res;

  return { questions, tags };
}
