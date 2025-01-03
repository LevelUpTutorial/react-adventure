import { useState } from 'react';
import './App.css';
import Game from './Game.jsx';
import GameState from './GameState.js';
import PropTypes from 'prop-types';


function App() {
  const [showGame, setShowGame] = useState(false); // State to toggle Game component
  const [heroName, setHeroName] = useState(GameState.DEFAULT_NAME); // State to store the hero name
  const [gender, setGender] = useState(GameState.DEFAULT_GENDER); // State to store selected gender, default is 'male'

  return (
    <div className="mx-auto p-4 shadow rounded" style={{ width: '100%', maxWidth: '800px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
      {/* Title Header */}
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">A React Adventure</h1>
      </header>
  
      {!showGame && ( /* Show input and hero selection if Game is not displayed */
        <div>
          {/* Hero Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your hero's name"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              className="form-control form-control-lg border-primary rounded"
            />
          </div>
  
          {/* Hero Selection */}
          <div className="mb-4">
            <p className="fw-bold text-primary">Choose your Hero:</p>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <div 
                className={`p-2 border ${gender === GameState.GENDER_MALE ? 'border-primary' : 'border-secondary'} rounded shadow-sm`}
                onClick={() => setGender(GameState.GENDER_MALE)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  id="select-male"
                  src={GameState.IMG_HERO_MALE_NEUTRAL}
                  alt="Male Hero"
                  className="img-fluid rounded"
                  style={{ width: '100px', height: '150px' }}
                />
                <label for="select-male">heavy hitter</label>
              </div>
              <div
                className={`p-2 border ${gender === GameState.GENDER_FEMALE ? 'border-primary' : 'border-secondary'} rounded shadow-sm`}
                onClick={() => setGender(GameState.GENDER_FEMALE)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  id="select-female" 
                  src={GameState.IMG_HERO_FEMALE_NEUTRAL}
                  alt="Female Hero"
                  className="img-fluid rounded"
                  style={{ width: '100px', height: '150px' }}
                />
                <label for="select-female">fast & agily</label>
              </div>
            </div>
          </div>
  
          {/* Start Adventure Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowGame(true)} /* Show Game and pass heroName and gender */
              className="btn btn-primary btn-lg px-5 shadow-sm"
            >
              Start New Adventure
            </button>
          </div>
        </div>
      )}
  
      {showGame && <Game heroName={heroName} gender={gender} isGameRunning={showGame} />} {/* Pass heroName and gender to Game */}
    </div>
  );
}

App.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isGameRunning: PropTypes.bool.isRequired
}

export default App;
