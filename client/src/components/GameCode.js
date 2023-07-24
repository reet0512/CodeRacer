import {useState, useRef} from 'react';
import '../styles/gameCode.css';

const GameCode = ({gameId}) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const textInputRef = useRef(null);

    const copyToClipboard = e => {
        textInputRef.current.select();
        document.execCommand("copy");
        setCopySuccess(true)
    }

    return(
        <div className='col-sm-6 game-code'>
            <h4>
                Send this code to join game
            </h4>
            <div className='input-group mb-3'>
                <input
                type='text'
                ref={textInputRef}
                value={gameId}
                readOnly
                className='form-control' />
                <div className='input-group-append'>
                    <button className='btn btn-outline-secondary' onClick={copyToClipboard} type='button'>
                        Copy Game Code
                    </button>
                </div>
            </div>
            {copySuccess ? <div className='alert alert-success' role='alert'>Successfully Copied Game Code</div> : null}
        </div>
    )
}

export default GameCode;