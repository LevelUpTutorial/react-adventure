import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";
import StoryDialog from "./components/StoryDialog.jsx"

import PropTypes from "prop-types";

const TICKS_PER_SECOND = 10;
const TICK_DURATION_ADVENTURE = Math.round(1000 / TICKS_PER_SECOND);
const TICK_DURATION_CITY = 1000;

function Game({ heroName, gender, isGameRunning }) {
  // Initialize game state in React state
  const [gameState, setGameState] = useState(
    new GameState(heroName, gender, GameState.DEFAULT_LOCATION)
  );
  const [storyEvent, setStoryEvent] = useState(null); // Holds the active story event object ({ title, text, background }).
  const [isStoryDialogOpen, setStoryDialogOpen] = useState(false); // Controls dialog visibility

  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState, setStoryEvent, setStoryDialogOpen));
  };

  const currentTickDuration =
    gameState.location.name === GameState.LOCATION_CITY.name || gameState.hero.isInDialog
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;

  // Use the game loop hook
  useGameLoop(updateGameState, isGameRunning, currentTickDuration);

  const handleLocationChange = (newLocation) => {
    setGameState((prevState) => {
      const state = {...prevState, location: newLocation};
      if (newLocation.name === GameState.LOCATION_CITY.name) {
        return handleResetHeroInTown(state);
      }
      // TODO switch encounter table (safe old and load new)
      setBodyBackground(newLocation);
      return state;
    });
  };

  return (
    <div className="d-flex flex-column mb-3 border border-white">
      <div className="p-2 border border-secondary-subtle">
        <p>Welcome: {gameState.hero.name}</p>
      </div>

      {gameState.location.name === GameState.LOCATION_CITY.name && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location.name}</p>
            <div className="battle-container">
              <img
                src={`${gameState.hero.image}`}
                alt='hero'
                className='hero-image img-fluid rounded'
                style={{ width: '100px', height: '150px' }}
              />
            </div>
          </div>
          <div className="p-2 border border-secondary-subtle">
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT1)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT1.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT2)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT2.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT3)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT3.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT4)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT4.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT5)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT5.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT6)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT6.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT7)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT7.name}
            </button>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE_ACT8)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_ADVENTURE_ACT8.name}
            </button>
          </div>
        </>
      )}

      {gameState.location.name !== GameState.LOCATION_CITY.name && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location.name}</p>
            <p>Hero - HP: {gameState.hero.health}, Attack: {gameState.hero.attack}, Attack Cooldown: {gameState.hero.attack_cooldown}</p>
            {gameState.active_enemy !== null && (
              <p>{gameState.active_enemy.name}: HP: {gameState.active_enemy.health}, Attack: {gameState.active_enemy.attack}, Attack Cooldown: {gameState.active_enemy.attack_cooldown}</p>
            )}
            <div className="battle-container">
              <img
                src={`${gameState.hero.image}`}
                alt='hero'
                className='hero-image img-fluid rounded'
                style={{width: '100px', height: '150px'}}
              />
              {gameState.hero.isInCombat && (
                <img
                  src={`${gameState.active_enemy.image}`}
                  alt='enemy'
                  className='enemy-image img-fluid rounded'
                  style={{width: '100px', height: '150px'}}
                />
              )}
            </div>
          </div>
          <div className="p-2 border border-secondary-subtle">
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_CITY)}
              className="btn btn-primary"
            >
              {GameState.LOCATION_CITY.name}
            </button>
          </div>
        </>
      )}

      {isStoryDialogOpen && storyEvent && (
        <StoryDialog
          title={storyEvent.title}
          content={storyEvent.content}
          background={storyEvent.background}
          onClose={() => {
            setGameState(handleResetHeroControl(gameState));
            storyEvent.onClose(gameState);
            setStoryDialogOpen(false); // Close the dialog
            setStoryEvent(null); // Clear the current story event
          }}
        />
      )};
    </div>
  );
}

/* Set HTML <body> background based on location.background
  "background-image: url("@/assets/images/background-default.jpg");"
*/
function setBodyBackground(location) {
  console.log(`setBodyBackground: ${location.name}`);
  console.log(`setBodyBackground: ${location.background}`);

  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${location.background})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

