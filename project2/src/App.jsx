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
  let temp_player=new Player();
  temp_player.avg=100;
  const[bestPlayers,setBestPlayers]=useState([temp_player,temp_player,temp_player]);

  function set_board(){
    board_choice[1](2);
  }
  function start_game(name){
    currentPlayer[1](name);
    find_best_players();
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
  function generate_avg(player){
    let sum=0;
    player.scores.foreach=(score)=>{
        sum+=score;
    } 
    return player.games_count? sum/player.games_count:0;
}
  
  function final_player_update(name,steps){
    let temp_arr=current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((element) => element.name=== name));
    let temp_player=current_players[0][index];
    temp_player.scores=[...temp_player.scores,steps];
    temp_player.games_count+=1;
    temp_player.avg=generate_avg(temp_player);
    console.log(temp_arr.avg);
    temp_player.steps=0;
    localStorage.setItem(current_players[0][index].id,JSON.stringify(temp_player));
    update_player(temp_player);
  }

  function delete_player(name){
    let temp_arr=current_players[0];
    temp_arr=temp_arr.filter(player => {
      if(player.name != name){
        return player;
      };
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
    function find_best_players(){
      let run_num=localStorage.getItem("runId");
      console.log("run_num="+run_num);
      let tops = [...bestPlayers].sort((a, b) => a.avg - b.avg);
      for(let i=1; i<=run_num; i++){
          let player = JSON.parse(localStorage.getItem(i));
          for(let i=tops.length-1; i>=0; i--){
              if(player.avg < tops[i].avg){
                  console.log(tops[i])
                  tops[i]=player;
                  break;
              }
          }
      }
      console.log(tops);
      set_bests(tops);
      
  }
  function set_bests(tops){
    setBestPlayers(tops);
  }
  switch (board_choice[0]) {
      case 1:
          return (<Open_page add_curr_player={add_curr_player} start_game={start_game} MAX_NUM={MAX_NUM}/>) 
      case 2:
        return (<>{current_players[0]?<>{current_players[0].map((player, key)=>(<><Player_board key={key} player={player} next_player={next_player}
          MAX_NUM={MAX_NUM} currentPlayer={currentPlayer} update_player={update_player} delete_player={delete_player} final_player_update={final_player_update} find_best_players={find_best_players}/></>))}
          </>:<></>}
          {<Best_players bestPlayers={bestPlayers}/>}
          
          </>)
 }
} 

export default App
