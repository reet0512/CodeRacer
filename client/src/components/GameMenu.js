import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/gameMenu.css';

const GameMenu = () => {
    let navigate = useNavigate();
    return (
        <div className="game-menu">
            <h1>Welcome to Code Racer</h1>
            <button
                type="button"
                onClick={() => navigate('/game/create')}
                className="btn btn-primary">
                Create Game
            </button>
            <button
                type="button"
                onClick={() => navigate('/game/join')}
                className="btn btn-primary">
                Join Game
            </button>
            <div className="questions">
                <h2>What is Code Racer?</h2>
                <h4>
                    Code Racer is a game that aims to improve code typing speed, syntax memory, and general code style etiquette.
                    It can be especially helpful to prepare for a time-sensitive interview, exam or even to pass some time with friends.
                </h4>
                <h2>How do I get started?</h2>
                <h4>
                    To start a game, clock on the button "Create Game" and pass in a username.
                    Once you are in the game screen, share the game code with other to join or click on the "Start Game" button to start typing.
                    <br/> <br/>
                    At the end of your submission, your WPM or Words per Minute is showcased.
                    The average WPM is 40 whereas the average WPM for a software developer is between 40 and 70 WPM.
                </h4>
            </div>
        </div>
    )
}

export default GameMenu;