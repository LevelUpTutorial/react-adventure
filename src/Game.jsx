import {useEffect, useRef, useState} from "react";
import GameState from "./GameState.js";
import StoryDialog from "./components/StoryDialog.jsx"; 
import ListHeroStats from "./components/ListHeroStats.jsx";
import AttackCooldownWithAnimation from "./AttackCooldownWithAnimation.jsx"; 
import LootPopup from "./components/LootPopup.jsx";
import CharacterInventoryDialog from "./components/CharacterInventoryDialog.jsx";
import PlaytimeDisplay from "./components/PlaytimeDisplay.jsx";
import {combatCalculation, playSound, SND_SWORD_HIT, 
        calculateXpToLevelUp, onLevelUp, 
        UPGRADE_PER_LEVELUP, playConfettiFirework, 
        changeLocation, updateLocation, handleResetHeroControl, 
        ID_NONE, ID_FIRE, ID_LIGHTNING, ID_ICE,
        setHeroImages,
        UPGRADE_DAMAGE, UPGRADE_MAX_HEALTH, UPGRADE_CRIT_CHANCE, 
        UPGRADE_CRIT_DAMAGE, UPGRADE_EVADE_CHANCE, UPGRADE_ATTACK_SPEED, 
        DAMAGE_INCREMENT, MAX_HEALTH_INCREMENT, CRIT_CHANCE_INCREMENT, 
        CRIT_DAMAGE_INCREMENT, EVADE_CHANCE_INCREMENT, ATTACK_SPEED_DECREASE, 
        saveGameState, createActiveEnemy, getEnemyLoot, getItemImage, 
        getHeroImages, 
       } from "./GameUtils.js";

import PropTypes from "prop-types";

const TICKS_PER_SECOND = 30;
const TICK_DURATION_ADVENTURE = Math.round(1000 / TICKS_PER_SECOND);
const TICK_DURATION_CITY = 1000;

