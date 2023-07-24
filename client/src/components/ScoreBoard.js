const getScores = (players) => {
    const scores = players.filter(player => player.WPM !== -1);
    return scores.sort((a, b) => b.WPM - a.WPM)
}

const ScoreBoard = ({players}) => {
    const scores = getScores(players);
    if(scores.length === 0) {
        return null;
    }
    return(
        <table className="table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">WPM</th>
                </tr>
            </thead>
            <tbody>
                {
                    scores.map((player, index) => {
                        return <tr key={"info"}>
                            <th scope="row">{index + 1}</th>
                            <td>{player.username}</td>
                            <td>{player.WPM}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default ScoreBoard;