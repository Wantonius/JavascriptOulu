import React,{useState,useMemo} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	
	const [count,setCount] = useState(0)
	const [currentWord,setCurrentWord] = useState(0);
	const words = ['banaani','omena','olut','loma'];
	let word = words[currentWord]
	
	const computeLetterCount = word => {
		let i=0;
		while(i<1000000000) i++;
		return word.length;
	}
	
	//const letterCount = computeLetterCount(word);
	
	const letterCount = useMemo(() => computeLetterCount(word),[word])
	
    return (
		<div className="App">
			<h2>Length of the word {word}:{letterCount}</h2>
			<button 
			onClick={() => {
				let next = currentWord +1 === words.length ? 0:currentWord+1
				setCurrentWord(next)
			}}>Next Word</button>
			
			<h2>Increment counter:</h2>
			<p>Counter:{count}</p>
			<button onClick={() => setCount(count+1)}>Add</button>
		</div>
    );
}

export default App;