function Game({ heroName, gender, isGameRunning, savedGameState }) {
  // Helper function to validate the saved game state
  const initializeGameState = (savedState) => {
    console.log("initializeGameState savedState ${savedState}");
    if (savedState) {
      // Update location to sync location and background 
      updateLocation(savedState, GameState.LOCATION_CITY);
      // restore enchantment 
      const encId = savedState.hero.current_enchantment;
      savedState = selectEnchantment(savedState, ID_NONE);
      savedState = selectEnchantment(savedState, encId);
      // Use the valid saved game state
      return savedState; 
    }
    // Fallback to a new GameState if savedState is invalid
    return new GameState(heroName, gender, GameState.LOCATION_ADVENTURE_ACT1);
  };

  // Initialize game state in React state 
  // either new gamestate or loaded savegame 
  const [gameState, setGameState] = useState(() => initializeGameState(savedGameState));
  
  const [storyEvent, setStoryEvent] = useState(null); // Holds the active story event object ({ title, text, background }).
  const [isStoryDialogOpen, setStoryDialogOpen] = useState(false); // Controls dialog visibility
  
  const [isCounterAttackActive, setCounterAttackActive] = useState(false);
  
  const [upgradeOptions, setUpgradeOptions] = useState([]);
  const [isUpgradePopupVisible, setUpgradePopupVisible] = useState(false);
  const [numChooseUpgrades, setNumChooseUpgrades] = useState(0); 

  const [showLootPopup, setShowLootPopup] = useState(false); 
  const [newItem, setNewItem] = useState(null); 
 
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if dropdown is open
  
  const updateGameState = () => {
    setGameState((prevState) => handleGameState(prevState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive, setNumChooseUpgrades, setNewItem));
  };

  const currentTickDuration =
    gameState.location.name === GameState.LOCATION_CITY.name || gameState.hero.isInDialog
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;

  // Use the game loop hook
  useGameLoop(updateGameState, isGameRunning, currentTickDuration);

  const handleLocationChange = (newLocation) => {
    setGameState((prevState) => {
      return changeLocation(prevState, newLocation, setCounterAttackActive); 
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

const attackTimingWindowStart = 50; 
const attackTimingWindowStop = 200; 
const attackErrorMargin = 25; 
const attackTimingBonus = 2; 
const maxComboMultiplier = 150; 
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
  const heroHPCramped = Math.ceil(Math.max(0, gameState.hero.health));
  
  const renderCombatEvent = (text) => {
    let style;

    if (text?.startsWith("crit")) {
      style = { fontWeight: "bold", color: "orange", padding: "5px" }; // critical hits
    } else if (text?.startsWith("dealt")) {
      style = { fontWeight: "bold", color: "black", padding: "5px" }; // normal damage
    } else if (text?.startsWith("missed")) {
      style = { fontWeight: "bold", color: "gray", padding: "5px" }; // missed attacks
    } else if (text?.startsWith("stunned")) {
      style = { fontWeight: "bold", color: "#0dcaf0", padding: "5px" }; // same color as bootstrap info consistent used for ice element 
    } else {
      style = { fontWeight: "bold", color: "black", padding: "5px" }; // default
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

  /* depricated, New feature in Inventory dialog 
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
  }; depricated */
  
  const UpgradePopup = ({ hero, upgrades, onChoose }) => {
    return (
      <div className="modal show d-flex align-items-center justify-content-center" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Level Up!</h5>
            </div>
            <div className="modal-body">
              <p>Choose one upgrade ({numChooseUpgrades}/{UPGRADE_PER_LEVELUP})</p>
              {/*<div className="row">
                <div className="col-6">
                  <ListHeroStats 
                    gameState={gameState}
                    showButtons={false}
                    />
                </div>*/}
                <div className="btn-group-vertical d-flex flex-column gap-1" role="group" aria-label="buttons for upgrade choices">
                  {upgrades.map((upgrade, index) => (
                    <button
                      key={index}
                      onClick={() => onChoose(upgrade)}
                      className="btn btn-danger btn-lg px-1"
                    >
                      {upgrade.name}
                    </button>
                  ))}
                </div>
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }; 

// Handle equipping the new item
const equipNewItem = () => {
  setGameState((prev) => {
    const hero = prev.hero;
    // Rundung wg. Floating-Point-Arithmetik Error of Javascript
    const decimalPlaces = 100; 
    if (newItem.itemType === 'Armor') { 
      hero.damage_reduction = Math.round((hero.damage_reduction - hero.armor.itemStats.damage_reduction + newItem.itemStats.damage_reduction) * decimalPlaces) / decimalPlaces; 
      hero.armor = newItem; 
    } else if (newItem.itemType === 'Helm') {
      hero.damage_reduction = Math.round((hero.damage_reduction - hero.helm.itemStats.damage_reduction + newItem.itemStats.damage_reduction) * decimalPlaces) / decimalPlaces; 
      hero.helm = newItem; 
    } if (newItem.itemType === 'Boots') {
      hero.evade_chance = Math.round((hero.evade_chance - hero.boots.itemStats.evade_chance + newItem.itemStats.evade_chance) * decimalPlaces) / decimalPlaces; 
      hero.boots = newItem; 
    } else if (newItem.itemType === 'Amulet') { 
      hero.damage_reduction = Math.round((hero.damage_reduction - hero.amulet.itemStats.damage_reduction + newItem.itemStats.damage_reduction) * decimalPlaces) / decimalPlaces; 
      hero.bonus_damage = Math.round((hero.bonus_damage - hero.amulet.itemStats.bonus_damage + newItem.itemStats.bonus_damage) * decimalPlaces) / decimalPlaces; 
      hero.amulet = newItem; 
    } else if (newItem.itemType === 'Ring') { 
      hero.crit_chance = Math.round((hero.crit_chance - hero.ring.itemStats.crit_chance + newItem.itemStats.crit_chance) * decimalPlaces) / decimalPlaces; 
      hero.crit_damage = Math.round((hero.crit_damage - hero.ring.itemStats.crit_damage + newItem.itemStats.crit_damage) * decimalPlaces) / decimalPlaces; 
      hero.ring = newItem; 
    } else if (newItem.itemType === 'Sword') { 
      hero.attack = Math.round((hero.attack - hero.sword.itemStats.attack + newItem.itemStats.attack) * decimalPlaces) / decimalPlaces; 
      hero.bonus_damage = Math.round((hero.bonus_damage - hero.sword.itemStats.bonus_damage + newItem.itemStats.bonus_damage) * decimalPlaces) / decimalPlaces; 
      // for attack speed negative Bonus is good 
      hero.attack_speed = Math.round((hero.attack_speed + hero.sword.itemStats.attack_speed - newItem.itemStats.attack_speed) * decimalPlaces) / decimalPlaces; 
      hero.attack_cooldown = hero.attack_speed; 
      hero.sword = newItem; 
    } else {
      console.error(`unknown item type ${newItem.itemType}`);
    }
      
    return {...prev, hero}; 
  } );

  setHeroImages(gameState); 
  setShowLootPopup(false);
  setNewItem(null);
  // save game 
  saveGameState(gameState);
};

// Handle keeping the old item
const keepOldItem = () => {
  setShowLootPopup(false);
  setNewItem(null);
};

const handleCharacterInventoryClose = () => {
  setInventoryOpen(false);
  // save game 
  saveGameState(gameState);
}

/* Logic to prioritosing and queing conflicting Popup Dialogs */
useEffect(() => {
  if (numChooseUpgrades > 0) {
    gameState.hero.isInDialog = true; 
    setGameState({ ...gameState }); 
    onLevelUp(setUpgradeOptions, setUpgradePopupVisible, gameState.hero); 
  } else if (newItem) {
    setShowLootPopup(true);
    gameState.hero.isInDialog = true; 
    setGameState({ ...gameState });
  } else {
    gameState.hero.isInDialog = false; 
    setGameState({ ...gameState }); 
  }
}, [numChooseUpgrades, newItem]);

/* logic to Pause the game loop 
  when the select enchantment Element 
  is open  
*/
const dropdownRef = useRef(null); // Create a ref for the dropdown button
const pauseGame = () => {
  console.log("Game paused");
  gameState.hero.isInDialog = true;
  setGameState({...gameState});
};
const resumeGame = () => {
  console.log("Game resumed");
  gameState.hero.isInDialog = false;
  setGameState({...gameState});
};
useEffect(() => {
    const dropdownElement = dropdownRef.current; // Get the dropdown button element
    if (!dropdownElement) return; // Prevent errors if element is not found
    // Pause the game when the dropdown is opened
    const handleDropdownShow = () => {
      setIsDropdownOpen(true);
      pauseGame(); // Function to pause the game flow
    };
    // Resume the game when the dropdown is closed
    const handleDropdownHide = () => {
      setIsDropdownOpen(false);
      resumeGame(); // Function to resume the game flow
    };
    // Attach Bootstrap dropdown events
    dropdownElement.addEventListener("show.bs.dropdown", handleDropdownShow);
    dropdownElement.addEventListener("hide.bs.dropdown", handleDropdownHide);
    // Cleanup event listeners
    return () => {
      dropdownElement.removeEventListener("show.bs.dropdown", handleDropdownShow);
      dropdownElement.removeEventListener("hide.bs.dropdown", handleDropdownHide);
    };
  }, [pauseGame, resumeGame]);
  
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
            <div className="row">

              <div className="col-6 d-flex justify-content-evenly">
              <img
                src={gameState.hero.image}
                alt="hero"
                className="hero-image img-fluid rounded shadow-sm"
                style={{ width: "100px", height: "150px" }}
              />
              </div>
              <div className="col-6 d-flex flex-column justify-content-evenly">
                {/*
                <button
                 type="button"
                 className="btn btn-danger"
                 onClick={() => handleRespecCharacter()}
               >
                 Respec Stats
               </button>*/}
               {/* Inventory Button */}
               <button className="btn btn-danger" onClick={() => setInventoryOpen(true)}>
                 Stats & Inventory 
               </button>
               </div>
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
          <PlaytimeDisplay playtime={gameState.playtime} /> 
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
              style={{ width: '50%', position: 'relative' }} 
              >
              <p className="fw-semibold text-success">
                {comboDisplay}
              </p>
              <div className="progress position-relative" style={{ height: '20px' }}>
                {/* Text Overlay */}
                <div 
                  className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{ top: 0, left: 0, color: "white", fontWeight: "bold", zIndex: 2 }}
                >
                  {`${heroHPCramped}`}
                </div>
                <div 
                  className="progress-bar bg-success align-middle" 
                  role="progressbar" 
                  style={{width: `${heroHPCramped / gameState.hero.health_full * 100}%`, height: '20px' }} 
                  aria-valuenow={heroHPCramped} aria-valuemin="0" aria-valuemax="100"
                >
                </div>
                <div 
                  className="progress-bar progress-bar-striped bg-danger" 
                  role="progressbar" 
                  style={{width: `${(gameState.hero.health_full - heroHPCramped) / gameState.hero.health_full * 100}%`, height: '20px' }} 
                  aria-valuenow={gameState.hero.health_full - heroHPCramped} aria-valuemin="0" aria-valuemax="100">
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
              style={{ width: '50%', position: 'relative' }} 
              >
              {gameState.active_enemy && (() => {
                const eAttackProgress = Math.max(0, Math.min( (gameState.active_enemy.attack_cooldown / (gameState.active_enemy.attack_speed + gameState.active_enemy.status.slowed) * 100), 100));
                const enemyHPCramped = Math.max(0, Math.ceil(gameState.active_enemy.health));
                
                return (
                  <>
                    <p className="fw-semibold text-danger">
                      {gameState.active_enemy.name} ({gameState.active_enemy.status.slowed > 0 ? "slowed" : gameState.active_enemy.level}) 
                    </p>
                    <div className="progress position-relative" style={{ height: '20px' }}>
                      {/* Text Overlay */}
                      <div 
                        className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ top: 0, left: 0, color: "white", fontWeight: "bold", zIndex: 2 }}
                      >
                        {`${enemyHPCramped}`}
                      </div>
                      <div 
                        className="progress-bar bg-success align-middle" 
                        role="progressbar" 
                        style={{width: `${enemyHPCramped / gameState.active_enemy.health_full * 100}%`, height: '20px' }} 
                        aria-valuenow={enemyHPCramped} aria-valuemin="0" aria-valuemax="100"
                      >
                      </div>
                      <div 
                        className="progress-bar progress-bar-striped bg-danger" 
                        role="progressbar" 
                        style={{width: `${(gameState.active_enemy.health_full - enemyHPCramped) / gameState.active_enemy.health_full * 100}%`, height: '20px' }} 
                        aria-valuenow={gameState.active_enemy.health_full - enemyHPCramped} aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </div>
                    {renderCombatEvent(gameState.active_enemy.last_combat_event)}
                    <div className="position-relative" style={{ height: '25px' }}>
                      {/* Text Overlay */}
                      <div 
                        className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ top: 0, left: 0, color: "black", fontWeight: "bold", zIndex: 2 }}
                      >
                        {`${Math.max(0, gameState.active_enemy.attack_cooldown / 1000).toFixed(1)}s`}
                      </div>
                      <div 
                        className="progress-bar bg-primary rounded" 
                        role="progressbar" 
                        style={{ width: `${eAttackProgress}%`, height: "25px" }} 
                        aria-valuenow={eAttackProgress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                    </div>
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
          <div className="progress position-relative" style={{ height: '20px' }}>
            {/* Text Overlay */}
            <div 
              className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ top: 0, left: 0, color: "white", fontWeight: "bold", zIndex: 2 }}
            >
              {`${Math.floor(gameState.hero.xp)} / ${Math.ceil(gameState.hero.xp_to_levelup)} exp`}
            </div>
            <div 
              className="progress-bar bg-info mb-3 align-middle" 
              role="progressbar" 
              style={{ width: `${xpProgress}%`, height: '20px' }} 
              aria-valuenow={xpProgress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
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
                    <button 
                      ref={dropdownRef} // Attach the ref to this button
                      class="btn btn-success dropdown-toggle" 
                      type="button" id="enchantmentDropdown" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false">
                      {`${gameState.hero.current_enchantment}`}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="enchantmentDropdown">
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(noneId)}>{isDropdownOpen ? `None` : "None"}</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(fireId)}>{isDropdownOpen ? `Fire: +${fireCD}% Crit Damage, reflect ${fireReflect}% Damage` : "Fire"}</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(iceId)}>{isDropdownOpen ? `Ice: +${iceEC}% Evade Chance, slows Enemies` : "Ice"}</a></li>
                      <li><a class="dropdown-item" href="#" onClick={() => handleSelectEnchantment(lightningId)}>{isDropdownOpen ? `Lightning: -${lightningAS / 1000}s Cooldown, ${lightningStunChance}% Chance to stun` : "Lightning"}</a></li>
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
            GameState.onCloseStory(gameState, storyEvent.onCloseKey);
            setStoryDialogOpen(false);
            setStoryEvent(null);
            setGameState(handleResetHeroControl(gameState));
          }}
        />
      )}
      {/* Level Up Popup */}
      {isUpgradePopupVisible && (
        <UpgradePopup
          hero={gameState.hero}
          upgrades={upgradeOptions}
          onChoose={handleUpgradeChoice}
        />
      )}
      {/* Loot Popup Component */}
      <LootPopup
        show={showLootPopup}
        gameState={gameState}
        newItem={newItem}
        onEquip={equipNewItem}
        onKeep={keepOldItem}
      />
      {/* Inventory Popup Component */}
      <CharacterInventoryDialog
        show={isInventoryOpen}
        gameState={gameState}
        onClose={handleCharacterInventoryClose} // Pass onClose function
        setGameState={setGameState} 
      />
    </div>
  );
}

