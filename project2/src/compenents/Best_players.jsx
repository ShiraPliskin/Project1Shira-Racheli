import React,{ useState } from 'react'
import Player from'../Player'

 const Best_players=(props)=>{
    return (
        <>
        <h3>Best Players</h3>
        {props.bestPlayers.map((player, key)=>
        (<div key={key}>
            <span>id: {player.id} </span>
            <span>name: {player.name} </span>
            <span>average: {player.avg} </span>
        </div>))}
        </>
    )
 }

 export default Best_players;