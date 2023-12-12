import React, { useState } from 'react'
import Player from '../Player'

const Best_players = (props) => {
    if (props.best_players.length > 0) {
        return (<>
            <h3>Best Players</h3>
            {props.best_players.map((player, key) =>
            (<div key={key}>
                <span>id: {player.id} </span>
                <span>name: {player.name} </span>
                <span>average: {player.avg} </span>
            </div>))}
        </>)
    }
    else return (<></>)
}

export default Best_players;