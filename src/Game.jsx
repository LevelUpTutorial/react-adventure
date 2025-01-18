import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";
import StoryDialog from "./components/StoryDialog.jsx"; 
import AttackCooldownWithAnimation from "./AttackCooldownWithAnimation.jsx"; 
import {combatCalculation, playSound, SND_SWORD_HIT, 
        calculateXpToLevelUp, onLevelUp, 
        UPGRADE_PER_LEVELUP, playConfettiFirework, 
        changeLocation, handleResetHeroControl, 
        ID_NONE, ID_FIRE, ID_LIGHTNING, ID_ICE,
        setHeroImages,
        UPGRADE_DAMAGE, UPGRADE_MAX_HEALTH, UPGRADE_CRIT_CHANCE, 
        UPGRADE_CRIT_DAMAGE, UPGRADE_EVADE_CHANCE, UPGRADE_ATTACK_SPEED, 
        DAMAGE_INCREMENT, MAX_HEALTH_INCREMENT, CRIT_CHANCE_INCREMENT, 
        CRIT_DAMAGE_INCREMENT, EVADE_CHANCE_INCREMENT, ATTACK_SPEED_DECREASE, 
       } from "./GameUtils.js";

import PropTypes from "prop-types";

const TICKS_PER_SECOND = 30;
const TICK_DURATION_ADVENTURE = Math.round(1000 / TICKS_PER_SECOND);
const TICK_DURATION_CITY = 1000;

function Game({ heroName, gender, isGameRunning }) {
  // Initialize game state in React state
  const [gameState, setGameState] = useState(
    new GameState(heroName, gender, GameState.LOCATION_ADVENTURE_ACT1)
  );
  
  const [storyEvent, setStoryEvent] = useState(null); // Holds the active story event object ({ title, text, background }).
  const [isStoryDialogOpen, setStoryDialogOpen] = useState(false); // Controls dialog visibility
  
  const [isCounterAttackActive, setCounterAttackActive] = useState(false);
  
  const [upgradeOptions, setUpgradeOptions] = useState([]);
  const [isUpgradePopupVisible, setUpgradePopupVisible] = useState(false);
  const [numChooseUpgrades, setNumChooseUpgrades] = useState(0); 
  
  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive, setNumChooseUpgrades));
  };

  const currentTickDuration =
    gameState.location.name === GameState.LOCATION_CITY.name || gameState.hero.isInDialog
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;

  // Use the game loop hook
  useGameLoop(updateGameState, isGameRunning, currentTickDuration);

  const handleLocationChange = (newLocation) => {
    setGameState((prevState) => {
      return changeLocation(prevState, newLocation); 
    });
  };

  const handleCounterAttack = () => {
    if (!isCounterAttackActive) return;

    setGameState((prevState) => {
      const state = performHeroAttack(prevState); 
      state.attack_combo += 1; 
      // Reset the button state
      setCounterAttackActive(false);

      return { ...state };
    });
  };

  const handleSelectEnchantment = (enchantment_id) => {
      console.log(`handle select ${enchantment_id}`);
      setGameState((prevState) => {
      return selectEnchantment(prevState, enchantment_id); 
    });
  };

const attackTimingWindowStart = 100; 
const attackTimingWindowStop = 225; 
const attackErrorMargin = 20; 
const attackTimingBonus = 2; 
const maxComboMultiplier = 50; 
const comboMultiplier = Math.min(gameState.attack_combo - 1, maxComboMultiplier);
const comboDisplay = gameState.attack_combo > 1 ? `${gameState.attack_combo}x Combo ${comboMultiplier * attackTimingBonus + 100}% Dmg` : `Hero (${gameState.hero.level})`; 
  