const battleAnimationDuration = 300; 
const critAnimationDuration = 400; 
const heroImage = '.hero-image';
const enemyImage = '.enemy-image';

/* Animation Priority Constants */
const ANIMATION_PRIORITY = {
  enemyDeath: 4,
  attack: 2,
  criticalAttack: 3,
  hit: 1,
  criticalHit: 1,
};

/* Add and Remove Animation Classes */
function addAnimationClass(element, className, duration) {
  element.style.setProperty('--animation-duration', `${duration}ms`);
  element.classList.add(className);
  console.log(`addAnimation adding classname ${element} ${className} ${duration}`);
  console.log(`addAnimation ${[...element.classList]}`);
  setTimeout(() => {
    element.classList.remove(className);
    element.style.removeProperty('--animation-duration'); // Cleanup
  }, duration);
}

/* Helper Function to Remove Animation Classes */
function removeAnimationClasses(element, classes) {
  classes.forEach((className) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
}

/* Trigger Attack Animation */
function triggerAttackAnimation(gameState, attacker, hit, duration, isCritical = false) {
  const attackerImage = document.querySelector(attacker);
  const hitImage = document.querySelector(hit);

  if (attackerImage && hitImage) {
    const attackerState = attacker === heroImage ? gameState.hero : gameState.active_enemy;
    const hitState = attacker === heroImage ? gameState.active_enemy : gameState.hero;

    const attackAnimation = isCritical ? 'critical-attack' : 'attack';
    const hitAnimation = isCritical ? 'critical-hit' : 'hit';
    const impactAnimation = isCritical ? 'critical-impact' : 'impact';

    // Set direction for attacker
    const direction = attacker === heroImage ? 1 : -1;
    attackerImage.style.setProperty('--attack-direction', direction);

    // Handle Attacker Animation (Always Play Attack)
    if (!attackerState.current_animation || // If no animation is running
        attackerState.current_animation.priority <= ANIMATION_PRIORITY[attackAnimation] // Or if priority allows
      ) {
        attackerState.current_animation = { name: attackAnimation, priority: ANIMATION_PRIORITY[attackAnimation] };

        // Remove conflicting hit animations from the attacker
        removeAnimationClasses(attackerImage, ['hit', 'critical-hit']);

        // Add the attack animation class
        addAnimationClass(attackerImage, attackAnimation, duration);

        // Reset animation state after completion
        setTimeout(() => {
          attackerState.current_animation = null;
        }, duration);
      }

    // Handle Hit Animation (Apply Only if Not Attacking)
    if (
      (!hitState.current_animation || hitState.current_animation.priority < ANIMATION_PRIORITY.attack) &&
      !hitImage.classList.contains('attack') &&
      !hitImage.classList.contains('critical-attack')
    ) {
      hitState.current_animation = { name: hitAnimation, priority: ANIMATION_PRIORITY[hitAnimation] };

      // Remove conflicting hit animations
      removeAnimationClasses(hitImage, ['hit', 'critical-hit']);

      // Add the hit animation class
      addAnimationClass(hitImage, hitAnimation, duration);

      // Reset animation state after completion
      setTimeout(() => {
        hitState.current_animation = null;
      }, duration);
    }

    // Handle Impact Effect
    const impactEffect = document.createElement('div');
    impactEffect.className = impactAnimation;

    const parent = hitImage.parentNode;
    const hitRect = hitImage.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    impactEffect.style.position = 'absolute';
    impactEffect.style.left = `${hitRect.left - parentRect.left + hitRect.width / 2}px`;
    impactEffect.style.top = `${hitRect.top - parentRect.top + hitRect.height / 2}px`;
    impactEffect.style.transform = 'translate(-50%, -50%)';
    impactEffect.style.animation = `${impactAnimation} ${duration}ms ease-in-out`;

    parent.appendChild(impactEffect);

    // Cleanup the impact effect
    setTimeout(() => {
      if (impactEffect.parentNode) {
        impactEffect.parentNode.removeChild(impactEffect);
      }
    }, duration);
  }
}

/* Trigger Hero and Enemy Animations */
function triggerHeroAttackAnimation(gameState, duration, isCritical) {
  triggerAttackAnimation(gameState, heroImage, enemyImage, duration, isCritical); 
}

function triggerEnemyAttackAnimation(gameState, duration, isCritical) {
  triggerAttackAnimation(gameState, enemyImage, heroImage, duration, isCritical); 
}

/* Constants for Effects */ 
const onHitEffectsHero = [];
const onCombatStartEffects = [];
const onHitEffectsEnemy = [];
/* Main Function to handle all In-game Event Logic */
function handleGameState(gameState, setStoryEvent, setStoryDialogOpen, setCounterAttackActive, setNumChooseUpgrades, setNewItem) {
  const location = gameState.location;
  // count playtime 
  const currentTickDuration =
    location.name === GameState.LOCATION_CITY.name || gameState.hero.isInDialog
      ? TICK_DURATION_CITY
      : TICK_DURATION_ADVENTURE;
  
  gameState.playtime += currentTickDuration;
  
  let {hero, active_enemy} = gameState;
  if (active_enemy) {
    console.log(`handleGameState: Enemy -> ${active_enemy.name}`);
    /* Slow Animation for hero crits */
    if ((hero.current_animation && 
         hero.current_animation.name === 'critical-attack')  
     ){
        return gameState; 
    }
  }

  if (hero.current_animation) {
    if (hero.current_animation.name === 'enemy-death' || 
       hero.current_animation.name === 'enemy-loot') {
      return gameState; 
    }
  } 
  
  if (hero.isInDialog) {
    return gameState; 
  } 
  
  // handle Combat
  if (hero.isInCombat) {
    hero.image = getHeroImages(gameState).IMG_HERO_COMBAT; 
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
      // Roll for Loot Drop 
      const level = active_enemy.isElite ? active_enemy.level + 5 : active_enemy.level;
      const loot = getEnemyLoot(level);
      
      if (loot) {
        console.log(`handleGameState loot drop was ${loot.itemType} ${loot.itemRarity}`);
        hero.current_animation = { name: 'enemy-loot', priority: ANIMATION_PRIORITY['enemyDeath'] }; 
        const enemy = document.querySelector(enemyImage);
        const chest = getItemImage( {itemType: "Chest", itemRarity: loot.itemRarity} ); 
        console.log(`handleGameState enemy image ${enemy}`);
        console.log(`handleGameState chest image ${chest}`);
        hero.isInDialog = true; // Workaround damit spiel zuverlaessig pausiert 
        handleEnemyDefeat(enemy, chest, () => {
          hero.current_animation = null; 
          // Hero reset 
          gameState = handleResetHeroControl({ ...gameState, hero}); 
          ({ hero, active_enemy } = gameState);
          setNewItem(loot);
        });
      }
      
      // execute enemy after function if he had one 
      if (active_enemy.runAfterKey) {
        console.log(`handleGameState try runAfterKey ${active_enemy.runAfterKey}`);
        GameState.runAfterEnemy(gameState, active_enemy.runAfterKey);
      }
      // check for lvl up
      if (hero.xp + active_enemy.xp_reward >= hero.xp_to_levelup) {
        if (hero.level < GameState.MAX_LEVEL) {
          hero.level += 1; 
          hero.xp = hero.xp + active_enemy.xp_reward - hero.xp_to_levelup; 
          hero.xp_to_levelup = calculateXpToLevelUp(hero.level); 
          hero.health = hero.health_full; 
          // trigger level up popup
          playConfettiFirework(); 
          setNumChooseUpgrades(UPGRADE_PER_LEVELUP);
          gameState.hero = hero; 
        } else {
          hero.xp = hero.xp_to_levelup; // Cap XP at max level
        }
      } else { 
        hero.xp += active_enemy.xp_reward;
        gameState.hero = hero;
      }
      if (hero.current_animation) {
        if (hero.current_animation.name === 'enemy-death' || 
            hero.current_animation.name === 'enemy-loot') {
          // Skip reset until callback in animation 
        }
      } else {
        // Hero reset 
        gameState = handleResetHeroControl({ ...gameState, hero}); 
        hero = gameState.hero; 
      }  
      
      hero.image = getHeroImages(gameState).IMG_HERO_NEUTRAL;
      setCounterAttackActive(false); // Disable button on victory
    }

    gameState = { ...gameState, hero, active_enemy}; 
    return (hero.health > 0 ? gameState : changeLocation(gameState, GameState.LOCATION_CITY, setCounterAttackActive));
  }

  // handle Adventure outside of Combat
  if (!hero.isInDialog && location.name !== GameState.LOCATION_CITY.name) {
    // handle roll new encounter
    console.log(`handleGameState (before new encounter): Hero XP -> ${hero.xp}`);
    if (gameState.next_encounters.length === 0) {
      console.log('No active encounter - rolling new encounter');
      // save game 
      saveGameState(gameState);
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
      gameState.active_enemy = createActiveEnemy(encounter); 
      /* apply effects at the start of combat */ 
      applyEffects(onCombatStartEffects, gameState); 
    } else if (encounter.category === 'story') {
      gameState = handleResetHeroControl(gameState);
      hero = gameState.hero;
      hero.isInDialog = true;
      hero.image = getHeroImages(gameState).IMG_HERO_COMBAT;
      
      setStoryEvent(encounter.dialog); // Set the story event
      setStoryDialogOpen(true); // Open the dialog
    } else {
      console.error(`ERROR: Unknown encounter type category ${encounter.category}`);
    }

    return { ...gameState, hero };
  }

  if (location.name === GameState.LOCATION_CITY.name) {
    return changeLocation(gameState, GameState.LOCATION_CITY, setCounterAttackActive);
  }

  // return gameState unchanged
  return gameState;
}

