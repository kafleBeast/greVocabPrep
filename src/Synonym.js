import useFetch from './useFetch';
import React from 'react';
import { FlashcardComponent } from 'react-flashcard';
import { useEffect, useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";

const Synonym = () => {
    useEffect(()=>{
        document.title="Synonym";
    })
    const [word, setWord] = useState('');
    const [flashcardBtn, setFlashcardBtn] = useState(true);
    const [wordListBtn, setWordListBtn] = useState(false);
    const [dataNotFound, setDataNotFound] = useState("");
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    
    const {data} = useFetch(url, {mode: "no-cors"});
    // console.log(data && data[0].meanings[0].definitions[0].synonyms);
    const synonym = data && data[0].meanings[0].definitions[0].synonyms;

    // console.log('word:' + word);
    // console.log(synonym);
    const { data: dispWord, error:errorDisp, isPending:isPendingDisp } = useFetch('https://gre-vocab-prep.herokuapp.com/synonyms');

    // console.log(dispWord && dispWord);
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
        if(synonym){
            fetch("https://gre-vocab-prep.herokuapp.com/synonyms",{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({word, synonym})
            }).then(() => {
                window.location.reload ();
            });
            setDataNotFound("Word Added!"); 
        }
        else{
            setDataNotFound("Sorry, we cannot find the word on the Internet.");
        }
    }

 

    const editSynonyms = (words) =>{
        const synonymList = [...words.synonym];
        let editedSynonyms = [];
        for(let i=0;i<synonymList.length;i++){
            editedSynonyms.push(" ", synonymList[i], ", ");
        }
        return editedSynonyms;
    }

    // {dispWord && console.log(editSynonyms(dispWord[0]))}
    const renderWords = (words, index) => {
        const editedSynonyms = editSynonyms(words);
        return(
            <tr key = {index}>
                <td>{words.word}</td>
                <td>{editedSynonyms}</td>
            </tr>
        );
    };
    var cardData = [];
    // console.log(dispWord && [...dispWord.synonym]);

    const createFlashCards = () =>{
        var editedSynonyms = [];
        for (let i=0; i<dispWord.length;i++){
            editedSynonyms = editSynonyms(dispWord[i]);
            cardData.push({
                front:{
                    text: dispWord[i].word,
                },
                back:{
                    text: editedSynonyms,
                }
            })
        }
        return cardData;
    }
    // console.log(dispWord && createFlashCards(dispWord));
    
   
    return ( 
        <div className="Synonym">
            <div className="addSynonym">
                <h1>Add Synonyms</h1>
                {dataNotFound && <div>{dataNotFound}</div>}
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
            {flashcardBtn && <div className="flashcard">
                <h1>Flash Cards</h1>
                {!dispWord && <div className = "dataLoading-msg"> Loading Flash Cards ... It may take a few seconds</div>}
                {dispWord && <FlashcardComponent dataSource={createFlashCards(dispWord)} />}
            </div>}

            {wordListBtn && <div className="displaySynonym">
                <h1>List of Words</h1>
                {<ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th className="tableTitle">Word</th>
                        <th className="tableTitle">Synonyms</th>
                        </tr>
                    </thead>
                    <tbody className="synonymTable">
                        { isPendingDisp && <div className = "dataLoading-msg">Loading ... It may take a few seconds</div> }
                        { errorDisp && <div>{ errorDisp }</div> }
                        {dispWord && dispWord.map(renderWords)}
                    </tbody>
                </ReactBootStrap.Table>}
            </div>}
        </div>
     );
}
 
export default Synonym;