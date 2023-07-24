const calculatePercentage = (player, wordsLength) => {
    if(player.wordIndex !== 0) {
        return ((player.wordIndex / wordsLength) * 100).toFixed(2) + '%'
    } else {
        return 0
    }
}

const ProgressBar = ({players, player, wordsLength}) => {
    const percentage = calculatePercentage(player, wordsLength)
    return(
        <div>
            <div>
                <h5 className="text-left">{player.username}</h5>
                <div className="progress my-1" key={player._id}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{width: percentage}}>{percentage}</div>
                </div>
            </div>
            {
                players.map(playerObj => {
                    const percentage = calculatePercentage(playerObj, wordsLength)
                    return playerObj._id !== player._id ?
                    <div>
                        <h5 className="text-left">{playerObj.username}</h5>
                        <div className="progress my-1" key={playerObj._id}>
                            <div
                            className="progress-bar"
                            role="progressbar"
                            style={{width: percentage}}>{percentage}</div>
                        </div>
                    </div> : null
                })
            }
        </div>
    )
}

export default ProgressBar