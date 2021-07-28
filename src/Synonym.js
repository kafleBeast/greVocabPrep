import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import { render } from '@testing-library/react';

const Synonym = () => {
    const [word, setWord] = useState('');
    const history = useHistory();
    // const [synonym, setSynonym] = useState([]);
    // const word = "austere";
    // setWord("austere");
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    const {data, error:errorRetrieve, isPending:isPendingRetrieve} = useFetch(url);

    const synonym = data && data[0].meanings[0].definitions[0].synonyms;    
    // console.log('word:' + word);
    // console.log('synonyms: ' + synonym);

    const { id } = useParams();
    const { data: dispWord, error:errorDisp, isPending:isPendingDisp } = useFetch('http://localhost:8001/synonyms/');

    console.log(dispWord && dispWord);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:8001/synonyms/",{
        method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({word, synonym})
        }).then(() => {
            window.location.reload ();
        }) 

    }

    const handleDelete = () => {
        fetch('http://localhost:8001/synonyms/' + dispWord.id, {
          method: 'DELETE'
        }) 
    }

    const renderWords = (words, index) => {
        const tempvar = [...words.synonym];
        let valuesM = []
        for(let i=0;i<tempvar.length;i++){
            valuesM.push(" "+tempvar[i]+ "," +" ");
        }
        return(
            <tr key = {index}>
                <td>{words.word}</td>
                <td>{valuesM}</td>
            </tr>
        );
    };

    useEffect(()=>{

    },[word])
   
    return ( 
        <div className="Synonym">
            <div className="addSynonym">
                <h1>Add Synonyms</h1>
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
                {console.log(word&& word)}
            </div>

            <div className="displaySynonym">
                {<ReactBootStrap.Table hover bordered size="md">
                    <thead>
                        <tr>
                        <th>Word</th>
                        <th>Synonyms</th>
                        </tr>
                    </thead>
                    <tbody className="synonymTable">
                        { isPendingDisp && <div>Loading...</div> }
                        { errorDisp && <div>{ errorDisp }</div> }
                        {dispWord && dispWord.map(renderWords)}
                    </tbody>
                </ReactBootStrap.Table>}

            </div>
        </div>
     );
}
 
export default Synonym;