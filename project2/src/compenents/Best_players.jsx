import React,{ useState } from 'react'
import Player from'../Player'

 const Best_players=()=>{
    ///const temp_object = {id:0, name:"", avg:"Infinity"};
    let temp_player = new Player();
    const[bestPlayers,setBestPlayers]=useState([temp_player,temp_player,temp_player]);
    
    function find_best_players(){
        let run_num=localStorage.getItem("runId");
        console.log("run_num="+run_num);
        let tops = [...bestPlayers].sort((a, b) => a.id - b.id);
        console.log(tops);
        for(let i=1; i<run_num; i++){
            let player = JSON.parse(localStorage.getItem(i));
            for(let i=tops.length-1; i>=0; i--){
                if(player.avg < tops[i].avg){
                    tops[i]=player;
                    break;
                }
            }
        }
        setBestPlayers(tops);
    }
    return (
        <>
        <h2>Best Players</h2>
        {find_best_players()}{bestPlayers.map((player, key)=>
        (<div key={key}>
            <p>{player.id} </p>
            <p>{player.name} </p>
            <p>{player.avg}</p>
        </div>))}
        </>
    )
 }

 export default Best_players;