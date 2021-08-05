import React from 'react';
import { useState } from "react";


const Admin = () => {
    const id = "kafleBeast";
    const pass = "koenigsegg";
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const[userName, setUserName]=useState("");
    const[password, setPassword] = useState("");
    const[loggedIn, setLoggedIn] = useState(false);



    // const handleDelete = (header) => {
    //     fetch('http://localhost:8001/' + header, {
    //           method: 'DELETE'
    //     })
    // }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(userName===id && password===pass){
            setLoggedIn(true);
        }
        else{
            setLoginErrMsg("The login details do not match to the system. Please try again!")

        }
        // if(userName===id){
        //     if(password===pass){
        //         setLoggedIn(true);
        //     }
        //     else{
        //         setLoginErrMsg("The User name is incorrect!")
        //     }
        // }
        // else if(!userName===id){
        //     setLoginErrMsg("The Password is incorrect!")
        // }
        // if(userName==="" && password===""){
        //     setLoginErrMsg("");
        // }
    }
    
    
        
    

    return ( 
        <div className="Admin">
            {!loggedIn && <div className="login">
                <h1>Admin Login</h1>
                <p>{loginErrMsg}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        type="string" 
                        required 
                        value={userName}
                        placeholder = {"User Name"}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input 
                        type="string" 
                        required 
                        value={password}
                        placeholder = {"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {<button>Login</button>}
                </form>
            </div>}

            {loggedIn && <div className="logged-in">
                
                
                
                
                
                
                
            </div>}
        </div>
     );
}
 
export default Admin;