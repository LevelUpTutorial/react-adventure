import swordHit from './assets/sounds/sword-hit.ogg';
import GameState from './GameState.js';  
export const SND_SWORD_HIT = swordHit;

/* Util to play Sound */
export function playSound(filePath) {
    // Create a new Audio object
    const sound = new Audio(filePath);

    // Play the sound
    sound.play()
        .then(() => {
            console.log("Sound is playing successfully!");
        })
        .catch((error) => {
            console.error("Error playing sound:", error);
        });
}

/* calculate combat dmg or evade */ 
export function combatCalculation(attacker, defender) {
    // Roll a random number between 0 and 100
    const roll = () => Math.random() * 100;

    // Check defender's evade chance
    const evadeChance = defender.evade_chance ?? null;
    if (evadeChance === null) {
        console.warn("Defender evade chance is missing or null. Proceeding as if evade failed.");
    } else if (roll() < evadeChance) {
        return -1; // Attack evaded
    }

    // Roll for critical hit
    const critChance = attacker.crit_chance ?? null;
    if (critChance === null) {
        console.warn("Attacker critical chance is missing or null. Proceeding as if attack is not critical.");
    } else if (roll() < critChance) {
        // Critical hit: calculate damage with crit multiplier (crit_damage in %)
        return Math.floor(attacker.attack + (attacker.attack * (attacker.crit_damage || 0) / 100));
    }

    // Normal attack
    return Math.floor(attacker.attack);
}

/* calculate XP needed for leveling up */ 
export function calculateXpToLevelUp(current_level) {
  return Math.ceil(GameState.XP_TO_LEVEL2 * Math.pow(current_level, GameState.XP_SCALING)); 
}

/*
    Utilities for Hero Level Up 
*/ 
export const UPGRADE_PER_LEVELUP = 3; 
const OPTIONS_PER_LEVELUP = 3; 
const UPGRADE_OPTIONS = [
    { name: "Damage +5", effect: (hero) => hero.attack += 5, probability: 1 },
    { name: "Max Health +50", effect: (hero) => { 
        hero.health_full += 50; 
        hero.health = hero.health_full; 
    }, probability: 2 },
    { name: "Crit Chance +2%", effect: (hero) => hero.crit_chance += 2, probability: 2 },
    { name: "Crit Damage +10%", effect: (hero) => hero.crit_damage += 10, probability: 2 },
    { name: "Evade Chance +2%", effect: (hero) => hero.evade_chance += 2, probability: 2 },
    { name: "Attack Speed -25ms", effect: (hero) => hero.attack_speed -= 25, probability: 2 },
];

function rollUpgrades(options, numToChoose = OPTIONS_PER_LEVELUP) {
    const weighted = options.flatMap((option) =>
        Array(Math.floor(option.probability * 100)).fill(option)
    );

    const selected = new Set();
    while (selected.size < numToChoose && weighted.length > 0) {
        const index = Math.floor(Math.random() * weighted.length);
        const chosenOption = weighted[index];
        
        if (!selected.has(chosenOption)) {
            selected.add(chosenOption);
        }

        weighted.splice(index, 1); // Remove the selected element from the pool
    }

    return Array.from(selected);
}

export function onLevelUp(setUpgradeOptions, setUpgradePopupVisible) {
    const upgrades = rollUpgrades(UPGRADE_OPTIONS, OPTIONS_PER_LEVELUP); 
    setUpgradeOptions(upgrades); 
    setUpgradePopupVisible(true); 
}

/* 
  confetti firework effect 
  author: https://www.kirilv.com/canvas-confetti/
*/ 
const count = 2000;
const defaults = {
    origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
    });
}

export function playConfettiFirework() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/* change location and change background */
export function changeLocation(prevState, newLocation) {
    if (prevState.location.name === newLocation.name) {
        return prevState;
      }
      setBodyBackground(newLocation);
      
      if (newLocation.name === GameState.LOCATION_CITY.name) {
        return handleResetHeroInTown(prevState);
      }
      
      return { ...prevState, location: newLocation };
}

/* Set HTML <body> background based on location.background
  "background-image: url("@/assets/images/background-default.jpg");"
*/
function setBodyBackground(location) {
  console.log(`setBodyBackground: ${location.name}`);

  // Determine whether the device is widescreen or portrait
  const isWidescreen = window.innerWidth / window.innerHeight > 1;

  // Select the appropriate background based on orientation
  const background = isWidescreen ? location.bg_widescreen : location.bg_portrait;

  console.log(`Using background: ${background}`);
  // console.log(`setBodyBackground: ${location.name}`);
  // console.log(`setBodyBackground: ${location.background}`);

  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${background})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

/*
  handle reset Hero control variables
 */
export function handleResetHeroControl(gameState) {
  const hero = gameState.hero;
  hero.isInCombat = false;
  hero.isInDialog = false;
  hero.attack_cooldown = hero.attack_speed;
  hero.last_combat_event = ""; 
  gameState.active_enemy = null;

  return { ...gameState, hero };
}

/*
  handle reset Hero in Town
 */
export function handleResetHeroInTown(gameState) {
  gameState = handleResetHeroControl(gameState);
  const hero = gameState.hero;
  
  gameState.location = GameState.LOCATION_CITY;
  setBodyBackground(gameState.location); 
  hero.health = hero.health_full; // Heal
  hero.image = (hero.gender === GameState.GENDER_MALE ? GameState.IMG_HERO_MALE_NEUTRAL : GameState.IMG_HERO_FEMALE_NEUTRAL);

  // return new gameState
  return { ...gameState, hero }; 
}

