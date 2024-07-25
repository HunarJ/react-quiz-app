import React, { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import quizCompleateImg from "../assets/quiz-complete.png";
import { QuestionTimer } from "./QuestionTimer";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsCompleate = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout((first) => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), []);

  if (quizIsCompleate) {
    return (
      <div id="summary">
        <img src={quizCompleateImg} alt="Trophy icon" />
        <h2>Quiz Compleated!</h2>
      </div>
    );
  }

  const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffeledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffeledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length -1] === answer;
            let cssClass = "";
            if (answerState ==='answered' && isSelected) {
              cssClass = 'selected';
            }
            
            if ((answerState == 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => {
                    handleSelectAnswer(answer);
                  }}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
