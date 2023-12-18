import React, { useState } from 'react'
import Game_registration from './Game_registaration/Game_registration';
import Best_players from './Best_players';
import Game_management from './Game_management';

function Home_page() {
  const MAX_NUM = 10;
  const current_players = useState([]);
  const current_player = useState(0);
  const board_choice = useState(1);
  const [best_players, setBestPlayers] = useState([]);

  function start_game(id) {
    current_player[1](id);
    find_best_players();
    board_choice[1](2);
  }

  function add_curr_player(player) {
    player.avg = generate_avg(player);
    player.random_num = generate_random();
    if (current_players[0] != null) {
      const found = current_players[0].find((user) => user.id == player.id);
      if (found) {
        alert("This user is already logged into the game.");
        return;
      }
      current_players[1](current => [...current, player])
    }
    else {
      current_players[1]([player]);
    }
  }

  function generate_random() {
    return Math.floor(Math.random() * MAX_NUM);
  }

  function generate_avg(player) {
    if (player.scores.length > 0) {
      let sum = player.scores.reduce(myFunc);
      function myFunc(total, num) {
        return total + num;
      }
      return sum / player.games_count;
    }
    return 0;
  }

  function find_best_players() {
    let run_num = localStorage.getItem("runId");
    let tops = [];
    for (let i = 1; i <= run_num; i++) {
      let player = JSON.parse(localStorage.getItem(i));
      if (player.avg > 0) {
        tops = [...tops, player];
      }
    }
    tops.sort((a, b) => a.avg - b.avg);
    tops = tops.slice(0, tops.length > 3 ? 3 : tops.length);
    setBestPlayers(tops);
  }
  
  switch (board_choice[0]) {
    case 1:
      return (<Game_registration add_curr_player={add_curr_player} start_game={start_game} MAX_NUM={MAX_NUM} />)
    case 2:
      return (<><div>
        <Game_management MAX_NUM={MAX_NUM} current_players={current_players} current_player={current_player} find_best_players={find_best_players} generate_random={generate_random} generate_avg={generate_avg} />
        <Best_players best_players={best_players} />
      </div></>)
  }
}

export default Home_page