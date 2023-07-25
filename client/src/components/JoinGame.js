import { useState } from "react";
import socket from '../socketConfig';
import '../styles/gameOptions.css';

const JoinGame = ({error}) => {
    const [formInput,  setFormInput] = useState({username: "", gameId: ""});
    const changeFormInput = e => {
        setFormInput({...formInput, [e.target.name]: e.target.value});
    }
    const submitForm = e => {
        e.preventDefault();
        socket.emit('join-game', formInput);
    }

    return(
        <>
            <a className="home-tag" href="/"> {'<-'} Return to Home</a>
            <div className="game-option">
                <div className="col-sm-6">
                    {error ? <p className="text-center error-message">Couldn't find Game ID</p> : null}
                    <h1 className="text-center">Join Game</h1>
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="username">
                                Enter username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formInput.username}
                                required
                                onChange={changeFormInput}
                            />
                            <label htmlFor="gameId">
                                Enter Game ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="gameId"
                                value={formInput.gameId}
                                required
                                onChange={changeFormInput}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default JoinGame;