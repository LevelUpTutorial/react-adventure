import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game.jsx';
import GameState from './GameState.js';
import { loadGameState } from './GameUtils.js';

import heroFemaleNeutral from './assets/images/hero/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero/hero_male_neutral.jpg';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [heroName, setHeroName] = useState(GameState.DEFAULT_NAME);
  const [gender, setGender] = useState(GameState.DEFAULT_GENDER);
  const [selectedSave, setSelectedSave] = useState(null);
  const [savedGames, setSavedGames] = useState({
    [GameState.GENDER_MALE]: null,
    [GameState.GENDER_FEMALE]: null,
  });
  const [isSaveValid, setIsSaveValid] = useState({
    [GameState.GENDER_MALE]: false,
    [GameState.GENDER_FEMALE]: false,
  });

  useEffect(() => {
    // Load saved games for both genders
    const maleSave = loadGameState(GameState.GENDER_MALE);
    const femaleSave = loadGameState(GameState.GENDER_FEMALE);
    setSavedGames({
      [GameState.GENDER_MALE]: maleSave,
      [GameState.GENDER_FEMALE]: femaleSave,
    });

    setIsSaveValid({
      [GameState.GENDER_MALE]: maleSave && maleSave.compatability === GameState.COMPATABILITY,
      [GameState.GENDER_FEMALE]: femaleSave && femaleSave.compatability === GameState.COMPATABILITY,
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
  };

  const handleSaveSelection = (selectedGender) => {
    setSelectedSave(savedGames[selectedGender]);
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
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
      }}
    >
      {/* Title Header */}
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">A React Adventure</h1>
      </header>

      {/* Gender Selection Section */}
      <div className="mb-4">
        <h2 className="h5 text-primary">Choose Your Character</h2>
        <div className="d-flex justify-content-around">
          {[GameState.GENDER_MALE, GameState.GENDER_FEMALE].map((option) => (
            <div
              key={option}
              className={`card ${gender === option ? 'border-primary border-4' : ''}`}
              style={{ width: '150px', cursor: 'pointer' }}
              onClick={() => handleGenderSelection(option)}
            >
              <img
                src={
                  option === GameState.GENDER_MALE
                    ? heroMaleNeutral
                    : heroFemaleNeutral
                }
                className="card-img-top"
                alt={`${option} character`}
              />
              <div className="card-body text-center">
                <p className="card-text text-capitalize">
                  {option === GameState.GENDER_MALE ? 'Bonus Critical Hit Chance, Critical Hit Damage' : 'Bonus Attack Speed, Evade Chance'}
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
        <h2 className="h5 text-primary">Continue Saved Game</h2>
        <div className="list-group">
          {[GameState.GENDER_MALE, GameState.GENDER_FEMALE].map((option) => (
            <button
              key={option}
              className={`list-group-item list-group-item-action ${
                selectedSave && selectedSave.hero.gender === option
                && isSaveValid[option]
                  ? 'active'
                  : ''
              }`}
              onClick={() => handleSaveSelection(option)}
              disabled={ !(savedGames[option] && isSaveValid[option]) }
            >
              {savedGames[option]
                ? isSaveValid[option]
                  ? `Continue as ${savedGames[option].hero.name} (Level ${savedGames[option].hero.level})`
                  : `${savedGames[option].hero.name} (Level ${savedGames[option].hero.level}) outdated!`
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
