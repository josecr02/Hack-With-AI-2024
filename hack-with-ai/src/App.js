import './App.css';
import { useState } from 'react';

function App() {

    const [ value, setValue ] = useState("");
    const [ chatHistory, setChatHistory ] = useState([]);

    // response function~
    const getResponse = async () => {
      if (!value){
        // There's an error but I won't handle it because not necessary
        return;
      }

      try {
        // send to backend
        const options = {
          method: 'POST',
          body: JSON.stringify({
            history: chatHistory,
            message: value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch('http://localhost:8000/gemini', options);
        const data = await response.text();
        console.log(data);
        setChatHistory((depecratedChatHistory) => [...depecratedChatHistory, {
          role: "user",
          parts: [{text: value}]
        },
        {
          role: "model",
          parts: [{text : data}]
        }      
      ]);
      setValue("");
      } catch(error){
        console.error(error); //error sad :(
      }
    }



  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Amazon Review Analysis Hack With AI
        </p>
        <p className = "sub-header">Powered by Gemini.</p>
      </header>
      <div className = 'chat'>
        <div className = 'input-container'>
          <input
            value = {value}
            onChange = {(e) => setValue(e.target.value)}
          />
          <button onClick = {getResponse}>Review</button>
        </div>
        <div className = 'search-result'>
          {chatHistory.map((chatItem, _index) =>
            <div key = {_index}>
              <p className = "answer">{chatItem.role} : {chatItem.parts[0].text}</p>
            </div>  
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
