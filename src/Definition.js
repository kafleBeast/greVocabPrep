import useFetch from './useFetch';
import React from 'react'
import { FlashcardComponent } from 'react-flashcard'
import { useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";

const Definition = () => {
    const [word, setWord] = useState('');
    const [FlashcardBtn, setFlashcardBtn] = useState(false);
    const [wordListBtn, setWordListBtn] = useState(true);
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    const {data} = useFetch(url, {mode: "no-cors"});

    const definition = data && data[0].meanings[0].definitions[0].definition;

    const exampleSentence = data && data[0].meanings[0].definitions[0].example;

    const { data: dispWord, error:errorDisp, isPending:isPendingDisp } = useFetch('http://localhost:8001/definitions/');

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
        
        fetch("http://localhost:8001/definitions/",{
        method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({word, definition, exampleSentence})
        }).then(() => {
            window.location.reload ();
        }) 
    }

    const renderWords = (words, index) => {
        return(
            <tr key = {index}>
                <td>{words.word}</td>
                <td>{words.definition}</td>
                <td>{words.exampleSentence}</td>
            </tr>
        );
    };

    var cardData = [];

    const createFlashCards = () =>{
        for (let i=0; i<dispWord.length;i++){
            cardData.push({
                front:{
                    text: dispWord[i].word,
                },
                back:{
                    text: dispWord[i].definition + " . . " + dispWord[i].exampleSentence,
                }
            })
        }
        return cardData;
    }
    return ( 
        <div className="Definition">
            <div className="addDefinition">
                <h1>Add Definition</h1>
                <form onSubmit={handleSubmit}>
                    <label>Word</label>
                    <input 
                    type="text" 
                    required 
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    />
                    {!isPendingDisp && <button>Add Word</button>}
                    {isPendingDisp && <button>Adding Word...</button>}
                </form>
                {/* {console.log(word&& word)} */}
            </div>
            <div className="buttons">
                <button className ="leftBtn" onClick={flashCardControl}>Flash Card</button>
                <button className ="rightBtn" onClick={wordListControl}>Word List</button>
            </div>
            {FlashcardBtn && <div className="flashcard">
                <h1>Flash Cards</h1>
                {dispWord && <FlashcardComponent dataSource={createFlashCards(dispWord)} />}
            </div>}

            {wordListBtn && <div className="displayDefinition">
                <h1>List of Words</h1>
                {<ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th className="tableTitle">Word</th>
                        <th className="tableTitle">Definition</th>
                        <th className="tableTitle">Example Sentence</th>
                        </tr>
                    </thead>
                    <tbody className="definitionTable">
                        { isPendingDisp && <div>Loading...</div> }
                        { errorDisp && <div>{ errorDisp }</div> }
                        {dispWord && dispWord.map(renderWords)}
                    </tbody>
                </ReactBootStrap.Table>}
            </div>}
        </div>
     );
}
 
export default Definition;