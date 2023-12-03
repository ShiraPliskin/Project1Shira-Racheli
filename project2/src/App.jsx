import React,{ useState } from 'react'
import './App.css'
import Player from'./Player'
import Player_board from'./compenents/Player_board'
import Add_user from './compenents/Add_user';

function App() {
  const MAX_NUM = 10;
  let current_players=[new Player('Shira',MAX_NUM),new Player('Racheli', MAX_NUM)];
  const currentPlayer=useState(current_players[0].name);
  let board_choice=useState(1);
 
  function set_board_choice(){
    board_choice[1](2);
  }
  function add_curr_player(player){
    current_players.push(player);
  }
  function update_player(player,index){
      current_players[index]=player;
  }

  function delete_player(index){
    localStorage.setItem(currentPlayer[index].name,JSON.stringify(current_players[index]))
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
    {board_choice[0]===1?<Add_user add_curr_player={add_curr_player} set_board_choice={set_board_choice}/>:
        current_players.map((player, key)=>(<Player_board key={key} player={player} next_player={next_player(key)} MAX_NUM={MAX_NUM} index={key} currentPlayer={currentPlayer} update_player={update_player} delete_player={delete_player}/>))
      }
    </>
  )
}

export default App
