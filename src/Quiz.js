import useFetch from './useFetch';
import React from 'react'
import { useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";

const Quiz = () => {
    const [length, setLength] = useState(10);
    const [set, setSet] = useState(1);
    const [quizType, setQuizType] = useState("synonym");
    const [createQuizControl, setCreateQuizControl] = useState(true);
    const [synonymQuizControl, setSynonymQuizControl] = useState(false);
    const [definitionQuizControl, setDefinitionQuizControl] = useState(false);
    const [quizResultOut, setQuizResultOut] = useState(false);

    const { data: synonymData, error:errorSynonym, isPending:isPendingSynonym } = useFetch('http://localhost:8001/synonyms/');
    const {data: definitionData, error: errorDefinition, isPending: isPendingDefinition} = useFetch('http://localhost:8001/definitions/');

    // console.log(definitionData && definitionData);


    const handleSubmit = (e) => {
        e.preventDefault();
        setCreateQuizControl(false);
        if (quizType === "synonym") {
            setSynonymQuizControl(true);
            setDefinitionQuizControl(false);
        }
        else if (quizType === "definition"){
            setDefinitionQuizControl(true);
            setSynonymQuizControl(false);
        }
    }

    const editedList = (words) =>{
        let editedSynonyms = [];
        for(let i=0;i<words.length;i++){
            editedSynonyms.push("<> "+words[i]+ "," +" ");
        }
        return editedSynonyms;
    }
    // console.log(synonymData && Object.keys(synonymData).length);

    // let randNum1 = Math.floor(Math.random() * Object.keys(synonymData).length);
    // let randNum2 = Math.floor(Math.random() * Object.keys(synonymData[randNum1]).length);
    // console.log("rand1:" +randNum1);
    // console.log("rand2:" +randNum2);
    // console.log("randSynonym: " + synonymData[randNum1].synonym[randNum2])

    const createSynonymShuffle = (length) =>{
        let randomSynonyms = [];
        let wordsList = [];
        let randNum1 = 0;
        let randNum2 = 0;
        for (let i=0;i<length; i++){
            randNum1 = Math.floor(Math.random() * Object.keys(synonymData).length)
            randNum2 = Math.floor(Math.random() * Object.keys(synonymData[randNum1]).length)
            wordsList.push(synonymData[randNum1].word);
            randomSynonyms.push(synonymData[randNum1].synonym[randNum2])
        }
        return randomSynonyms.concat(wordsList);
    }

    
    const createDefinitionShuffle = (length) => {
        let definitions = [];
        let words = [];
        let randNum1 = 0;
        
        for (let i=0;i<length; i++){
            randNum1 = Math.floor(Math.random() * Object.keys(definitionData).length)
            words.push(definitionData[randNum1].word);
            definitions.push(definitionData[randNum1].definition);
        }
        return definitions.concat(words);
    }

    let synonymsQuizList = quizType==="synonym" && synonymData && createSynonymShuffle(length);
    let answerSynonyms = quizType==="synonym" && synonymData && synonymsQuizList.slice(0,length);
    let synonymsList = synonymData && answerSynonyms.sort(()=>Math.random() - 0.5);
    let wordListS = quizType==="synonym" && synonymData && synonymsQuizList.slice(length, length*2);

    let definitionQuizList = definitionData && createDefinitionShuffle(length);
    let answerDefinition = definitionData && definitionQuizList.slice(0,length);
    let definitionList = definitionData && answerDefinition.sort(()=>Math.random() - 0.5);
    let wordListD = definitionData && definitionQuizList.slice(length, length*2);


    // console.log("word: " + definitionQuizList);

    let answerChoices = [];

    const answerOnChange = (value) =>{
        for (let i=0;i<length;i++){
            if(value===answerSynonyms[i]){
                answerChoices.push(value);
                break;
            }
        }
    }
    const renderWords = (words, index) => {
        return(
            <tr key = {index}>
                <td>{words}</td>
                <td><input type="string" required onChange={(e)=>answerOnChange(e.target.value)}/> </td>
            </tr>
        );
    };
    const [quizOutMsg, setQuizOutMsg] = useState("");
    const quizResult = (dataType) =>{
        if(answerChoices.length === parseInt(length,10)){
            let count = 0;
            for(let i=0;i<length;i++){
                if(answerChoices[i]===dataType[i]){
                    count = count + 1;
                }
            }
            setQuizOutMsg("Your Total Score is: " + count + "/" + length);
        }
        else{
            setQuizOutMsg("Please fill in all the boxes before submitting");
            setQuizResultOut(false);
        }
        setQuizResultOut(true);
    }
    return ( 
        <div className="Quiz">
            {createQuizControl && <div className="createQuiz">
                <h1>Create Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Number of Questions: </label>
                        <input 
                        type="number" 
                        required 
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Set: </label>
                        <input
                        type="number" 
                        required 
                        value={set}
                        onChange={(e) => setSet(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Type: </label>
                        <select
                        value = {quizType}
                        onChange = {(e) => setQuizType(e.target.value)}
                        >
                            <option value="synonym">Synonym</option>
                            <option value="definition">Definition</option>
                        </select>
                    </div>
                    {<button>Create</button>}
                </form>
            </div>}

            <div className="synonymQuiz">
                {synonymQuizControl && <div className="answer-choices">
                    Answer Choices: {synonymData && editedList(synonymsList)}
                </div>}
                {synonymQuizControl && <ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th className="tableTitle">Word</th>
                        <th className="tableTitle">Synonyms</th>
                        </tr>
                    </thead>
                    <tbody className="synonymTable">
                        { isPendingSynonym && <div>Loading...</div> }
                        { errorSynonym && <div>{ errorSynonym }</div> }
                        {wordListS && wordListS.map(renderWords)}
                    </tbody>
                    {<button onClick = {()=>quizResult(answerSynonyms)}>Submit</button>}
                    {<button onClick={()=>window.location.reload()}>Go back</button>}
                </ReactBootStrap.Table>}
                {quizResultOut && <div>
                    {quizOutMsg}
                    </div>}
            </div>
            {/* {console.log(answerChoices)} */}
            <div className="definitionQuiz">
                {definitionQuizControl && <div className="answer-choices">
                Answer Choices: {definitionData && editedList(definitionList)}
                </div>}

                {definitionQuizControl && <ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th className="tableTitle">Definitions</th>
                        <th className="tableTitle">Word</th>
                        </tr>
                    </thead>
                    <tbody className="synonymTable">
                        { isPendingDefinition && <div>Loading...</div> }
                        { errorDefinition && <div>{ errorDefinition }</div> }
                        {wordListD && wordListD.map(renderWords)}
                    </tbody>
                    {<button>Submit</button>}
                {<button onClick={()=>window.location.reload()}>Go back</button>}
                </ReactBootStrap.Table>}
            </div>

        {/* {console.log(answerChoices)} */}
        </div>
     );
}
 
export default Quiz;