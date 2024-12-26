import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";
import StoryDialog from "./components/StoryDialog.jsx"
import {combatCalculation, playSound, SND_SWORD_HIT} from "./GameUtils.js";

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
  const [isCounterAttackActive, setCounterAttackActive] = useState(false);
  
  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive));
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

  const handleCounterAttack = () => {
    if (!isCounterAttackActive) return;

    setGameState((prevState) => {
      prevState = performHeroAttack(prevState); 
      const {hero, active_enemy} = prevState; 

      // Reset the button state
      setCounterAttackActive(false);

      return { ...prevState, hero, active_enemy };
    });
  };

  const attackProgress = (gameState.hero.attack_cooldown / gameState.hero.attack_speed) * 100;

  const renderCombatEvent = (text) => {
    let style;

    if (text?.startsWith("crit")) {
      style = { border: "1px solid orange", color: "orange", padding: "5px" }; // critical hits
    } else if (text?.startsWith("dealt")) {
      style = { border: "1px solid black", color: "black", padding: "5px" }; // normal damage
    } else if (text?.startsWith("missed")) {
      style = { border: "1px solid gray", color: "gray", padding: "5px" }; // missed attacks
    } else {
      style = { border: "1px solid black", color: "black", padding: "5px" }; // default
    }

    if (!text) {
      // Render an invisible placeholder
      return <p style={{ visibility: "hidden", ...style }}>Placeholder</p>;
    }

    return <p style={style}>{text}</p>;
  };
  
  return (
    <div className="d-flex flex-column mb-3 border border-2 rounded shadow" style={{ backgroundColor: "rgba(255, 255, 255, 0.70)" }}>
      {/* Header Section */}
      <div className="p-3 border-bottom border-secondary-subtle bg-primary text-white">
        <p className="mb-0 fw-bold">Welcome, {gameState.hero.name}</p>
      </div>
  
      {/* City Location */}
      {gameState.location.name === GameState.LOCATION_CITY.name && (
        <>
          <div className="p-3 border-bottom border-secondary-subtle">
            <p className="fw-bold text-secondary">Location, {gameState.location.name}</p>
            <div className="battle-container text-center">
              <img
                src={gameState.hero.image}
                alt="hero"
                className="hero-image img-fluid rounded shadow-sm"
                style={{ width: "100px", height: "150px" }}
              />
            </div>
          </div>
  
          {/* Navigation Buttons */}
          <div className="p-3 d-flex flex-wrap gap-2 border-bottom border-secondary-subtle">
            {[...Array(8).keys()].map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => handleLocationChange(GameState[`LOCATION_ADVENTURE_ACT${act + 1}`])}
                className="btn btn-primary px-4"
              >
                {GameState[`LOCATION_ADVENTURE_ACT${act + 1}`].name}
              </button>
            ))}
          </div>
        </>
      )}
  
      {/* Adventure Location */}
      {gameState.location.name !== GameState.LOCATION_CITY.name && (
        <>
          <div className="p-3 border-bottom border-secondary-subtle">
            <p className="fw-bold text-secondary">Location, {gameState.location.name}</p>
            <div className="battle-container d-flex justify-content-around align-items-center">
              {/* Hero Section */}
              <div className="battle-container-hero text-center">
                <p className="fw-semibold text-success">
                  Hero ({gameState.hero.level}) - HP: {gameState.hero.health}
                </p>
                {renderCombatEvent(gameState.hero.last_combat_event)}
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: `${attackProgress}%`, height: '20px' }} 
                  aria-valuenow={attackProgress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >{`${(gameState.hero.attack_cooldown / 1000).toFixed(1)}s`}
                </div>
                <img
                  src={gameState.hero.image}
                  alt="hero"
                  className="hero-image img-fluid rounded shadow-sm"
                  style={{ width: "100px", height: "150px" }}
                />
              </div>
  
              {/* Enemy Section */}
              <div className="battle-container-enemy text-center">
                {gameState.active_enemy && (() => {
                  const eAttackProgress = (gameState.active_enemy.attack_cooldown / gameState.active_enemy.attack_speed) * 100;

                  return (
                    <>
                      <p className="fw-semibold text-danger">
                        {gameState.active_enemy.name} ({gameState.active_enemy.level}) - HP: {gameState.active_enemy.health}
                      </p>
                      {renderCombatEvent(gameState.active_enemy.last_combat_event)}
                      <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: `${eAttackProgress}%`, height: "20px" }} 
                        aria-valuenow={eAttackProgress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >{`${(gameState.active_enemy.attack_cooldown / 1000).toFixed(1)}s`}
                      </div>
                    </>
                  );
                })()}
                {gameState.hero.isInCombat && (
                  <img
                    src={gameState.active_enemy.image}
                    alt="enemy"
                    className="enemy-image img-fluid rounded shadow-sm"
                    style={{ width: "100px", height: "150px" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-3 text-center">
            {/* XP Progress Bar */}
            <div 
              className="progress-bar bg-info" 
              role="progressbar" 
              style={{ width: '100%', height: '20px' }} 
              aria-valuenow={gameState.hero.xp} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {`${gameState.hero.xp} / ${gameState.hero.xp_to_levelup} exp`}
            </div>
            {/* Back to Counter Button */}
            <button
              type="button"
              onClick={() => handleCounterAttack()}
              className={`btn ${isCounterAttackActive ? "btn-success" : "btn-outline-secondary"} px-4`}
              disabled={!isCounterAttackActive}
            >
              {isCounterAttackActive ? "Counter Attack" : "wait for evade"}
            </button>
            {/* Back to City Button */}
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_CITY)}
              className="btn btn-primary px-4"
            >
              Return to {GameState.LOCATION_CITY.name}
            </button>
          </div>
        </>
      )}
  
      {/* Story Dialog */}
      {isStoryDialogOpen && storyEvent && (
        <StoryDialog
          title={storyEvent.title}
          content={storyEvent.content}
          background={storyEvent.background}
          onClose={() => {
            setGameState(handleResetHeroControl(gameState));
            storyEvent.onClose(gameState);
            setStoryDialogOpen(false);
            setStoryEvent(null);
          }}
        />
      )}
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
function handleGameState(gameState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive) {
  const location = gameState.location;
  let {hero, active_enemy} = gameState;
  console.log(`handleGameState: Hero -> ${hero}`);
  if (active_enemy) {
    console.log(`handleGameState: Enemy -> ${active_enemy.name}`);
    console.log(`handleGameState: Enemy Atk Sp -> ${active_enemy.attack_speed}`);
    console.log(`handleGameState: Enemy Atk Cd -> ${active_enemy.attack_cooldown}`);
  }
  console.log(`handleGameState: isInCombat -> ${hero.isInCombat}`);
  console.log(`handleGameState: isInDialog -> ${hero.isInDialog}`);

  // handle Combat
  if (hero.isInCombat) {
    console.log('hero is in combat');
    if (hero.attack_cooldown <= 0) {
      gameState = performHeroAttack(gameState); 
      ({ hero, active_enemy } = gameState);
    } else {
      hero.attack_cooldown -= TICK_DURATION_ADVENTURE;
    }

    hero.isInCombat = active_enemy.health > 0;
    if (hero.isInCombat) {
      // Enemy still alive, handle its attack
      if (active_enemy.attack_cooldown <= 0) {
        gameState = performEnemyAttack(gameState, setCounterAttackActive);
        ({ hero, active_enemy } = gameState);
      } else {
        active_enemy.attack_cooldown -= TICK_DURATION_ADVENTURE;
      }
    } else {
      // Enemy died 
      if (hero.xp + active_enemy.xp_reward >= hero.xp_to_levelup) {
        // handle level up 
        hero.level += 1; 
        hero.xp = hero.xp + active_enemy.xp_reward - hero.xp_to_levelup; 
        hero.xp_to_levelup = GameUtils.calculateXpToLevelUp(hero.level); 
        // simple stat scaling 
        hero.health += 50; 
        hero.attack += 5; 
        hero.attack_speed -= 20; 
        hero.evade_chance += 1; 
        hero.crit_chance += 2; 
        hero.crit_damage += 10; 
      } else { 
        hero.xp += active_enemy.xp_reward;
      }
      // Hero reset 
      gameState = handleResetHeroControl({...gameState, hero, active_enemy}); 
      hero = gameState.hero; 
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
      setCounterAttackActive(false); // Disable button on victory
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
      active_enemy = {...encounter.enemy, last_combat_event: ""};
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

function performHeroAttack(gameState) {
  const hero = gameState.hero;
  const active_enemy = gameState.active_enemy;

  const dmg = combatCalculation(hero, active_enemy); 

  if (dmg >= 0) {
    if (dmg > hero.attack) {
      hero.last_combat_event = `crit ${dmg}`;
    } else {
      hero.last_combat_event = `dealt ${dmg}`; 
    }
    active_enemy.health -= dmg;
    playSound(SND_SWORD_HIT);
  } else {
    hero.last_combat_event = `missed`;
  }
    
  hero.attack_cooldown = hero.attack_speed;
  return {...gameState, hero, active_enemy}; 
}

function performEnemyAttack(gameState, setCounterAttackActive) {
  const hero = gameState.hero;
  const active_enemy = gameState.active_enemy;

  const dmg = combatCalculation(active_enemy, hero); 
  // evade ?
  if (dmg < 0) {
    console.log('Attack evaded!');
    active_enemy.last_combat_event = `missed`;
    setCounterAttackActive(true); // Enable Counter Attack button
  } else {
    if (dmg > active_enemy.attack) {
      active_enemy.last_combat_event = `crit ${dmg}`;
    } else {
      active_enemy.last_combat_event = `dealt ${dmg}`; 
    }
    hero.health -= dmg; // No evade, apply damage
    setCounterAttackActive(false); // Disable Counter Attack button
  }
  active_enemy.attack_cooldown = active_enemy.attack_speed;

  return {...gameState, hero, active_enemy};
}
  
/*
  handle reset Hero control variables
 */
function handleResetHeroControl(gameState) {
  const hero = { ...gameState.hero };
  hero.isInCombat = false;
  hero.isInDialog = false;
  hero.attack_cooldown = hero.attack_speed;
  hero.last_combat_event = ""; 
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
