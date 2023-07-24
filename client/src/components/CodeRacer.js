import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import StartBtn from './StartBtn';
import socket from '../socketConfig';
import DisplayPrompt from './DisplayPrompt';
import UserWords from './UserWords';
import ProgressBar from './ProgressBar';
import ScoreBoard from './ScoreBoard';
import GameCode from './GameCode';
import '../styles/codeRacer.css';

const findPlayer = players => {
    for(let i = 0; i < players.length; i++) {
        if(players[i].socketId === socket.id) {
            return players[i]
        }
    }
}

const CodeRacer = ({gameState}) => {
    let navigate = useNavigate();
    if(gameState === null || gameState === [])
        return navigate('/')
    const {_id, players, words, open, over} = gameState;
    const player = findPlayer(players);
    if(_id === "")
        return navigate('/')
    return (
        <>
            <div className='home-link'>
                <a href='/'>Home</a>
            </div>
            <div className='text-center'>
                <DisplayPrompt words={words} player={player}/>
                <ProgressBar players={players} player={player} wordsLength={words.length}/>
                <UserWords isOpen={open} isOver={over} words={words} wordIndex={player.wordIndex} gameId={_id}/>
                <Timer />
                <ScoreBoard players={players} />
                <StartBtn player={player} gameId={_id} />
                {
                    gameState.open ? <GameCode gameId={_id}></GameCode> : null
                } 
            </div>
        </>
        
    )
}

export default CodeRacer;