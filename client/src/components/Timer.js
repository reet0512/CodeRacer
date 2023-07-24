import {useState, useEffect} from 'react';
import socket from '../socketConfig';

const Timer = () => {
    const [timer, setTimer] = useState({countdown: "", msg: ""});
    useEffect(() => {
        socket.on('timer', (data) => {
            console.log(data)
            setTimer(data);
        });
        socket.on('done', () => {
            socket.removeListener('timer')
        });
    }, [])
    const {countdown, msg} = timer;
    return (
        <>
            <h1>{countdown}</h1>
            <h3>{msg}</h3>
        </>
    )
}

export default Timer;