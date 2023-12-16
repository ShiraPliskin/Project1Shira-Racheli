import React, { useState } from 'react'
import Player from '../Player'
import './Player_board/Player_board.css'
const Best_players = (props) => {
    if (props.best_players.length > 0) {
        return (<>
            <h3 className='game_txt'>Best Players</h3>
            {props.best_players.map((player, key) =>
            (<div key={key}>
                <span className='game_txt'>id: {player.id} </span>
                <span className='game_txt'>name: {player.name} </span>
                <span className='game_txt'>average: {player.avg} </span>
            </div>))}
        </>)
    }
    else return (<></>)
}

export default Best_players;