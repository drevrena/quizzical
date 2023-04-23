export default function HomePage(props) {

    return (
        <main>
            <h1 className="homepage--title">Quiz Game</h1>
            <h2 className="homepage--desc">Prove your knowledge with 5 questions! Select your preferred difficulty</h2>
            <div className="homepage--difficulty-container">
                <button className="homepage--start-btn" onClick={() => {
                    props.setQuizState(true)
                    props.setDifficulty("easy")
                }
                }>Easy</button>
                <button className="homepage--start-btn" onClick={() => {
                    console.log(props)
                    props.setQuizState(true)
                    props.setDifficulty("medium")
                }
                }>Medium</button>
                <button className="homepage--start-btn" onClick={() => {
                    props.setQuizState(true)
                    props.setDifficulty("hard")
                }
                }>Hard</button>
            </div>
        </main >

    )

}