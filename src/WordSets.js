import useFetch from './useFetch';
import React from 'react'
import { useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";

const Sets = () => {
    const [set, setSet] = useState("set1");
    const [wordSetContentControl, setWordSetContentControl] = useState(false);
    const [flashcardBtn, setFlashcardBtn] = useState(false);
    const [wordListBtn, setWordListBtn] = useState(false);

    const { data: dispWord, error:errorDisp, isPending:isPendingDisp } = useFetch('https://json-server-2.herokuapp.com/'+set);

    const flashCardControl = (e) => {
        e.preventDefault();
        setFlashcardBtn(true);
        setWordListBtn(false);
    }

    const wordListControl = (e) => {
        e.preventDefault();
        setWordListBtn(true);
        setFlashcardBtn(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setWordSetContentControl(true);
        
    }

    const editSynonyms = (words) =>{
        const synonymList = [...words.synonym];
        let editedSynonyms = [];
        for(let i=0;i<synonymList.length;i++){
            editedSynonyms.push(" ", synonymList[i], ", ");
        }
        return editedSynonyms;
    }

    const renderWords = (words, index) => {
        const editedSynonyms = editSynonyms(words);
        return(
            <tr key = {index}>
                <td>{index+1}</td>
                <td>{words.word}</td>
                <td>{words.definition}</td>
                <td>{words.exampleSentence}</td>
                <td>{editedSynonyms}</td>
            </tr>
        );
    };
    return ( 
        <div className="wordSets">
            <div className="selectSets">
                <h1>Select Word set</h1>
                <form onSubmit={handleSubmit}>
                    <select
                        value = {set}
                        onChange = {(e) => setSet(e.target.value)}
                    >
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
                    <button className="goButton">Go</button>
                </form>
                {/* {console.log(set)} */}
            </div>

            {wordSetContentControl && <div className="buttons">
                <button className ="leftBtn" onClick={flashCardControl}>Flash Card</button>
                <button className ="rightBtn" onClick={wordListControl}>Word List</button>
            </div>}

            {flashcardBtn && <div className="flashcard">
                <h1>Flash Cards</h1>
                {/* {!dispWord && <div className = "dataLoading-msg"> Loading Flash Cards ... It may take a few seconds</div>}
                {dispWord && <FlashcardComponent dataSource={createFlashCards(dispWord)} />} */}
            </div>}

            {wordListBtn && <div className="displayDefinition">
                <h1>List of Words</h1>
                {<ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th className="tableTitle">ID</th>
                        <th className="tableTitle">Word</th>
                        <th className="tableTitle">Definition</th>
                        <th className="tableTitle">Example Sentence</th>
                        <th className="tableTitle">Synonym</th>
                        </tr>
                    </thead>
                    <tbody className="definitionTable">
                        { isPendingDisp && <div className = "dataLoading-msg">Loading ... It may take a few seconds</div> }
                        { errorDisp && <div>{ errorDisp }</div> }
                        {dispWord && dispWord.map(renderWords)}
                    </tbody>
                </ReactBootStrap.Table>}
            </div>}
        </div>
     );
}
 
export default Sets;