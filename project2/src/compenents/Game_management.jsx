import React, { useState } from 'react'
import Player_board from './Player_board/Player_board'

function Game_management(props) {

  function update_player(player) {
    let temp_arr = props.current_players[0];
    temp_arr.forEach(element => {
      if (element.id === props.current_player[0])
        element = player;
    });
    props.current_players[1](temp_arr);
  }

  function Update_player_after_game(id, steps) {
    let temp_arr = props.current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((player) => player.id === id));
    let temp_player = props.current_players[0][index];
    temp_player.scores = [...temp_player.scores, steps];
    temp_player.games_count += 1;
    temp_player.avg = props.generate_avg(temp_player);
    temp_player.steps = 0;
    localStorage.setItem(props.current_players[0][index].id, JSON.stringify(temp_player));
    props.find_best_players();
    update_player(temp_player);
  }

  function delete_player(id) {
    let temp_arr = props.current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((player) => player.id === id));
    let temp_player = props.current_players[0][index];
    temp_player.is_active = false;
    update_player(temp_player);
  }

  function check_if_active(next) {
    return props.current_players[0][next].is_active;
  }

  function next_player() {
    let temp_arr = props.current_players[0];
    let index = temp_arr.indexOf(temp_arr.find((player) => player.id === props.current_player[0]));
    let next = index + 1;
    if (index === props.current_players[0].length - 1)
       next = 0;
    while (!check_if_active(next)) {
      if (next === props.current_players[0].length - 1) {
        next = 0;
      }
      else{
        next++;
      }
  
    }
    props.current_player[1](props.current_players[0][next].id);
  }

  return (<div>{props.current_players[0].map((player, key) => (<Player_board key={key} player={player} next_player={next_player}
    MAX_NUM={props.MAX_NUM} current_player={props.current_player} update_player={update_player} delete_player={delete_player}
    Update_player_after_game={Update_player_after_game} generate_random={props.generate_random} />))}
  </div>)
}

export default Game_management