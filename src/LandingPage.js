import { useEffect } from "react";
import ReactWordcloud from 'react-wordcloud';
import useFetch from './useFetch';



// const set1Words = ["abound","amorphous","belie", "capricious","cerebral","congenial",
//             "conspicuous","cursory","daunting","deify","didactic","disseminate",
//             "feasible","flout", "homogeneous","humdrum","insipid","loquacious",
//             "misanthropic","misnomer","negligent","obsequious","placate",
//             "proclivity","puerile","quixotic","spendthrift","taciturn",
//             "wary","austere"
// ];

// const set2Words = ["adulterate","advocate","aggrandize","alacrity","ambivalent",
//             "ameliorate","amenable","anachronistic","audacious","avaricious",
//             "banal","benign","brazen","calumny","candid","castigate","caustic",
//             "construe","contrite","convoluted","covet","craven","decorum",
//             "deft","demur","derivative","dessicate","diatribe","incredulous",
//             "ingenuous"
// ];

// const set3Words = ["abate","abjure","anomalous","antipathy","arcane","arduous",
//             "artless","ascetic","assuage","betray","bucolic","burgeon",
//             "cacophonous","canonize","censure","chicanery","coalesce",
//             "cogent","compelling","contend","copious","cosmopolitan",
//             "deference","desultory","diffident","dilatory","equivocate",
//             "polarize","prodigal","verbose"
// ];
// window.location.reload()


const LandingPage = () => {
    const wordCloud = [];
    const size = [1600, 500];

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    const { data: words} = useFetch('https://gre-vocab-prep.herokuapp.com/synonyms');

    if(words){
        for(let i=0; i < words.length; i++){
            wordCloud.push(
                {
                    text: words[i].word,
                    value: randomIntFromInterval(60,100),
                }
            );
        }
        
        for (let i=0; i<words.length;i++){
            for(let j=0;j<words[i].synonym.length;j++){
                wordCloud.push(
                    {
                        text: words[i].synonym[j],
                        value: randomIntFromInterval(40,100),
                    }
                );
            }
        }
    }
    
    
    

    // }
    // else{
    //     
    // }
    
    useEffect(()=>{
        document.title="GRE Verbal Prep";
    })
    return ( 
        <div className="LandingPage">
            <h1>Vocabulary, thy wretched adversary!</h1>
            <div className="LandingPage-content">
                {/* <p>Fellow GRE Test takers, welcome to my site. You can use this 
                    site to train your Vocabulary skills (Definition and Synonyms).
                    You can learn from the pre-defined list of words, or you can
                    also add your own words to your profile. There will be quizzes 
                    that will ask you to match definitions or synonyms.
                </p> */}
                <p>All the words that you add to your list appear here.</p>
                <p>These are the words that have already been added to the list...</p>

                <div className="wordCloud">
                    <ReactWordcloud size = {size} words={wordCloud} />
                </div>

            </div>
        </div>
     );
}
 
export default LandingPage;