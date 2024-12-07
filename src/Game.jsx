import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";

const TICKS_PER_SECOND = 2;
const TICK_DURATION_ADVENTURE = Math.round(1000 / TICKS_PER_SECOND);
const TICK_DURATION_CITY = 1000;

function Game(props) {
  // Initialize game state in React state
  const [gameState, setGameState] = useState(
    new GameState(props.heroName, props.gender, GameState.DEFAULT_LOCATION)
  );

  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState));
  };

  const currentTickDuration =
    gameState.location === GameState.LOCATION_CITY
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;

  // Use the game loop hook
  useGameLoop(updateGameState, props.isGameRunning, currentTickDuration);

  const handleLocationChange = (newLocation) => {
    setGameState((prevState) => ({
      ...prevState,
      location: newLocation,
    }));
  };

  return (
    <div className="d-flex flex-column mb-3 border border-white">
      <div className="p-2 border border-secondary-subtle">
        <p>Navigation Frame</p>
        <p>Welcome: {gameState.hero.name}</p>
      </div>

      {gameState.location === GameState.LOCATION_CITY && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location}</p>
            <div className="battle-container">
              <img
                //src={`${gameState.hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL}`}
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
            <p>Enemy: {gameState.active_enemy === null ? 'none' : gameState.active_enemy.name}</p>
            <p>Enemy HP: {gameState.active_enemy === null ? 'none' : gameState.active_enemy.health}</p>
            <div className="battle-container">
              <img
                //src={`${gameState.hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL}`}
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
            <p>Interaction Frame</p>
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
    if (!hero.isInCombat) {
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
    }

    return {...gameState, hero, active_enemy};
  }

  // handle Adventure outside of Combat
  if (location === GameState.LOCATION_ADVENTURE) {
    // handle roll new encounter
    console.log('No active encounter - spawning goblin');
    hero.isInCombat = true;
    hero.attack_cooldown = 0;
    hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_COMBAT : GameState.IMG_HERO_FEMALE_COMBAT);
    active_enemy = { ...GameState.ENEMY_GOBLIN_GREEN };
    return {...gameState, hero, active_enemy};
    // handle current non-combat encounter
    // TODO
  }

  if (location === GameState.LOCATION_CITY) {
    hero.isInCombat = false;
    hero.attack_cooldown = 0;
    hero.health = 100*hero.level;
    hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
    active_enemy = null;
    return {...gameState, hero, active_enemy};
  }

  // return gameState unchanged
  console.log('return gameState unchanged')
  return gameState;
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

export default Game;
