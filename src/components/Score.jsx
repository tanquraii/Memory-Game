import './style.css';
const Score = (props) => {
  return (
    <div className='score-comp'>
        <div className="text">
            <h1>Pokemon Memory Game</h1>
            <h5>Get points by clicking on an image but dont click on any more than once!</h5>
        </div>
        <div className="score">
            <h4>Score:{props.score}</h4>
            <h4>Best score:{props.highest}</h4>
        </div>
    </div>
  )
}

export default Score
