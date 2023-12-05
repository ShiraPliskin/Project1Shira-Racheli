import React,{ useState } from 'react'
import {useRef} from 'react'
import Player from '../Player';

const Open_page=(props)=>{
    const [html, setHtml] = useState(null);
    const [runId, setRunId] = useState(parseInt(localStorage.getItem("runId"))+1||1);
   
    let name_to_send;
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const to_the_game_btn=()=>{
        return(<button onClick={()=>{props.start_game(name_to_send)}}>to the game</button>)}
    
    const add_new_user=(id, name)=>{
        localStorage.setItem("runId", runId);
        const user = new Player(id, name,props.MAX_NUM);
        localStorage.setItem(id, JSON.stringify(user));
        props.add_curr_player(user);
        name_to_send=name;
        return to_the_game_btn();
    }

    const add_old_user=(id)=>{
        const user = JSON.parse(localStorage.getItem(id));
        if(user){
            props.add_curr_player(user);
            name_to_send=user.name;
        }
        else{
            alert("You are not registered yet. Click New User.");
            return;
        }
        return to_the_game_btn();
    }

    const old_user=()=>{
         return(<>
            <label htmlFor="id">your code:</label>
            <input type="number" id="id" ref={inputRef1}/>   
            <button onClick={()=>setHtml(add_old_user(inputRef1.current.value))}>next</button> 
           </>)
    }

    const new_user=()=>{
        setRunId(prevRunId=>prevRunId+1);
        return(<>
           <label htmlFor="name">your name:</label>
           <input type="text" id="name" ref={inputRef2}/>   
           <p>your code is: {runId}</p>
           <button onClick={()=>setHtml(add_new_user(runId, inputRef2.current.value))}>next</button> 
          </>)
   }
   
return(
    <>
    <button onClick={()=>setHtml(old_user())}>old user?</button>
    <button onClick={()=>setHtml(new_user())}>new user?</button>
    <br/>
    {html}
    </>
)
}
export default Open_page;