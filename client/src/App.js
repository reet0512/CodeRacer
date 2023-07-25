import { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import GameMenu from './components/GameMenu';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import ErrorPage from './components/ErrorPage';
import socket  from './socketConfig';
import CodeRacer from './components/CodeRacer';

function App() {
  let navigate = useNavigate()
  const [gameState, setGameState] = useState({_id: "", words: [], open: false, over: false, players: []})
  const [errorMessage, setErrorMessage] = useState(false)
  useEffect(() => {
    socket.on('update-game', (game) => {
      console.log(game)
      setGameState(game)
    })
    return () => {
      socket.removeAllListeners();
    }
  }, [])
  useEffect(() => {
    socket.on('error-message', (msg) => {
      setErrorMessage(true)
      if(msg === 'idError')
        navigate('/game/join')
      else
        navigate('/error')
    })
    return () => {
      setErrorMessage(false)
      socket.removeListener('error-message')
    }
  }, [navigate])
  useEffect(() => {
    if(gameState._id !== "")
      navigate('/game/' + gameState._id)
  }, [gameState._id, navigate])
  return (
    <Routes>
      <Route path='/' element={<GameMenu />}/>
      <Route path='/game/create' element={<CreateGame />}/>
      <Route path='/game/join' element={<JoinGame error={errorMessage}/>}/>
      <Route path='/error' element={<ErrorPage />}/>
      <Route path='/game/:gameId' element={<CodeRacer gameState={gameState}/>}/>
    </Routes>
  );
}

export default App;
