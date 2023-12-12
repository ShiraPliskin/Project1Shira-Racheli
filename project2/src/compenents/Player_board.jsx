import React, { useState } from 'react'

const Player_board = (props) => {
    const [playerState, setPlayerState] = useState(props.player);

    const actions = ['+1', '-1', '*2', '/2'];
    const end_game = ['New Game', 'Exit'];

    function operate_action(action) {
        switch (action) {
            case '+1':
                setPlayerState((prevPlayer) => ({ ...prevPlayer, random_num: prevPlayer.random_num + 1 }));
                break;
            case '-1':
                setPlayerState((prevPlayer) => ({ ...prevPlayer, random_num: prevPlayer.random_num - 1 }));
                break;
            case '*2':
                setPlayerState((prevPlayer) => ({ ...prevPlayer, random_num: prevPlayer.random_num * 2 }));
                break;
            case '/2':
                setPlayerState((prevPlayer) => ({ ...prevPlayer, random_num: prevPlayer.random_num / 2 }));
                break;
        }
        setPlayerState((prevPlayer) => ({ ...prevPlayer, steps: prevPlayer.steps + 1 }));
        props.update_player(playerState);
        props.next_player();
    }

    function end_game_options(option) {
        props.Update_player_after_game(playerState.id, playerState.steps);
        if (option === 'New Game') {
            setPlayerState((prevPlayer) =>
                ({ ...prevPlayer, random_num: props.generate_random(), steps: 0, games_count: prevPlayer.games_count + 1, scores: [...prevPlayer.scores, prevPlayer.steps] }));
        }
        else {
            setPlayerState((prevPlayer) => ({ ...prevPlayer, is_active: false }));
            props.next_player();
            props.delete_player(playerState.id);
        }
    }

    const curr_player_style = {
        backgroundColor: "lightblue",
    }

    const other_players_style = {
        backgroundColor: "red",
    }

    let is_current_user = props.current_player[0] == props.player.id;
    if (playerState.is_active) {
        return (<div style={is_current_user ? curr_player_style : other_players_style}> <>
            {playerState.random_num != props.MAX_NUM ? actions.map((action, key) => <React.Fragment key={key}><button disabled={!is_current_user} onClick={() => operate_action(action)}>{action}</button></React.Fragment>) :
                end_game.map((option, key) => <React.Fragment key={key}><button disabled={!is_current_user} onClick={() => end_game_options(option)}>{option}</button></React.Fragment>)}
            <p>Gamer:{playerState.name}</p>
            <p>Number:{playerState.random_num}</p>
            <p>Steps:{playerState.steps}</p>
            <p>Scores:{playerState.scores.map((score, key) => (<span key={key}>{score} ,</span>))}</p>
        </>
        </div>)
    }

}
export default Player_board;