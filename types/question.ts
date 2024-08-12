export interface Question {
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correct_answer: string;
  detailed_answer: string;
  tag_1: string;
  tag_2: string;
  tag_3: string;
  show: string | boolean;
}

export function isQuestion(object: any): object is Question {
  return (
    "question" in object &&
    "answer_1" in object &&
    "answer_2" in object &&
    "answer_3" in object &&
    "answer_4" in object &&
    "correct_answer" in object &&
    "detailed_answer" in object &&
    "tag_1" in object &&
    "tag_2" in object &&
    "tag_3" in object
  );
}
