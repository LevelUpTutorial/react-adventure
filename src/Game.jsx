import { useState } from "react";
import GameState from "./GameState.js";

function Game(props) {
  // Initialize game state in React state
  const [gameState, setGameState] = useState(
    new GameState(props.heroName, props.gender, GameState.DEFAULT_LOCATION)
  );

  const handleLocationChange = (newLocation) => {
    // Update the game state and trigger a re-render
    setGameState({
      ...gameState, // Spread existing properties
      location: newLocation, // Update the location
    });
  };

  return (
    <div className="d-flex flex-column mb-3 border border-white">
      <div className="p-2 border border-secondary-subtle">
        <p>Navigation Frame</p>
        <p>Welcome: {gameState.heroName}</p>
      </div>

      {gameState.location === GameState.LOCATION_CITY && (
        <>
          <div className="p-2 border border-secondary-subtle">
            <p>Location: {gameState.location}</p>
            <div className="battle-container">
              <img
                src={`${gameState.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL}`}
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
            <div className="battle-container">
              <img
                src={`${gameState.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL}`}
                alt='hero'
                className='hero-image img-fluid rounded'
                style={{width: '100px', height: '150px'}}
              />
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

/*
  https://indepthjavascript.dev/how-to-create-a-simple-game-loop-in-react-javascripttypescript-in-under-10-lines-of-code
  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
function GameLoop(GameState, setNavBarContext, setAFrameContext, setIFrameContext) {
  let location = GameState.location;

  if (location === null) {
    location = "City";
    GameState.location = location;
  }

  if (location === "Adventure") {
    setAFrameContext(<p>You are on your Adventure</p>)
    /*
    useInterval(() => {
      // Your custom logic here
      setCount(count + 1);
    }, 1000); */
  } else {
    setAFrameContext(<p>You are in the City</p>)
  }
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