/* performs hero attack */ 
function performHeroAttack(gameState) {
  const {hero, active_enemy} = gameState;
  const bonus_damage = (1 + hero.bonus_damage / 100);
  const dmg = Math.floor(combatCalculation(hero, active_enemy) * bonus_damage);

  if (dmg >= 0) {
    /* apply on hit effects */ 
    applyEffects(onHitEffectsHero, gameState); 
    /* apply damage */ 
    if ( dmg > hero.attack * bonus_damage ) {
      hero.last_combat_event = `crit ${dmg}`;
      triggerHeroAttackAnimation(gameState, critAnimationDuration, true);
    } else {
      hero.last_combat_event = `dealt ${dmg}`; 
      triggerHeroAttackAnimation(gameState, battleAnimationDuration, false);
    }
    active_enemy.health -= dmg;
    playSound(SND_SWORD_HIT);
    
  } else {
    hero.last_combat_event = `missed`;
  }
    
  hero.attack_cooldown = hero.attack_speed;
  return gameState; 
}
/* performs enemy attack */ 
function performEnemyAttack(gameState, setCounterAttackActive) {
  const {hero, active_enemy} = gameState;
  let dmg = Math.round(combatCalculation(active_enemy, hero)); 

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
      triggerEnemyAttackAnimation(gameState, critAnimationDuration, true);
    } else {
      active_enemy.last_combat_event = `dealt ${dmg}`; 
      triggerEnemyAttackAnimation(gameState, battleAnimationDuration, false);
    }
    // apply reflect damage 
    if (hero.reflect_damage > 0) {
      const reflect = Math.ceil(dmg * hero.reflect_damage / 100); 
      hero.last_combat_event = `reflected ${reflect}`;
      dmg -= reflect; 
      active_enemy.health -= reflect; 
    } 
    // apply damage reduction
    dmg = dmg * ( 1 - hero.damage_reduction / 100); 
    
    hero.health -= dmg; // No evade, apply damage
    setCounterAttackActive(false); // Disable Counter Attack button
  }
  active_enemy.attack_cooldown = active_enemy.attack_speed + active_enemy.status.slowed;

  return gameState;
}

