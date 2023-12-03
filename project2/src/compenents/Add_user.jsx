import React,{ useState } from 'react'
import Player from '../Player';

function Add_user(props){
    function add_new_user(data){
        let user=localStorage.getItem(data)||new Player(data);
        props.add_curr_player(user);
    }
return(
    <>
    {/* <input type="text" id="name" value="name" name="name">name:</input> */}
    <button onClick={()=>add_new_user("rachel")}>add user</button>
    <button onClick={()=>props.set_board_choice()}>To The Game:</button>
    </>
)
}
//document.getElementById('name').innerText

export default Add_user;