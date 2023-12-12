import React, { useState } from 'react'
import { useRef } from 'react'
import Player from '../Player';

const Game_registration = (props) => {
    const [form, setForm] = useState(null);
    const [runId, setRunId] = useState(parseInt(localStorage.getItem("runId")) + 1 || 1);

    let starting_player;
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const to_the_game_btn = () => {
        return (<button onClick={() => { props.start_game(starting_player) }}>to the game</button>)
    }

    const add_new_user = (id, name) => {
        localStorage.setItem("runId", runId);
        const user = new Player(id, name, props.MAX_NUM);
        localStorage.setItem(id, JSON.stringify(user));
        props.add_curr_player(user);
        starting_player = id;
        return to_the_game_btn();
    }

    const add_old_user = (id) => {
        const user = JSON.parse(localStorage.getItem(id));
        if (user) {
            props.add_curr_player(user);
            starting_player = user.id;
        }
        else {
            alert("You are not registered yet. Click New User.");
            return;
        }
        return to_the_game_btn();
    }

    const old_user = () => {
        return (<>
            <label htmlFor="id">your code:</label>
            <input type="number" id="id" ref={inputRef1} />
            <button onClick={() => setForm(add_old_user(inputRef1.current.value))}>next</button>
        </>)
    }

    const new_user = () => {
        setRunId(prevRunId => prevRunId + 1);
        return (<>
            <label htmlFor="name">your name:</label>
            <input type="text" id="name" ref={inputRef2} />
            <p>your code is: {runId}</p>
            <button onClick={() => setForm(add_new_user(runId, inputRef2.current.value))}>next</button>
        </>)
    }

    return (
        <>
            <button onClick={() => setForm(old_user())}>old user?</button>
            <button onClick={() => setForm(new_user())}>new user?</button>
            <br />
            {form}
        </>)
}
export default Game_registration;