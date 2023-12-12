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
  const[bestPlayers,setBestPlayers]=useState([]);

  function set_board(){
    board_choice[1](2);
  }
  function start_game(name){
    currentPlayer[1](name);
    find_best_players();
    set_board();
  }
  function add_curr_player(player){
    player.avg = generate_avg(player);
    player.random_num = generate_random();
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

  function generate_random(){
    return Math.floor(Math.random() * MAX_NUM);
}

function generate_avg(player){
  if(player.scores.length>0){
    let sum = player.scores.reduce(myFunc);
    function myFunc(total, num) {
    return total + num;
    }
    return sum/player.games_count;
  }
  return 0
}

  function final_player_update(name,steps){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== name));
    let temp_player=current_players[0][index];
    temp_player.scores=[...temp_player.scores,steps];
    temp_player.games_count+=1;
    temp_player.avg = generate_avg(temp_player);
    temp_player.steps=0;
    localStorage.setItem(current_players[0][index].id,JSON.stringify(temp_player));
    find_best_players();
    update_player(temp_player);
  }
  function delete_player(name){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== name));
    let temp_player=current_players[0][index];
    temp_player.is_active=false;
    update_player(temp_player);
  }
  function check_if_active(to){
    return current_players[0][to].is_active;
  }
  function next_player(){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== currentPlayer[0]));
    let to=index+1;
    console.log("player_name: "+currentPlayer[0]);
    console.log("index: "+index);
    if(index===current_players[0].length-1)
      to=0;
    while(!check_if_active(to)){
      if(to===current_players[0].length-1){
        to=0;
      }
      else{
        to++; 
      }
      
    }
      currentPlayer[1](current_players[0][to].name);
    }

  function find_best_players(){
    let run_num=localStorage.getItem("runId");
    console.log("run_num="+run_num);
    let tops = [];
    for(let i=1; i<=run_num; i++){
        let player = JSON.parse(localStorage.getItem(i));
        if(player.avg>0){
          tops = [...tops, player];
        }   
    }
    tops.sort((a, b) => a.avg - b.avg);
    tops.slice(0,tops.length>3?3:tops.length);
    console.log(tops);
    setBestPlayers(tops);
}

  switch (board_choice[0]) {
      case 1:
          return (<Open_page add_curr_player={add_curr_player} start_game={start_game} MAX_NUM={MAX_NUM} generate_random={generate_random}/>) 
      case 2:
        return (<>{current_players[0]?<>{current_players[0].map((player, key)=>(<><Player_board key={key} player={player} next_player={next_player}
          MAX_NUM={MAX_NUM} currentPlayer={currentPlayer} update_player={update_player} delete_player={delete_player} final_player_update={final_player_update} generate_random={generate_random}/></>))}
          </>:<></>}
          {<Best_players bestPlayers={bestPlayers}/>}
          
          </>)
 }
} 

export default App
