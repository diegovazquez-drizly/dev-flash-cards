import cn from "classnames";
import React, { useState } from "react";
import { Question } from "../../types/question";
import s from "./trivia.module.scss";
import Storage from "../../utils/storage";
import { Button } from "@mantine/core";
import ResetDialog from "./resetDialog";
import { useDisclosure } from "@mantine/hooks";

interface TriviaCardProps {
  questionIndex: number;
  questions: Question[];
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ACharCode = "A".charCodeAt(0);

function flipCard(
  setIsFlipCard: React.Dispatch<React.SetStateAction<boolean>>
) {
  setTimeout(() => {
    setIsFlipCard(true);
  }, 500);
}

const tags = (tags: string[]) => {
  return tags.map((tag) => (
    <div key={tag} className={s.Tag}>
      {tag}
    </div>
  ));
};

export default function TriviaCard({
  questionIndex,
  questions,
  setCurrentQuestionIndex,
}: TriviaCardProps) {
  const [answerIsWrong, setAnswerIsWrong] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(-1);
  const [isFlipCard, setIsFlipCard] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  if (!questions[questionIndex]) {
    setCurrentQuestionIndex(0);
    console.error("Question index out of bounds. Index reset to 0.");
    return;
  }

  const {
    question: title,
    answer_1,
    answer_2,
    answer_3,
    answer_4,
    correct_answer,
    detailed_answer,
    tag_1,
    tag_2,
    tag_3,
    id,
  } = questions[questionIndex];

  const answers = [answer_1, answer_2, answer_3, answer_4];

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (answers[index] === correct_answer) {
      setCorrectAnswerIndex(index);
      flipCard(setIsFlipCard);
      handleCorrectAnswer(id);
    } else {
      setAnswerIsWrong((state) => {
        const newState = [...state];
        newState[index] = true;
        return newState;
      });
    }
  };

  const checkBox = (i: number): string => {
    if (i === correctAnswerIndex) return "✅";
    else if (answerIsWrong[i]) return "❌";
    else return "";
  };

  const handleCorrectAnswer = (questionId: string) => {
    const history: string[] = Storage.get();
    history.push(questionId);
    Storage.save(JSON.stringify(history));
  };

  return (
    <div className={cn(s.CardContainer)}>
      <p className={s.Title}>{title}</p>
      <div
        className={cn(s.CardInner, {
          [s.CardFlip]: isFlipCard,
        })}
      >
        <div className={s.CardFront}>
          <div className={s.AnswersContainer}>
            {answers.map((answer, i) => {
              const letter = String.fromCharCode(ACharCode + i);
              return (
                <button
                  key={answer}
                  className={cn(s.BaseAnswer, {
                    [s.Answer]: !answerIsWrong[i],
                    [s.CorrectAnswer]: i === correctAnswerIndex,
                  })}
                  onClick={(e) => handleClick(e, i)}
                  disabled={answerIsWrong[i]}
                >
                  {`${letter}: ${answer} ${checkBox(i)}`}
                </button>
              );
            })}
          </div>
        </div>
        <div className={cn(s.AnswersContainer, s.CardBack)}>
          <p className={s.Text}>Answer: {correct_answer}</p>
          <p className={s.Text}>{detailed_answer}</p>
        </div>
      </div>
      <div className={s.CardBase}>
        <div className={s.TagsContainer}>{tags([tag_1, tag_2, tag_3])}</div>
        <Button variant="outline" className={s.ResetButton} onClick={toggle}>
          Reset
        </Button>
      </div>
      <p>Questions remaining: {questions.length}</p>
      <ResetDialog showDialog={opened} setShowDialog={toggle} close={toggle} />
    </div>
  );
}
