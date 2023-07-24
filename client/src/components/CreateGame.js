import { useState } from "react";
import socket from '../socketConfig';
import '../styles/gameOptions.css';

const CreateGame = () => {
    const [username,  setUsername] = useState('');
    const changeUserName = e => {
        setUsername(e.target.value);
    }
    const submitForm = e => {
        e.preventDefault();
        socket.emit('create-game', username);
    }
    return(
        <>
            <a className="home-tag" href="/"> {'<-'} Return to Home</a>
            <div className="game-option">
                <div className="col-sm-6">
                    <h1 className="text-center">Create Game</h1>
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="username">
                                Enter username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                required
                                onChange={changeUserName}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateGame;