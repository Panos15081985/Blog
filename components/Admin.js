import { useState } from "react";
import db from "../Database/Config";
import { collection ,onSnapshot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Admin(){
    let[username,setUsername]=useState("");
    let[password,setPassword]=useState("");
    const navigate = useNavigate();

    let Login=()=>{
        if(username!=="" && password!==""){
            const unsubscribe = onSnapshot(collection(db, 'User'), (snapshot) => {
                const User = snapshot.docs.map((doc) => doc.data());
                if (User[0].Username === username && User[0].Password === password)
                    navigate('../Adminpage', { state: { User: User[0] } });
                else
                    alert("falsche Username oder password")
            });
            return () => {
                // Diese Aufräumarbeiten sind wichtig, um Lecks zu verhindern
                unsubscribe();
            };
        }
        else
            alert("Bitte alle fleder ausfullen")
    }
   
    return(
        <div className="AdminContainer">
            <div className="Admin">
                <h2>Blog</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button onClick={Login}>Login</button>
            </div>
        </div>
    )
}
export default Admin;