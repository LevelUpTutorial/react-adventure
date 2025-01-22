import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game.jsx';
import GameState from './GameState.js';
import { loadGameState } from './GameUtils.js';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [heroName, setHeroName] = useState(GameState.DEFAULT_NAME);
  const [gender, setGender] = useState(GameState.DEFAULT_GENDER);
  const [selectedSave, setSelectedSave] = useState(null);
  const [savedGames, setSavedGames] = useState({
    [GameState.GENDER_MALE]: null,
    [GameState.GENDER_FEMALE]: null,
  });

  useEffect(() => {
    // Load saved games for both genders
    const maleSave = loadGameState(GameState.GENDER_MALE);
    const femaleSave = loadGameState(GameState.GENDER_FEMALE);
    setSavedGames({
      [GameState.GENDER_MALE]: maleSave,
      [GameState.GENDER_FEMALE]: femaleSave,
    });
  }, []);

  const handleNewGame = () => {
    setSelectedSave(null);
    setShowGame(true);
  };

  const handleContinue = () => {
    if (selectedSave) {
      setShowGame(true);
    }
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setSelectedSave(null); // Reset saved game selection when changing gender
  };

  const handleSaveSelection = (selectedGender) => {
    setSelectedSave(savedGames[selectedGender]);
    setGender(selectedGender);
  };

  if (showGame) {
    return (
      <Game
        heroName={heroName}
        gender={gender}
        isGameRunning={true}
        savedGameState={selectedSave}
      />
    );
  }

  return (
    <div
      className="container mx-auto p-4 shadow rounded"
      style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Title Header */}
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">A React Adventure</h1>
      </header>

      {/* Gender Selection Section */}
      <div className="mb-4">
        <h2 className="h5 text-secondary">Choose Your Character</h2>
        <div className="d-flex justify-content-around">
          {[GameState.GENDER_MALE, GameState.GENDER_FEMALE].map((option) => (
            <div
              key={option}
              className={`card ${gender === option ? 'border-primary' : ''}`}
              style={{ width: '150px', cursor: 'pointer' }}
              onClick={() => handleGenderSelection(option)}
            >
              <img
                src={
                  option === GameState.GENDER_MALE
                    ? GameState.IMG_HERO_MALE_NEUTRAL
                    : GameState.IMG_HERO_FEMALE_NEUTRAL
                }
                className="card-img-top"
                alt={`${option} character`}
              />
              <div className="card-body text-center">
                <p className="card-text text-capitalize">
                  {option === GameState.GENDER_MALE ? 'Male' : 'Female'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Game Section */}
      <div className="mb-4">
        <button
          className="btn btn-primary w-100"
          onClick={handleNewGame}
        >
          Start New Game
        </button>
      </div>

      {/* Saved Games Section */}
      <div className="mb-4">
        <h2 className="h5 text-secondary">Continue Saved Game</h2>
        <div className="list-group">
          {[GameState.GENDER_MALE, GameState.GENDER_FEMALE].map((option) => (
            <button
              key={option}
              className={`list-group-item list-group-item-action ${
                selectedSave && selectedSave.hero.gender === option
                  ? 'active'
                  : ''
              }`}
              onClick={() => handleSaveSelection(option)}
              disabled={!savedGames[option]}
            >
              {savedGames[option]
                ? `Continue as ${savedGames[option].hero.name} (${option})`
                : `No saved game for ${option}`}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mb-4">
        <button
          className="btn btn-success w-100"
          onClick={handleContinue}
          disabled={!selectedSave}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;
