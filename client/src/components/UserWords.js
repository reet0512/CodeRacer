import {useState, useRef, useEffect} from 'react';
import socket from '../socketConfig'

const UserWords = ({isOpen, isOver, words, wordIndex, gameId}) => {
    const [userInput, setUserInput] = useState('')
    const [error, setError] = useState(false)
    const textInput = useRef(null)

    useEffect(() => {
        if(!isOpen) {
            textInput.current.focus()
        }
    }, [isOpen])

    const changeInput = e => {
        let value = e.target.value
        let lastChar = value.charAt(value.length - 1)
        setError(false)
        for(let i = 0; i < value.length; i++) {
            if(i < words[wordIndex].length && value.charAt(i) !== words[wordIndex].charAt(i)) {
                setError(true)
                break;
            } else if(i === words[wordIndex].length && value.charAt(i) !== ' ') {
                setError(true)
                break
            }
        }
        if(lastChar === ' ' && !error && userInput.length === words[wordIndex].length) {
            socket.emit('user-input', {userInput, gameId})
            setUserInput('')
        } else {
            setUserInput(value)
        }
    }

    const submitForm = e =>
        e.preventDefault();

    return (
        <div className='row my-3'>
            <div className='col-sm'></div>
            <div className='col-sm-4'>
                <form onSubmit={submitForm}>
                    <div className='form-group'>
                        <input
                            type='text'
                            readOnly={isOpen || wordIndex === words.length || isOver}
                            onChange={changeInput}
                            value={userInput}
                            className='form-control'
                            style={error? {'color': 'red'} : null}
                            ref={textInput}
                            />
                    </div>
                </form>
            </div>
            <div className='col-sm'></div>
        </div>
    )

}

export default UserWords;