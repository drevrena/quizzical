import React from 'react';

import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';

export default function App() {

  const [quizState, setQuizState] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState(false)

  return (
      quizState ? <QuizPage difficulty={difficulty} quizState={quizState} setQuizState={setQuizState} /> : <HomePage setQuizState={setQuizState} setDifficulty={setDifficulty} />
  );
}
