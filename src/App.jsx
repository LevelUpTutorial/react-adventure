import { useState } from 'react';
import './App.css';
import Game from './Game.jsx';

function App() {
  const [showGame, setShowGame] = useState(false); // State to toggle Game component
  const [heroName, setHeroName] = useState(''); // State to store the hero name

  return (
    <div className="mx-auto p-2" style={{width:'100%', maxWidth:'800px'}}>
      <header>React Adventure</header>

      {!showGame && ( // Show input and button if Game is not displayed
        <div>
          <input
            type="text"
            placeholder="Enter your hero's name"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)} // Update heroName state
            className="form-control mb-3"
          />
          <button
            type="button"
            onClick={() => setShowGame(true)} // Show Game and pass heroName
            className="btn btn-primary"
          >
            Start new Adventure
          </button>
        </div>
      )}

      {showGame && <Game hero={heroName || 'Unnamed Hero'} />} {/* Pass hero name to Game */}
    </div>
  );
}

export default App;
