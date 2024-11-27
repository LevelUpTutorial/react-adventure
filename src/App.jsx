import { useState } from 'react';
import './App.css';
import Game from './Game.jsx';
import heroMaleNeutral from './assets/images/hero_male_neutral.jpg';
import heroFemaleNeutral from './assets/images/hero_female_neutral.jpg';

function App() {
  const [showGame, setShowGame] = useState(false); // State to toggle Game component
  const [heroName, setHeroName] = useState('Unnamed Hero'); // State to store the hero name
  const [gender, setGender] = useState('male'); // State to store selected gender, default is 'male'

  return (
    <div className="mx-auto p-2" style={{ width: '100%', maxWidth: '800px' }}>
      <header className="text-center mb-4">A React Adventure</header>

      {!showGame && ( // Show input and hero selection if Game is not displayed
        <div>
          <input
            type="text"
            placeholder="Enter your hero's name"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)} // Update heroName state
            className="form-control mb-3"
          />

          <div className="mb-3">
            <p className="fw-bold">Choose your Hero:</p>
            <div className="d-flex justify-content-start align-items-center gap-3">
              <div
                className={`border ${gender === 'male' ? 'border-primary' : 'border-secondary'} rounded`}
                onClick={() => setGender('male')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={heroMaleNeutral}
                  alt="Male Hero"
                  className="img-fluid rounded"
                  style={{ width: '100px', height: '150px' }}
                />
              </div>
              <div
                className={`border ${gender === 'female' ? 'border-primary' : 'border-secondary'} rounded`}
                onClick={() => setGender('female')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={heroFemaleNeutral}
                  alt="Female Hero"
                  className="img-fluid rounded"
                  style={{ width: '100px', height: '150px' }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowGame(true)} // Show Game and pass heroName and gender
            className="btn btn-primary"
          >
            Start new Adventure
          </button>
        </div>
      )}

      {showGame && <Game heroName={heroName || 'Unnamed Hero'} gender={gender} />} {/* Pass heroName and gender to Game */}
    </div>
  );
}

export default App;
