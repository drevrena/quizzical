import React from "react"
import Quiz from "./Quiz"
import { nanoid } from 'nanoid'


export default function QuizPage(props) {
    const [questions, setQuestions] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [finished, setFinished] = React.useState(false)


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleSubmit() {
        if (finished) {
            setAnswers([])
            props.setQuizState(prev => !prev)
        }
        setFinished(prev => !prev)

    }

    function handleAnswerClick(question, answer) {
        setAnswers(prev => ({
            ...prev,
            [question]: answer
        }))
    }

    function getPoints() {
        let points = 0;
        Object.keys(answers).forEach(key => {
            let question = questions.find(quest => quest.question === key)
            if (question != null && question.correctAnswer === answers[key]) {
                points++
            }
        })
        return points
    }


    React.useEffect(() => {
        setLoading(true)
        fetch(`https://opentdb.com/api.php?amount=5&difficulty=${props.difficulty}&type=multiple`)
            .then(res => res.json())
            .then(items => {
               setQuestions(
                items.results.map(item => ({
                    question: item.question,
                    correctAnswer: item.correct_answer,
                    allAnswers: shuffle([...item.incorrect_answers, item.correct_answer])
                })))
            }).finally(() => setLoading(false))
    }, [props.difficulty])

    let questionElements = questions.map(item => {
        let id = nanoid()
        return <Quiz
            key={id}
            question={item.question}
            allAnswers={item.allAnswers}
            correctAnswer={item.correctAnswer}
            selectedAnswer={answers[item.question] || ""}
            handleAnswer={handleAnswerClick}
            finished={finished}
        />
    })


    return (
        loading ? <div className="quiz-loading"><div className="quiz-loading--container">Loading...</div></div> : <div className="quiz-page">
            {questionElements}
            {finished && <h2 className="quiz--score">You scored {getPoints()}/5 correct answers</h2>}
            <button className="quiz--submit" onClick={handleSubmit}>{finished ? "Play again" : "Check Answers"}</button>
        </div>
    )

}