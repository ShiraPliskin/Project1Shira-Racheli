import React,{ useState } from 'react'
import Player from'../Player'

 const Best_players=(props)=>{
    ///const temp_object = {id:0, name:"", avg:"Infinity"};
    return (
        <>
        <h2>Best Players</h2>
        {props.bestPlayers.map((player, key)=>
        (<div key={key}>
            <p>id: {player.id} </p>
            <p>name: {player.name} </p>
            <p>avg: {player.avg}</p>
        </div>))}
        </>
    )
 }

 export default Best_players;