import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";
import PropTypes from "prop-types";

const TICKS_PER_SECOND = 2;
const TICK_DURATION_ADVENTURE = Math.round(1000 / TICKS_PER_SECOND);
const TICK_DURATION_CITY = 1000;

function Game({ heroName, gender, isGameRunning }) {
  // Initialize game state in React state
  const [gameState, setGameState] = useState(
    new GameState(heroName, gender, GameState.DEFAULT_LOCATION)
  );

  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState));
  };

  const currentTickDuration =
    gameState.location === GameState.LOCATION_CITY
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;

  // Use the game loop hook
  useGameLoop(updateGameState, isGameRunning, currentTickDuration);

  const handleLocationChange = (newLocation) => {
    setGameState((prevState) => {
      const state = {...prevState, location: newLocation};
      if (newLocation === GameState.LOCATION_CITY) {
        return handleResetHeroInTown(state);
      }
      return state;
    });
  };

  return (
    <div className="d-flex flex-column mb-3 border border-white">
      <div className="p-2 border border-secondary-subtle">
        <p>Welcome: {gameState.hero.name}</p>
      </div>

      {gameState.location === GameState.LOCATION_CITY && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location}</p>
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
            <p>Interaction Frame</p>
            <button
              type="button"
              onClick={() => handleLocationChange(GameState.LOCATION_ADVENTURE)}
              className="btn btn-primary"
            >
              Start Adventuring
            </button>
          </div>
        </>
      )}

      {gameState.location === GameState.LOCATION_ADVENTURE && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location}</p>
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
            Go to City
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* Main Function to handle all In-game Event Logic */
function handleGameState(gameState) {
  const location = gameState.location;
  const hero = { ...gameState.hero };
  let active_enemy = { ...gameState.active_enemy };
  console.log(`handleGameState: Hero -> ${hero}`);
  console.log(`handleGameState: Enemy -> ${active_enemy.name}`);
  console.log(`handleGameState: isInCombat -> ${hero.isInCombat}`);

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
  if (location === GameState.LOCATION_ADVENTURE) {
    // handle roll new encounter
    console.log('No active encounter - spawning goblin');
    hero.isInCombat = true;
    hero.attack_cooldown = hero.attack_speed;
    hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_COMBAT : GameState.IMG_HERO_FEMALE_COMBAT);
    active_enemy = { ...GameState.ENEMY_GOBLIN_GREEN };
    return {...gameState, hero, active_enemy};
    // handle current non-combat encounter
    // TODO
  }

  if (location === GameState.LOCATION_CITY) {
    return handleResetHeroInTown({...gameState, hero, active_enemy});
  }

  // return gameState unchanged
  console.log('return gameState unchanged')
  return gameState;
}

/*
  handle reset Hero in Town
 */
function handleResetHeroInTown(gameState) {
  let location = GameState.LOCATION_CITY;
  const hero = { ...gameState.hero };

  hero.isInCombat = false;
  hero.attack_cooldown = hero.attack_speed;
  hero.health = 100*hero.level;
  hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
  let active_enemy = null;

  // return new gameState
  return {...gameState, hero, active_enemy, location};
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
  }, location === GameState.LOCATION_CITY ? TICK_DURATION_CITY : TICK_DURATION_ADVENTURE);
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