/**
 * Functions for Enchantment and Skill Effects 
 */ 
/* Fire Enchantment */ 
const fireCC = 0; 
const fireCD = 100; 
const fireReflect = 10; 
const fireId = ID_FIRE; 
function fireEffectSelectApply(gameState) {
  // console.log(`apply fire select`);
  gameState.hero.crit_chance += fireCC;
  gameState.hero.crit_damage += fireCD;
  gameState.hero.reflect_damage += fireReflect; 
  return gameState; 
}
function fireEffectSelectReverse(gameState) {
  // console.log(`revert fire select`);
  gameState.hero.crit_chance -= fireCC;
  gameState.hero.crit_damage -= fireCD;
  gameState.hero.reflect_damage -= fireReflect; 
  return gameState; 
}
/* Ice Enchantment */ 
const iceEC = 10; 
const iceSlow = 600; 
const iceId = ID_ICE; 
function iceEffectSelectApply(gameState) {
  // console.log(`apply ice select`);
  gameState.hero.evade_chance += iceEC; 
  addEffect(onHitEffectsHero, iceId, iceEffectOnHitApply, iceEffectOnHitReverse);
  return gameState;
}
function iceEffectSelectReverse(gameState) {
  // console.log(`revert ice select`);
  gameState.hero.evade_chance -= iceEC;
  removeEffect(onHitEffectsHero, iceId); 
  // TODO remove onhit counter from enemy 
  return gameState;
}
// TODO currently on hit effect stacks infinitly 
function iceEffectOnHitApply(gameState) {
  // console.log(`apply ice on hit`);
  const active_enemy = gameState.active_enemy; 
  if (active_enemy && active_enemy.status.slowed < iceSlow) {
    active_enemy.status.slowed = iceSlow; 
    active_enemy.attack_cooldown += iceSlow; 
  }
  return gameState; 
}
// TODO reverse can not be used yet, because enemy doesnt remember number of stacks 
function iceEffectOnHitReverse(gameState) {
  // console.log(`revert ice on hit`);
  const active_enemy = gameState.active_enemy; 
  if (active_enemy) { 
    active_enemy.status.slowed = 0;
    // attack cooldown is not reverted because enemy remains temporarily slowed 
  }
  return gameState; 
}
/* Lightning Enchantment */ 
const lightningAS = 300; 
const lightningStunChance = 30; 
const lightningId = ID_LIGHTNING; 
function lightningEffectSelectApply(gameState) {
  // console.log(`apply lightning select`);
  gameState.hero.attack_speed -= lightningAS; 
  addEffect(onHitEffectsHero, lightningId, lightningEffectOnHitApply, lightningEffectOnHitReverse);
  return gameState;
}
function lightningEffectSelectReverse(gameState) {
  // console.log(`revert lightning select`);
  gameState.hero.attack_speed += lightningAS; 
  removeEffect(onHitEffectsHero, lightningId);
  return gameState; 
}
function lightningEffectOnHitApply(gameState) {
  // console.log(`apply lightning on hit`);
  const roll = () => Math.random() * 100;
  if (roll() < lightningStunChance) {
    // stun successful 
    gameState.active_enemy.attack_cooldown = gameState.active_enemy.attack_speed; 
    gameState.active_enemy.last_combat_event = "stunned"; 
  }
  return gameState; 
}
function lightningEffectOnHitReverse(gameState) {
  // nothing to do 
  // console.log(`revert lightning on hit (nothing to do)`);
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
  const prevEnchantment = getEnchantmentById(hero.current_enchantment); 
  console.log(`previous enchantment was ${prevEnchantment.id}`);
  prevEnchantment.selectReverse(gameState); 
  /* add new Enchantment to lists */ 
  if (enchantment_id === fireId) {
    fireEffectSelectApply(gameState); 
    hero.current_enchantment = fireId; 
  } else if (enchantment_id === iceId) {
    iceEffectSelectApply(gameState); 
    hero.current_enchantment = iceId; 
  } else if (enchantment_id === lightningId) {
    lightningEffectSelectApply(gameState); 
    hero.current_enchantment = lightningId;
  } else if (enchantment_id === noneId) {
    hero.current_enchantment = noneId;
  } else {
    console.error(`unknown enchantment selected ${enchantment_id}`);
  }
  console.log(`new enchantment hero ${gameState.hero.current_enchantment}`);
  setHeroImages(gameState); 
  // reset Attack Cooldown to switch mid combat and not lose combo 
  hero.attack_cooldown = hero.attack_speed; 
  return { ...gameState, hero }; 
}
/*
  Enchantment REGISTRY
*/
function getEnchantmentById(enchantment_id) {
  switch (enchantment_id) {
    case fireId:
      return { id: fireId, selectReverse: fireEffectSelectReverse };
    case iceId:
      return { id: iceId, selectReverse: iceEffectSelectReverse };
    case lightningId:
      return { id: lightningId, selectReverse: lightningEffectSelectReverse };
    case noneId:
      return { id: noneId, selectReverse: (gameState) => {return gameState} };
  }
  console.error(`Unknown enchantment id ${enchantment_id}`);
}

