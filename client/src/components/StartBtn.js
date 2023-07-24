import { useState } from "react";
import socket from "../socketConfig";

const StartBtn = ({player, gameId}) => {
    const [showBtn, setShowBtn] = useState(true)
    const {isLeader} = player;

    const startGame = e => {
        socket.emit('timer', {playerId: player._id, gameId})
        setShowBtn(false);
    }

    return (
        isLeader && showBtn ? 
        <button
            type='button'
            onClick={startGame}
            className="btn btn-primary"
        >
            Start Game
        </button> : null
    )
} 

export default StartBtn;