/* Main Function to handle all In-game Event Logic */
function handleGameState(gameState, setStoryEvent, setStoryDialogOpen) {
  const location = gameState.location;
  let hero = { ...gameState.hero };
  let active_enemy = { ...gameState.active_enemy };
  console.log(`handleGameState: Hero -> ${hero}`);
  console.log(`handleGameState: Enemy -> ${active_enemy.name}`);
  console.log(`handleGameState: Enemy Atk Sp -> ${active_enemy.attack_speed}`);
  console.log(`handleGameState: Enemy Atk Cd -> ${active_enemy.attack_cooldown}`);
  console.log(`handleGameState: isInCombat -> ${hero.isInCombat}`);
  console.log(`handleGameState: isInDialog -> ${hero.isInDialog}`);

  // handle Combat
  if (hero.isInCombat) {
    console.log('hero is in combat');
    if (hero.attack_cooldown <= 0) {
      active_enemy.health -= hero.attack;
      hero.attack_cooldown = hero.attack_speed;
    } else {
      hero.attack_cooldown -= TICK_DURATION_ADVENTURE;
    }

    hero.isInCombat = active_enemy.health > 0;
    if (hero.isInCombat) {
      // Enemy still alive, Counter attack
      if (active_enemy.attack_cooldown <= 0) {
        hero.health -= active_enemy.attack;
        active_enemy.attack_cooldown = active_enemy.attack_speed;
      } else {
        active_enemy.attack_cooldown -= TICK_DURATION_ADVENTURE;
      }
    } else {
      // Enemy died
      hero.attack_cooldown = hero.attack_speed;
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
    }

    console.log(`handleGameState: Hero HP -> ${hero.health}`);
    const stateAfterDmgCalc = {...gameState, hero, active_enemy};
    return (hero.health > 0 ? stateAfterDmgCalc : handleResetHeroInTown(stateAfterDmgCalc));
  }

  // handle Adventure outside of Combat
  if (!hero.isInDialog && location.name !== GameState.LOCATION_CITY.name) {
    // handle roll new encounter
    if (gameState.next_encounters.length === 0) {
      console.log('No active encounter - rolling new encounter');
      console.log('Accessing random_encounters:', gameState.random_encounters);
      const entries = GameState.findEncounterList(gameState, location.name);
      let rnd_encounter = getRandomItem(entries);
      if (!rnd_encounter) {
        console.error('Failed to roll a new encounter');
        // Eventuell hier das Spiel andersweitig fortsetzen oder Fehler abfangen
        // return;
      }
      console.log(`New Encounter: ${rnd_encounter.id}`);
      gameState.next_encounters.push(rnd_encounter);
    }

    const encounter = gameState.next_encounters.shift();
    if (encounter.category === 'combat') {
      gameState = handleResetHeroControl(gameState);
      hero = gameState.hero;
      hero.isInCombat = true;
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_COMBAT : GameState.IMG_HERO_FEMALE_COMBAT);
      active_enemy = {...encounter.enemy};
    } else if (encounter.category === 'story') {
      gameState = handleResetHeroControl(gameState);
      hero = gameState.hero;
      hero.isInDialog = true;
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);

      setStoryEvent(encounter.dialog); // Set the story event
      setStoryDialogOpen(true); // Open the dialog

    } else {
      console.log(`ERROR: Unknown encounter type category ${encounter.category}`);
    }

    return {...gameState, hero, active_enemy};
  }

  if (location.name === GameState.LOCATION_CITY.name) {
    return handleResetHeroInTown({...gameState, hero, active_enemy});
  }

  // return gameState unchanged
  console.log('return gameState unchanged')
  return gameState;
}

/*
  handle reset Hero control variables
 */
function handleResetHeroControl(gameState) {
  const hero = { ...gameState.hero };
  hero.isInCombat = false;
  hero.isInDialog = false;
  hero.attack_cooldown = hero.attack_speed;
  let active_enemy = null;

  return {...gameState, hero, active_enemy};
}

/*
  handle reset Hero in Town
 */
function handleResetHeroInTown(gameState) {
  gameState = handleResetHeroControl(gameState);
  const hero = { ...gameState.hero };

  let location = GameState.LOCATION_CITY;
  hero.health = 100*hero.level; // Heal
  hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);

  // return new gameState
  return {...gameState, hero, location};
}

/**
 * Function to select a random item based on weights
 * @param {Array} entries - Array of objects with `item` and `weight` properties
 * @returns {any} - Selected item
 */
function getRandomItem(entries) {
  // Überprüfen, ob die Liste leer ist
  if (!entries || entries.length === 0) {
    console.error('Error: No entries available in the list.');
    return null;
  }
  console.log(`getRandomItem: ${entries}`)
  // Calculate the total weight
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  // Generate a random number between 0 and totalWeight
  const random = Math.random() * totalWeight;

  // Iterate through entries to find the selected item
  let cumulativeWeight = 0;
  for (const entry of entries) {
    cumulativeWeight += entry.weight;
    if (random < cumulativeWeight) {
      return entry;
    }
  }

  // Fallback (should not happen if weights are correctly provided)
  console.error('Error: Random selection failed. This should not happen.');
  return null;
}

/*
  ChatGPT GameLoop Custom Hook
 */
function useGameLoop(callback, isGameRunning, tickDuration) {
  const savedCallback = useRef();

  // Save the latest callback to avoid stale closures.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isGameRunning) {
      const tick = () => savedCallback.current();
      const interval = setInterval(tick, tickDuration);

      return () => clearInterval(interval); // Cleanup on stop
    }
  }, [isGameRunning, tickDuration]);
}


/*
  https://indepthjavascript.dev/how-to-create-a-simple-game-loop-in-react-javascripttypescript-in-under-10-lines-of-code
  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
// eslint-disable-next-line no-unused-vars
function GameLoop(prevState) {
  const location = prevState.location;

  useInterval(() => {
    // Your custom logic here !!!
    handleGameState(prevState);
  }, location.name === GameState.LOCATION_CITY.name ? TICK_DURATION_CITY : TICK_DURATION_ADVENTURE);
}

/*
  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

Game.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isGameRunning: PropTypes.bool.isRequired
};

export default Game;
