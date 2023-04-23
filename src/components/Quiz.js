import React from "react";
import decode from 'html-entities-decoder';

export default function Quiz(props) {

    function getStyles(item) {
        let bg = "white"
        let color = "#293264"
        let border = "0.794239px solid #4D5B9E"
        let op = "1"

        if (props.finished) {
            if (item === props.correctAnswer) {
                border = "none"
                bg = "#94D7A2"
            }
            else if (item === props.selectedAnswer) {
                border = "none"
                bg = "#F8BCBC"
                op = "0.5"
            }
            else {
                border = "0.794239px solid #293264"
                op = "0.5"
            }
        } else {
            bg = item === props.selectedAnswer ? "#D6DBF5" : "white"
        }
        return {
            background: bg,
            color: color,
            border: border,
            opacity: op
        };
    }


    let answersElement = props.allAnswers.map(item => {
        return <button
            key={item}
            className="quiz--answer"
            onClick={() => props.handleAnswer(props.question, item)}
            style={getStyles(item)}
        > {decode(item)}</button >
    })

    return (
        <div className="quiz--container">
            <h2 className="quiz--question">{decode(props.question)}</h2>
            <div className="quiz--answer-container">
                {answersElement}
            </div>
            <hr className="quiz--line" />
        </div>
    )
}