/* 
 * Effect List Helper 
 */ 
function addEffect(effectList, id, applyFunction, reverseFunction) {
  // console.log(`add effect to ${effectList} => ${id}`);
  effectList.push({ id, applyFunction, reverseFunction });
}
function removeEffect(effectList, id) {
  const index = effectList.findIndex(effect => effect.id === id);
  if (index !== -1) {
    effectList.splice(index, 1);
  }
}
function applyEffects(effectList, gameState) {
  // console.log(`apply effects ${effectList}`);
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

/* add loot animation on enemy death */
function handleEnemyDefeat(enemyImageElement, lootChestImagePath, callback) {
  if (!enemyImageElement) return;
  // Set loot chest size (square) 
  const size = 250; // in px later 
  // const parentNode = enemyImageElement.parentNode;
  const parentNode = document.body; // Append to body for full control over positioning
  const deathDuration = 500; 
  const lootDuration = 1500; 
  const particleCount = 200; // for loot animation 
  // TODO death animation 
  // Step 1: Fade out enemy (death animation)
  enemyImageElement.classList.add('enemy-death');
  // Step 2: Replace enemy with loot chest
  const lootChest = document.createElement('img');
  lootChest.src = lootChestImagePath;
  lootChest.classList.add('loot-chest');
  lootChest.classList.add('shadow-lg'); // bootstrap styling
  lootChest.classList.add('rounded-5'); // bootstrap styling 
  //lootChest.style.left = enemyImageElement.offsetLeft + 'px';
  //lootChest.style.top = enemyImageElement.offsetTop + 'px'; 
  // Position chest in the middle of the screen
  lootChest.style.position = 'absolute';
  lootChest.style.width = `${size}px`; 
  lootChest.style.height = `${size}px`; 
  lootChest.style.left = `${(window.innerWidth - size) / 2}px`; // Center horizontally (assuming 100px width)
  lootChest.style.top = `${(window.innerHeight - size) / 2}px`; // Center vertically (assuming 100px height)
  lootChest.style.zIndex = "5"; 
  
  setTimeout(() => {
    // Append loot chest
    // parent className 'battle-container-enemy'
    parentNode.appendChild(lootChest);
    // Step 3: Spawn particles around the chest
    spawnParticlesAroundChest(lootChest, particleCount, lootDuration);

    // Step 4: Remove enemy image after fade-out
    if (enemyImageElement) enemyImageElement.style.display = 'none';

    // Step 5: Show loot dialog after lootDuration
    setTimeout(() => {
      lootChest.remove();
      callback();
    }, lootDuration);
  }, deathDuration); // Match death animation duration
}

function spawnParticlesAroundChest(chestElement, particleCount = 10, duration = 1000) {
  const parentNode = chestElement.parentNode || document.body; // Ensure a valid parent node

  // Get chest size and position
  const chestRect = chestElement.getBoundingClientRect();
  const chestX = chestRect.left + chestRect.width / 2;
  const chestY = chestRect.top + chestRect.height / 2;
  const maxRadius = Math.max(chestRect.width, chestRect.height) / 2 + 10; // Adjust radius dynamically

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Randomize particle positions around the chest
    const angle = Math.random() * Math.PI * 2; // Random angle
    const radius = Math.random() * maxRadius; // Adjust to match chest size
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.left = `${chestX + x}px`;
    particle.style.top = `${chestY + y}px`;
    particle.style.zIndex = (parseInt(chestElement.style.zIndex, 10) || 10) + 1; // Ensure particles are above chest

    // Randomize animation delay
    particle.style.animationDelay = `${Math.random() * 0.5}s`;

    // Append particle
    parentNode.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, duration);
  }
}

Game.propTypes = {
  heroName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isGameRunning: PropTypes.bool.isRequired
};

export default Game;