const handleActiveAttack = () => {
  const cooldown = gameState.hero.attack_cooldown;

  // Check if attack is within the correct timing window
  const isSuccessfulAttack =
    cooldown >= attackTimingWindowStart - attackErrorMargin &&
    cooldown <= attackTimingWindowStop + attackErrorMargin;

  setGameState((prevState) => {
    const updatedState = { ...prevState };

    if (isSuccessfulAttack) {
      console.log(`Active attack successful @${cooldown}ms`); 
      updatedState.attack_combo += 1; 
      const baseEvade = updatedState.active_enemy.evade_chance; 
      const baseAttack = updatedState.hero.attack;  
      const bonus = baseAttack * attackTimingBonus * comboMultiplier / 100; 
      // grant temporary Bonus for successfully timed activ attack 
      // cant miss 
      updatedState.hero.attack += bonus; 
      updatedState.active_enemy.evade_chance = 0; 
      performHeroAttack(updatedState); 
      updatedState.hero.attack = baseAttack;  
      updatedState.active_enemy.evade_chance = baseEvade; 
      return updatedState;
    } else {
      console.log(`Active attack missed @${cooldown}ms`);
      updatedState.attack_combo = 0; 
      updatedState.hero.last_combat_event = `missed`; 
      updatedState.hero.attack_cooldown = updatedState.hero.attack_speed;
    } 

    return updatedState;
  });
};

  const attackProgress = Math.max(0, Math.min( (gameState.hero.attack_cooldown / gameState.hero.attack_speed * 100), 100));
  const xpProgress = gameState.hero.xp / gameState.hero.xp_to_levelup * 100; 
  
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

  const handleUpgradeChoice = (chosenUpgrade) => {
    chosenUpgrade.effect(gameState.hero); // Apply the effect
    gameState.hero.upgradeCounts[chosenUpgrade.name] += 1; // Increment the count
    setUpgradeOptions([]); // reset options 
    setUpgradePopupVisible(false); // Close popup
    setNumChooseUpgrades(numChooseUpgrades - 1); 
    setGameState({ ...gameState }); // Update the game state
  }; 

  const handleRespecCharacter = () => {
    setGameState((prevState) => { 
      const hero = prevState.hero; 
      let totalPoints = 0; 
      for (let key in hero.upgradeCounts) {
        const count = hero.upgradeCounts[key];
        totalPoints += count; 
        hero.upgradeCounts[key] = 0; 
        // return stats 
        if (key === UPGRADE_DAMAGE) {
          hero.attack -= count * DAMAGE_INCREMENT;
        } else if (key === UPGRADE_MAX_HEALTH) {
          hero.health_full -= count * MAX_HEALTH_INCREMENT;
          hero.health = hero.health_full;
        } else if (key === UPGRADE_CRIT_CHANCE) {
          hero.crit_chance -= count * CRIT_CHANCE_INCREMENT;
        } else if (key === UPGRADE_CRIT_DAMAGE) {
          hero.crit_damage -= count * CRIT_DAMAGE_INCREMENT;
        } else if (key === UPGRADE_EVADE_CHANCE) {
          hero.evade_chance -= count * EVADE_CHANCE_INCREMENT;
        } else if (key === UPGRADE_ATTACK_SPEED) {
          hero.attack_speed += count * ATTACK_SPEED_DECREASE;
          hero.attack_cooldown = hero.attack_speed; 
        }
      }
      // refund points 
      setNumChooseUpgrades(totalPoints);
      return { ...prevState, hero }; 
    });
  };

  const UpgradePopup = ({ upgrades, onChoose }) => {
    return (
        <div className="modal show d-flex align-items-center justify-content-center" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Level Up!</h5>
                    </div>
                    <div className="modal-body">
                        <p>Choose one upgrade ({numChooseUpgrades}/{UPGRADE_PER_LEVELUP})</p>
                        <div className="btn-group-vertical btn-group-lg d-flex flex-column gap-2" role="group" aria-label="buttons for upgrade choices">
                            {upgrades.map((upgrade, index) => (
                                <button
                                    key={index}
                                    onClick={() => onChoose(upgrade)}
                                    className="btn btn-danger btn-lg px-4"
                                >
                                    {upgrade.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

useEffect(() => {
  if (numChooseUpgrades > 0) {
    gameState.hero.isInDialog = true; 
    setGameState({ ...gameState }); 
    onLevelUp(setUpgradeOptions, setUpgradePopupVisible, gameState.hero); 
  } else {
    gameState.hero.isInDialog = false; 
    setGameState({ ...gameState }); 
  }
}, [numChooseUpgrades]);
  
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
              <p>Level: {gameState.hero.level}{gameState.hero.level >= GameState.MAX_LEVEL ? " (max)" : ""}</p>
              <p>Health: {gameState.hero.health}{gameState.hero.upgradeCounts[UPGRADE_MAX_HEALTH] >= GameState.UPGRADE_LIMITS[UPGRADE_MAX_HEALTH] ? " (max)" : ""}</p>
              <p>Attack: {gameState.hero.attack}{gameState.hero.upgradeCounts[UPGRADE_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_DAMAGE] ? " (max)" : ""}</p>
              <p>Attack Cooldown: {gameState.hero.attack_speed / 1000}s{gameState.hero.upgradeCounts[UPGRADE_ATTACK_SPEED] >= GameState.UPGRADE_LIMITS[UPGRADE_ATTACK_SPEED] ? " (max)" : ""}</p>
              <p>Evade Chance: {gameState.hero.evade_chance}%{gameState.hero.upgradeCounts[UPGRADE_EVADE_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_EVADE_CHANCE] ? " (max)" : ""}</p>
              <p>Crit Chance: {gameState.hero.crit_chance}%{gameState.hero.upgradeCounts[UPGRADE_CRIT_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_CHANCE] ? " (max)" : ""}</p>
              <p>Crit Damage: {gameState.hero.crit_damage}%{gameState.hero.upgradeCounts[UPGRADE_CRIT_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_DAMAGE] ? " (max)" : ""}</p>
              <button
                 type="button"
                 className="btn btn-danger"
                 onClick={() => handleRespecCharacter()}
               >
                 Respec Stats
               </button>
            </div>
          </div>
  
          {/* Navigation Buttons */}
          <div className="btn-group-vertical p-3 d-flex flex-wrap gap-2 border-bottom border-secondary-subtle" role="group" aria-label="location change buttons">
            {[...Array(8).keys()].map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => handleLocationChange(GameState[`LOCATION_ADVENTURE_ACT${act + 1}`])}
                className={`btn ${ gameState.acts_progression > act ? "btn-primary" : "btn-outline-secondary"} px-4`} 
                disabled={!(gameState.acts_progression > act)}
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
        <div className="container p-3 border-bottom border-secondary-subtle">
          <p className="fw-bold text-secondary">Location, {gameState.location.name}</p>
          <div className="battle-container d-flex justify-content-around align-items-center gap-1">
            {/* Hero Section */}
            <div 
              className="battle-container-hero text-center d-flex flex-column flex-fill gap-2"
              style={{ width: '50%' }} 
              >
              <p className="fw-semibold text-success">
                {comboDisplay}
              </p>
              <div className="progress">
                <div 
                  className="progress-bar bg-success align-middle" 
                  role="progressbar" 
                  style={{width: `${gameState.hero.health / gameState.hero.health_full * 100}%`, height: '20px' }} 
                  aria-valuenow={gameState.hero.health} aria-valuemin="0" aria-valuemax="100"
                >
                  {`${gameState.hero.health}`}
                </div>
                <div 
                  className="progress-bar progress-bar-striped bg-danger" 
                  role="progressbar" 
                  style={{width: `${(gameState.hero.health_full - gameState.hero.health) / gameState.hero.health_full * 100}%`, height: '20px' }} 
                  aria-valuenow={gameState.hero.health_full - gameState.hero.health} aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
              {renderCombatEvent(gameState.hero.last_combat_event)}
              
              {/* Attack Cooldown Hero */} 
          <AttackCooldownWithAnimation 
            gameState = {gameState} 
            timingWindowStart = {attackTimingWindowStart - attackErrorMargin} 
            timingWindowEnd = {attackTimingWindowStop + attackErrorMargin} 
            tickRate = {currentTickDuration} 
            />
              
              <img
                src={gameState.hero.image}
                alt="hero"
                className="hero-image img-fluid rounded shadow-sm"
                style={{ width: "100px", height: "150px" }}
              />
            </div>

            {/* Enemy Section */}
            <div 
              className="battle-container-enemy text-center d-flex flex-column flex-fill gap-2"
              style={{ width: '50%' }} 
              >
              {gameState.active_enemy && (() => {
                const eAttackProgress = Math.max(0, Math.min( (gameState.active_enemy.attack_cooldown / gameState.active_enemy.attack_speed * 100), 100));

                return (
                  <>
                    <p className="fw-semibold text-danger">
                      {gameState.active_enemy.name} ({gameState.active_enemy.level})
                    </p>
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success align-middle" 
                        role="progressbar" 
                        style={{width: `${gameState.active_enemy.health / gameState.active_enemy.health_full * 100}%`, height: '20px' }} 
                        aria-valuenow={gameState.active_enemy.health} aria-valuemin="0" aria-valuemax="100"
                      >
                        {`${gameState.active_enemy.health}`}
                      </div>
                      <div 
                        className="progress-bar progress-bar-striped bg-danger" 
                        role="progressbar" 
                        style={{width: `${(gameState.active_enemy.health_full - gameState.active_enemy.health) / gameState.active_enemy.health_full * 100}%`, height: '20px' }} 
                        aria-valuenow={gameState.active_enemy.health_full - gameState.active_enemy.health} aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </div>
                    {renderCombatEvent(gameState.active_enemy.last_combat_event)}
                    
                    <div 
                      className="progress-bar bg-primary rounded" 
                      role="progressbar" 
                      style={{ width: `${eAttackProgress}%`, height: "20px" }} 
                      aria-valuenow={eAttackProgress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {`${(gameState.active_enemy.attack_cooldown / 1000).toFixed(1)}s`}
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
        <div className="p-3 text-center d-flex flex-column gap-2">
          {/* XP Progress Bar */}
          <div className="progress">
            <div 
              className="progress-bar bg-info mb-3 align-middle" 
              role="progressbar" 
              style={{ width: `${xpProgress}%`, height: '20px' }} 
              aria-valuenow={xpProgress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {`${gameState.hero.xp} / ${gameState.hero.xp_to_levelup} exp`}
            </div>
          </div> 
          {/* control panel */}
          <div className="container mt-4">
            <div className="row">
              {/* Left column with 3 dropdowns */}
              <div className="col-6 d-flex flex-column gap-2">
                  {/* enchantment selection */}
                  <label for="select-enchantment">Enchantment:</label>
                  <div class="dropdown" id="select-enchantment">
                    <button class="btn btn-success dropdown-toggle" type="button" id="enchantmentDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      {`${gameState.hero.current_enchantment.id}`}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="enchantmentDropdown">
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(noneId)}>None</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(fireId)}>Fire</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(iceId)}>Ice</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(lightningId)}>Lightning</a></li>
                    </ul>
                 </div>
                 {/* Dropdown 2 */}
                 <label for="select-skill-1">Skills:</label>
                 <div className="dropdown" id="select-skill-1">
                 <button
                   className="btn btn-success dropdown-toggle"
                   type="button"
                   id="dropdown2"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                   disabled={true} 
                 >
                   Skills (soon)
                 </button>
                 <ul className="dropdown-menu" aria-labelledby="dropdown2">
                   <li><a className="dropdown-item" href="#">Option 1</a></li>
                   <li><a className="dropdown-item" href="#">Option 2</a></li>
                   <li><a className="dropdown-item" href="#">Option 3</a></li>
                 </ul>
                 </div>
               {/* Dropdown 3 */}
               <div className="dropdown">
                 <button
                   className="btn btn-success dropdown-toggle"
                   type="button"
                   id="dropdown3"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                   disabled={true}
                 >
                   Skills (soon)
                 </button>
                 <ul className="dropdown-menu" aria-labelledby="dropdown3">
                   <li><a className="dropdown-item" href="#">Option 1</a></li>
                   <li><a className="dropdown-item" href="#">Option 2</a></li>
                   <li><a className="dropdown-item" href="#">Option 3</a></li>
                 </ul>
             </div>
           </div>
           {/* Right column with 3 buttons */}
           <div className="col-6 d-flex flex-column gap-2">
               {/* Button 1 */}
               <button
                 type="button"
                 className="btn btn-danger"
                 onClick={() => handleActiveAttack()}
               >
                 Attack
               </button>
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
          </div>
        </div>
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
      {/* Level Up Popup */}
      {isUpgradePopupVisible && (
        <UpgradePopup
          upgrades={upgradeOptions}
          onChoose={handleUpgradeChoice}
        />
      )}
    </div>
  );
}

/* trigger attack animation */
function triggerAttackAnimation(attacker, hit, duration) {
  const attackerImage = document.querySelector(attacker);
  const hitImage = document.querySelector(hit);

  if (attackerImage && hitImage) {
    attackerImage.style.animation = 'attack 0.5s ease-in-out';
    hitImage.style.animation = 'hit 0.5s ease-in-out';

    // Remove the animation classes after the animation ends
    setTimeout(() => {
      attackerImage.style.animation = '';
      hitImage.style.animation = '';
    }, duration); // Duration of the animation
  }
}
const heroImage = '.hero-image';
const enemyImage = '.enemy-image';
function triggerHeroAttackAnimation(duration) {
  triggerAttackAnimation(heroImage, enemyImage, duration); 
}
function triggerEnemyAttackAnimation(duration) {
  triggerAttackAnimation(enemyImage, heroImage, duration); 
}

/* Constants for Effects */ 
const onHitEffectsHero = [];
const onCombatStartEffects = [];
const onHitEffectsEnemy = [];
/* Main Function to handle all In-game Event Logic */
function handleGameState(gameState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive, setNumChooseUpgrades) {
  const location = gameState.location;
  let {hero, active_enemy} = gameState;
  console.log(`handleGameState (start): Hero XP -> ${hero.xp}`);
  if (active_enemy) {
    console.log(`handleGameState: Enemy -> ${active_enemy.name}`);
    // console.log(`handleGameState: Enemy Atk Sp -> ${active_enemy.attack_speed}`);
    // console.log(`handleGameState: Enemy Atk Cd -> ${active_enemy.attack_cooldown}`);
  }
  console.log(`handleGameState: isInCombat -> ${hero.isInCombat}`);
  console.log(`handleGameState: isInDialog -> ${hero.isInDialog}`);
  if (hero.isInDialog) {
    return gameState; 
  } 
  
  // handle Combat
  if (hero.isInCombat) {
    // console.log('hero is in combat');
    hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_COMBAT : GameState.IMG_HERO_FEMALE_COMBAT);
    if (hero.attack_cooldown <= 0) {
      /* try disable Auto combat */
      //gameState = performHeroAttack(gameState); 
      //({ hero, active_enemy } = gameState); 
      hero.attack_cooldown = hero.attack_speed;
      hero.last_combat_event = 'missed'; 
      gameState.attack_combo = 0; 
    } else {
      hero.attack_cooldown -= TICK_DURATION_ADVENTURE;
    }
    console.log(`${active_enemy.name} HP: ${active_enemy.health}`); 
    hero.isInCombat = active_enemy.health > 0;
    console.log(`handleGameState (before combat): Hero XP -> ${hero.xp}`);
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
      // execute enemy after function if he had one 
      if (active_enemy.runAfter) {
        active_enemy.runAfter(gameState); 
      }
      // check for lvl up
      if (hero.xp + active_enemy.xp_reward >= hero.xp_to_levelup) {
        if (hero.level < GameState.MAX_LEVEL) {
          hero.level += 1; 
          hero.xp = hero.xp + active_enemy.xp_reward - hero.xp_to_levelup; 
          hero.xp_to_levelup = calculateXpToLevelUp(hero.level); 
          // trigger level up popup
          setNumChooseUpgrades(UPGRADE_PER_LEVELUP);
          playConfettiFirework(); 
          gameState.hero = hero; 
          setHeroImages(gameState); 
        } else {
          hero.xp = hero.xp_to_levelup; // Cap XP at max level
        }
      } else { 
        hero.xp += active_enemy.xp_reward;
        gameState.hero = hero;
      }
      // Hero reset 
      gameState = handleResetHeroControl({ ...gameState, hero}); 
      hero = gameState.hero; 
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);
      setCounterAttackActive(false); // Disable button on victory
    }

    // console.log(`handleGameState: Hero HP -> ${hero.health}`);
    console.log(`handleGameState (after combat): Hero XP -> ${hero.xp}`);
    gameState = { ...gameState, hero, active_enemy}; 
    return (hero.health > 0 ? gameState : changeLocation(gameState, GameState.LOCATION_CITY));
  }

  // handle Adventure outside of Combat
  if (!hero.isInDialog && location.name !== GameState.LOCATION_CITY.name) {
    // handle roll new encounter
    console.log(`handleGameState (before new encounter): Hero XP -> ${hero.xp}`);
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
      // create active enemy as copy from template 
      gameState.active_enemy = {...encounter.enemy, health_full: encounter.enemy.health, last_combat_event: ""};
      /* apply effects at the start of combat */ 
      applyEffects(onCombatStartEffects, gameState); 
    } else if (encounter.category === 'story') {
      gameState = handleResetHeroControl(gameState);
      hero = gameState.hero;
      hero.isInDialog = true;
      hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);

      setStoryEvent(encounter.dialog); // Set the story event
      setStoryDialogOpen(true); // Open the dialog
    } else {
      console.error(`ERROR: Unknown encounter type category ${encounter.category}`);
    }

    console.log(`handleGameState(after encounter roll): Hero XP -> ${hero.xp}`);
    return { ...gameState, hero };
  }

  if (location.name === GameState.LOCATION_CITY.name) {
    return changeLocation(gameState, GameState.LOCATION_CITY);
  }

  // return gameState unchanged
  // console.log('return gameState unchanged')
  // console.log(`handleGameState (return unchanged): Hero XP -> ${hero.xp}`);
  return gameState;
}

/* performs hero attack */ 
function performHeroAttack(gameState) {
  const {hero, active_enemy} = gameState;
  const dmg = combatCalculation(hero, active_enemy); 

  if (dmg >= 0) {
    /* apply on hit effects */ 
    applyEffects(onHitEffectsHero, gameState); 
    /* apply damage */ 
    if (dmg > hero.attack) {
      hero.last_combat_event = `crit ${dmg}`;
    } else {
      hero.last_combat_event = `dealt ${dmg}`; 
    }
    active_enemy.health -= dmg;
    playSound(SND_SWORD_HIT);
    triggerHeroAttackAnimation(500);
  } else {
    hero.last_combat_event = `missed`;
  }
    
  hero.attack_cooldown = hero.attack_speed;
  return gameState; 
}
/* performs enemy attack */ 
function performEnemyAttack(gameState, setCounterAttackActive) {
  const {hero, active_enemy} = gameState;
  const dmg = combatCalculation(active_enemy, hero); 
  // evade ?
  if (dmg < 0) {
    // console.log('Attack evaded!');
    active_enemy.last_combat_event = `missed`;
    setCounterAttackActive(true); // Enable Counter Attack button
  } else {
    /* apply on hit effects */ 
    applyEffects(onHitEffectsEnemy, gameState); 
    /* apply damage */
    if (dmg > active_enemy.attack) {
      active_enemy.last_combat_event = `crit ${dmg}`;
    } else {
      active_enemy.last_combat_event = `dealt ${dmg}`; 
    }
    hero.health -= dmg; // No evade, apply damage
    triggerEnemyAttackAnimation(500);
    setCounterAttackActive(false); // Disable Counter Attack button
  }
  active_enemy.attack_cooldown = active_enemy.attack_speed;

  return gameState;
}

/**
 * Functions for Enchantment and Skill Effects 
 */ 
/* Fire Enchantment */ 
const fireCC = 20; 
const fireCD = 50; 
const fireId = ID_FIRE; 
function fireEffectSelectApply(gameState) {
  console.log(`apply fire select`);
  gameState.hero.crit_chance += fireCC;
  gameState.hero.crit_damage += fireCD;
  return gameState; 
}
function fireEffectSelectReverse(gameState) {
  console.log(`revert fire select`);
  gameState.hero.crit_chance -= fireCC;
  gameState.hero.crit_damage -= fireCD;
  return gameState; 
}
/* Ice Enchantment */ 
const iceEC = 20;
const iceSlow = 200; 
const iceId = ID_ICE; 
function iceEffectSelectApply(gameState) {
  console.log(`apply ice select`);
  gameState.hero.evade_chance += iceEC; 
  addEffect(onHitEffectsHero, iceId, iceEffectOnHitApply, iceEffectOnHitReverse);
  return gameState;
}
function iceEffectSelectReverse(gameState) {
  console.log(`revert ice select`);
  gameState.hero.evade_chance -= iceEC;
  removeEffect(onHitEffectsHero, iceId); 
  // TODO remove onhit counter from enemy 
  return gameState;
}
// TODO currently on hit effect stacks infinitly 
function iceEffectOnHitApply(gameState) {
  console.log(`apply ice on hit`);
  const active_enemy = gameState.active_enemy; 
  if (active_enemy) {
    active_enemy.attack_speed += iceSlow; 
    active_enemy.attack_cooldown += iceSlow; 
  }
  return gameState; 
}
// TODO reverse can not be used yet, because enemy doesnt remember number of stacks 
function iceEffectOnHitReverse(gameState) {
  console.log(`revert ice on hit`);
  const active_enemy = gameState.active_enemy; 
  if (active_enemy) {
    active_enemy.attack_speed -= iceSlow; 
    // attack cooldown is not reverted because enemy remains temporarily slowed 
  }
  return gameState; 
}
/* Lightning Enchantment */ 
const lightningAS = 200; 
const lightningStunChance = 20; 
const lightningId = ID_LIGHTNING; 
function lightningEffectSelectApply(gameState) {
  console.log(`apply lightning select`);
  gameState.hero.attack_speed -= lightningAS; 
  addEffect(onHitEffectsHero, lightningId, lightningEffectOnHitApply, lightningEffectOnHitReverse);
  return gameState;
}
function lightningEffectSelectReverse(gameState) {
  console.log(`revert lightning select`);
  gameState.hero.attack_speed += lightningAS; 
  removeEffect(onHitEffectsHero, lightningId);
  return gameState; 
}
function lightningEffectOnHitApply(gameState) {
  console.log(`apply lightning on hit`);
  const roll = () => Math.random() * 100;
  if (roll() < lightningStunChance) {
    // stun successful 
    gameState.active_enemy.attack_cooldown = gameState.active_enemy.attack_speed; 
  }
  return gameState; 
}
function lightningEffectOnHitReverse(gameState) {
  // nothing to do 
  console.log(`revert lightning on hit (nothing to do)`);
  return gameState; 
}
/* 
 * Select Enchantment Helper 
 */ 
const noneId = ID_NONE; 
function selectEnchantment(gameState, enchantment_id) {
  console.log(`selected enchantment ${enchantment_id}`);
  const hero = gameState.hero;  
  /* remove from lists if exists */
  const prevEnchantment = hero.current_enchantment; 
  console.log(`previous enchantment was ${prevEnchantment.id}`);
  prevEnchantment.selectReverse(gameState); 
  /* add new Enchantment to lists */ 
  if (enchantment_id === fireId) {
    fireEffectSelectApply(gameState); 
    hero.current_enchantment = { id: fireId, selectReverse: fireEffectSelectReverse }; 
  } else if (enchantment_id === iceId) {
    iceEffectSelectApply(gameState); 
    hero.current_enchantment = { id: iceId, selectReverse: iceEffectSelectReverse }; 
  } else if (enchantment_id === lightningId) {
    lightningEffectSelectApply(gameState); 
    hero.current_enchantment = { id: lightningId, selectReverse: lightningEffectSelectReverse };
  } else if (enchantment_id === noneId) {
    hero.current_enchantment = { id: noneId, selectReverse: (gameState) => {return gameState} };
  } else {
    console.error(`unknown enchantment selected ${enchantment_id}`);
  }
  console.log(`new enchantment hero ${gameState.hero.current_enchantment}`);
  setHeroImages(gameState); 
  return { ...gameState, hero }; 
}
/* 
 * Effect List Helper 
 */ 
function addEffect(effectList, id, applyFunction, reverseFunction) {
  console.log(`add effect to ${effectList} => ${id}`);
  effectList.push({ id, applyFunction, reverseFunction });
}
function removeEffect(effectList, id) {
  const index = effectList.findIndex(effect => effect.id === id);
  if (index !== -1) {
    effectList.splice(index, 1);
  }
}
function applyEffects(effectList, gameState) {
  console.log(`apply effects ${effectList}`);
  effectList.forEach(effect => effect.applyFunction(gameState));
}
function reverseEffects(effectList, gameState) {
  effectList.forEach(effect => effect.reverseFunction(gameState));
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
  // console.log(`getRandomItem: ${entries}`)
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
