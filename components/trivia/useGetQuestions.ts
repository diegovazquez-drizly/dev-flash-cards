import { useEffect, useState } from "react";
import { Question } from "../../pages/api/types";

export default function useGetQuestions() {
  const [questions, setQuestions] = useState<Question[]>();

  useEffect(() => {
    const fetchQuestions = async (): Promise<Question[]> => {
      const res = await fetch('api/get_questions');
      const questions = await res.json();
      return questions;
    };
    fetchQuestions()
      .then((data) => setQuestions(data))
      .catch((e) => console.error(e));
  }, []);

  return questions;
}
