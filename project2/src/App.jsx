import React,{ useState } from 'react'
import './App.css'
import Player from'./Player'
import Player_board from'./compenents/Player_board'

function App() {
  const MAX_NUM = 10;
  let current_players=[new Player('Shira',MAX_NUM),new Player('Racheli', MAX_NUM)];
  const currentPlayer=useState(current_players[0].name);

  function update_player(player,index){
      current_players[index]=player;
  }

  function delete_player(index){
    current_players=current_players.splice(index-1,1);
    console.log(current_players)
  }

  function next_player(index){
    if(index===current_players.length-1){
      return current_players[0];
    }
    return current_players[index+1];
  }

  return (
    <>
    {current_players.map((player, key)=>(<Player_board key={key} player={player} next_player={next_player(key)} MAX_NUM={MAX_NUM} index={key} currentPlayer={currentPlayer} update_player={update_player} delete_player={delete_player}/>))}
    </>
  )
}

export default App
