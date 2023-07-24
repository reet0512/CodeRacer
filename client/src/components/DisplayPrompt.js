import '../styles/displayPrompt.css';

const DisplayPrompt = ({words, player}) => {
    let typed = words.slice(0, player.wordIndex).join(' ')
    let remaining = words.slice(player.wordIndex + 1, words.length).join(' ');
    return (
        <div className='game-prompt'>
            <span className='already-typed'>{typed} </span>
            <span className='typing'>{words[player.wordIndex]} </span>
            <span>{remaining}</span>
        </div>
    )
}

export default DisplayPrompt;