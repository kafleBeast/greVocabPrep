import React from 'react';
import { useState } from "react";
import useFetch from './useFetch';

// json-server:  https://json-server-2.herokuapp.com/
const Admin = () => {
    const id = "kaflebeast";
    const pass = "koenigsegg";
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const[userName, setUserName]=useState("");
    const[password, setPassword] = useState("");
    const[loggedIn, setLoggedIn] = useState(false);
    const[word, setWord] = useState("");
    const[contentBtnControl, setContentBtnControl] = useState(false);
    const[addWordBtn, setAddWordBtn] = useState(false);
    const[editWordBtn, setEditWordBtn] = useState(false);
    const[set, setSet] = useState("set1");

    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    const {data} = useFetch(url, {mode: "no-cors"});
    const synonym = data && data[0].meanings[0].definitions[0].synonyms;
    const definition = data && data[0].meanings[0].definitions[0].definition;
    const exampleSentence = data && data[0].meanings[0].definitions[0].example;

    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(userName.toLowerCase()===id && password===pass){
            setLoggedIn(true);
        }
        else{
            setLoginErrMsg("The login details do not match to the system. Please try again!")
            setPassword("");
            setUserName("");
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
    // const[Id, setId] = useState(1);
    const addWord = (e) =>{
        e.preventDefault();
        setContentBtnControl(true);
        fetch("https://json-server-2.herokuapp.com/" + set,{
        method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({word, synonym, definition, exampleSentence})
        })
    }
    const handleDelete = () => {
        // fetch('https://json-server-2.herokuapp.com/' + set + Id , {
        //     method: 'DELETE',
        // }).then(res=>res.json())
        fetch('https://json-server-2.herokuapp.com/set1/2', {
            method: 'DELETE',
        }).then(res=>res.json())
        // {console.log("deleted")}
    }
    
    const addWordControl = (e) => {
        e.preventDefault();
        setContentBtnControl(true);
        setAddWordBtn(true);
        setEditWordBtn(false);
    }
    const editWordControl = (e) => {
        e.preventDefault();
        setContentBtnControl(true);
        setEditWordBtn(true);
        setAddWordBtn(false);
    }

    

    return ( 
        <div className="Admin">
            {!loggedIn && <div className="login">
                <h1>Admin Login</h1>
                <p className = "loginErrMsg">{loginErrMsg}</p>
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
                <h1 className="admin-control">Welcome Kafle Beast!</h1>

                {!contentBtnControl && <div className="buttons">
                    <button onClick={addWordControl}>Add Words</button>
                    <button onClick={editWordControl}>Edit Words</button>
                </div>}
                
                {contentBtnControl && 
                <div className="adminContents">
                    {addWordBtn && <div className="addWords">
                        <h1>Add Words</h1>
                        <form onSubmit={addWord}>
                            <select value = {set} onChange = {(e) => setSet(e.target.value)}>
                                <option value="set1">Set 1</option>
                                <option value="set2">Set 2</option>
                                <option value="set3">Set 3</option>
                                <option value="set4">Set 4</option>
                                <option value="set5">Set 5</option>
                                <option value="set6">Set 6</option>
                                <option value="set7">Set 7</option>
                                <option value="set8">Set 8</option>
                                <option value="set9">Set 9</option>
                                <option value="set10">Set 10</option>
                                <option value="set11">Set 11</option>
                                <option value="set12">Set 12</option>
                                <option value="set13">Set 13</option>
                                <option value="set14">Set 14</option>
                                <option value="set15">Set 15</option>
                                <option value="set16">Set 16</option>
                                <option value="set17">Set 17</option>
                                <option value="set18">Set 18</option>
                                <option value="set19">Set 19</option>
                                <option value="set20">Set 20</option>
                            </select>
                            <input 
                            type="text" 
                            required 
                            value={word}
                            placeholder = {"Type a word"}
                            onChange={(e) => setWord(e.target.value)}
                            />
                            {/* {!isPendingDisp && <button>Add Word</button>}
                            {isPendingDisp && <button>Adding Word...</button>} */}
                            <button>{"Add Word to " +set.toUpperCase().slice(0,3) + " " + set.slice(3)}</button>
                        </form>
                        <button onClick={()=>setContentBtnControl(false)}>Go back</button>

                        {/* {console.log(word&& word)} */}
                    </div>}

                    {editWordBtn && <div className="editWords">
                        <h2>Edit Word Section (Delete the words)</h2>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={()=>setContentBtnControl(false)}>Go back</button>
                    </div>}
                    
                
                
                </div>}
                
                


            </div>}
        </div>
     );
}
 
export default Admin;