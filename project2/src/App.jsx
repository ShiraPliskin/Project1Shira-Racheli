import React,{ useState } from 'react'
import './App.css'
import Player from'./Player'
import Player_board from'./compenents/Player_board'
import Open_page from './compenents/Open_page';
import Best_players from './compenents/Best_players';

function App() {
  const MAX_NUM = 10;
  const current_players = useState([]);
  const currentPlayer = useState("");
  const board_choice = useState(1);

  function set_board(){
    board_choice[1](2);
  }
  function start_game(name){
    currentPlayer[1](name);
    set_board();
  }
  function add_curr_player(player){
    current_players[0]!=null?
    current_players[1](current => [...current, player]):
    current_players[1]([player]);
  }

  function update_player(player){
      let temp_arr=current_players[0];
      temp_arr.forEach(element => {
        if(element.name===currentPlayer[0])
          element=player;
      });
      current_players[1](temp_arr);
  }
  
  function final_player_update(name,steps){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== name));
    let temp_player=current_players[0][index];
    temp_player.scores=[...temp_player.scores,steps];
    temp_player.games_count+=1;
    temp_player.steps=0;
    localStorage.setItem(current_players[0][index].id,JSON.stringify(temp_player));
    update_player(temp_player);
  }

  function delete_player(name){
    let temp_arr=current_players[0];
    temp_arr=temp_arr.filter(player => {
      return player.name != name;
    }),
    current_players[1](temp_arr);
  }

  function next_player(){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== currentPlayer[0]));
    console.log("player_name: "+currentPlayer[0]);
    console.log("index: "+index);
      if(index===current_players[0].length-1){
        currentPlayer[1](current_players[0][0].name);
      }
      else{
        currentPlayer[1](current_players[0][index+1].name);
      }  
    }
 
  switch (board_choice[0]) {
      case 1:
          return (<Open_page add_curr_player={add_curr_player} start_game={start_game} MAX_NUM={MAX_NUM}/>) 
      case 2:
        return (<>{current_players[0]?current_players[0].map((player, key)=>(<><Player_board key={key} player={player} next_player={next_player}
          MAX_NUM={MAX_NUM} currentPlayer={currentPlayer} update_player={update_player} delete_player={delete_player} final_player_update={final_player_update}/></>))
          :<></>}
          <Best_players/>
          </>)
 }
} 

export default App
