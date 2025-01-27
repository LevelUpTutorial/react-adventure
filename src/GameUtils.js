import swordHit from './assets/sounds/sword-hit.ogg';
import GameState from './GameState.js';  
/* Hero */
/* Hero Gear Tier 0 */ 
import heroFemaleNeutral from './assets/images/hero/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero/hero_male_neutral.jpg';
import heroFemaleCombatT0None from './assets/images/hero/hero_female_combat.png';
import heroMaleCombatT0None from './assets/images/hero/hero_male_combat.png';
/* Hero Gear Tier 1 */
import heroFemaleCombatT1Fire from './assets/images/hero/hero_female_combat_fire_t1.webp';
import heroFemaleCombatT1Ice from './assets/images/hero/hero_female_combat_ice_t1.webp';
import heroFemaleCombatT1Lightning from './assets/images/hero/hero_female_combat_lightning_t1.webp';
import heroMaleCombatT1Fire from './assets/images/hero/hero_male_combat_fire_t1.webp';
import heroMaleCombatT1Ice from './assets/images/hero/hero_male_combat_ice_t1.webp';
import heroMaleCombatT1Lightning from './assets/images/hero/hero_male_combat_lightning_t1.webp'; 
/* Hero Gear Tier 2 */
/* Hero Gear Tier 3 */

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
export const DAMAGE_INCREMENT = 5; 
export const MAX_HEALTH_INCREMENT = 50; 
export const CRIT_CHANCE_INCREMENT = 2; 
export const CRIT_DAMAGE_INCREMENT = 10;
export const EVADE_CHANCE_INCREMENT = 2;
export const ATTACK_SPEED_DECREASE = 20; 
export const UPGRADE_DAMAGE = `Damage +${DAMAGE_INCREMENT}`;
export const UPGRADE_MAX_HEALTH = `Max Health +${MAX_HEALTH_INCREMENT}`;
export const UPGRADE_CRIT_CHANCE = `Crit Chance +${CRIT_CHANCE_INCREMENT}%`;
export const UPGRADE_CRIT_DAMAGE = `Crit Damage +${CRIT_DAMAGE_INCREMENT}%`;
export const UPGRADE_EVADE_CHANCE = `Evade Chance +${EVADE_CHANCE_INCREMENT}%`;
export const UPGRADE_ATTACK_SPEED = `Attack Cooldown -${ATTACK_SPEED_DECREASE}ms`;
const UPGRADE_OPTIONS = [
    { name: UPGRADE_DAMAGE, effect: (hero) => hero.attack += DAMAGE_INCREMENT, probability: 2 },
    { name: UPGRADE_MAX_HEALTH, effect: (hero) => { 
        hero.health_full += MAX_HEALTH_INCREMENT; 
        hero.health = hero.health_full; 
    }, probability: 2 },
    { name: UPGRADE_CRIT_CHANCE, effect: (hero) => hero.crit_chance += CRIT_CHANCE_INCREMENT, probability: 2 },
    { name: UPGRADE_CRIT_DAMAGE, effect: (hero) => hero.crit_damage += CRIT_DAMAGE_INCREMENT, probability: 2 },
    { name: UPGRADE_EVADE_CHANCE, effect: (hero) => hero.evade_chance += EVADE_CHANCE_INCREMENT, probability: 2 },
    { name: UPGRADE_ATTACK_SPEED, effect: (hero) => hero.attack_speed -= ATTACK_SPEED_DECREASE, probability: 2 },
];
function rollUpgrades(options, numToChoose = OPTIONS_PER_LEVELUP, hero) {
  const weighted = options.flatMap((option) => {
    const limit = GameState.UPGRADE_LIMITS[option.name];
    const count = hero.upgradeCounts[option.name];
    if (count < limit) {
      return Array(Math.floor(option.probability * 100)).fill(option);
    }
    return [];
  });

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

export function onLevelUp(setUpgradeOptions, setUpgradePopupVisible, hero) {
  const upgrades = rollUpgrades(UPGRADE_OPTIONS, OPTIONS_PER_LEVELUP, hero); 
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

/* 
  change location and change background 
  Returns a new State object to trigger react rendering 
*/
export function changeLocation(prevState, newLocation) {
  updateLocation(prevState, newLocation); 
  return { ...prevState}; 
}

/* changed gameState in place */
export function updateLocation(gameState, newLocation) {
  if (gameState.location.name === newLocation.name) {
    return gameState;
  }
  gameState.location = newLocation; 
  setBodyBackground(newLocation);
      
  if (newLocation.name === GameState.LOCATION_CITY.name) {
    return handleResetHeroInTown(gameState);
  }

  return gameState; 
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

export const ID_NONE = 'none'; 
export const ID_FIRE = 'Fire'; 
export const ID_ICE = 'Ice'; 
export const ID_LIGHTNING = 'Lightning'; 
/* 
  sets new images for the hero depending on 
  gender, level, enchantment for neutral and combat 
*/
export function setHeroImages(gameState) {
  const hero = gameState.hero; 
  const enc_id = hero.current_enchantment; 
  if (hero.gender === GameState.GENDER_MALE) {
    gameState.IMG_HERO_MALE_NEUTRAL = heroMaleNeutral;
    if (enc_id === ID_NONE) {
      gameState.IMG_HERO_MALE_COMBAT = heroMaleCombatT0None; 
    } else if (enc_id === ID_FIRE) {
      gameState.IMG_HERO_MALE_COMBAT = heroMaleCombatT1Fire;
    } else if (enc_id === ID_ICE) {
      gameState.IMG_HERO_MALE_COMBAT = heroMaleCombatT1Ice;
    } else if (enc_id === ID_LIGHTNING) {
      gameState.IMG_HERO_MALE_COMBAT = heroMaleCombatT1Lightning;
    } else {
      console.error(`unknown enchantment_id ${enc_id}`);
    }
  } else {
    // Female Hero 
    gameState.IMG_HERO_FEMALE_NEUTRAL = heroFemaleNeutral;
    if (enc_id === ID_NONE) {
      gameState.IMG_HERO_FEMALE_COMBAT = heroFemaleCombatT0None; 
    } else if (enc_id === ID_FIRE) {
      gameState.IMG_HERO_FEMALE_COMBAT = heroFemaleCombatT1Fire;
    } else if (enc_id === ID_ICE) {
      gameState.IMG_HERO_FEMALE_COMBAT = heroFemaleCombatT1Ice;
    } else if (enc_id === ID_LIGHTNING) {
      gameState.IMG_HERO_FEMALE_COMBAT = heroFemaleCombatT1Lightning;
    } else {
      console.error(`unknown enchantment_id ${enc_id}`);
    }
  }
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
function handleResetHeroInTown(gameState) {
  gameState = handleResetHeroControl(gameState);
  const hero = gameState.hero;
  
  gameState.location = GameState.LOCATION_CITY;
  setBodyBackground(gameState.location); 
  hero.health = hero.health_full; // Heal
  hero.image = (hero.gender === GameState.GENDER_MALE ? gameState.IMG_HERO_MALE_NEUTRAL : gameState.IMG_HERO_FEMALE_NEUTRAL);

  // return new gameState
  return { ...gameState, hero }; 
}

/* 
  Merges List 2 into List 1 in place, 
  List1 is already modified, its only returned for optional chaining! 
*/ 
export function mergeList2inList1(list1, list2) {
    const idsInList2 = new Set(list2.map(item => item.id));
    const filteredList1 = list1.filter(item => !idsInList2.has(item.id));
    // Clear list1 and add merged content
    list1.length = 0;
    list1.push(...filteredList1, ...list2);
    return list1; // Optional, for chaining
} 

// Save game state with hero class (gender) as part of the key
export function saveGameState(gameState) {
  try {
    // Construct the key using the hero's gender
    const key = `react-adventure-${gameState.hero.gender}`;
    const serializedState = JSON.stringify(gameState);
    localStorage.setItem(key, serializedState);
    console.log(`Game state saved successfully for ${gameState.hero.gender}.`);
  } catch (error) {
    console.error('Error saving game state:', error);
  }
}

// Load game state for a specific hero class (gender)
export function loadGameState(heroGender) {
  try {
    // Construct the key using the provided hero's gender
    const key = `react-adventure-${heroGender}`;
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      console.log(`No saved game state found for ${heroGender}.`);
      return null; // Or return an initial state object
    }
    console.log(`Game state loaded successfully for ${heroGender}.`);
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading game state:', error);
    return undefined; // Or handle the error as needed
  }
}

/* PERCENTAGE Scaling for stats per level difference */
const HEALTH_CHANGE = 0.12; 
const XP_CHANGE = 0.10; 
const ATTACK_CHANGE = 0.08; 
const LEVEL_RANGE = 3; 
/*
  Creates a new enemy instance out of its template. 
  Rolls a level +/- LEVEL_RANGE of its base level.
  Attack, Health and XP reward scale per level. 
  Elite enemies do not scale. 
  Also adds some attributes for gameplay that dont exist in its template! 
*/
export function createActiveEnemy(encounter) {
  const enemy = encounter.enemy; 
  // Elite dont scale 
  if (!enemy.isElite) {
    // add or subtract level 
    let direction = 1
    if (enemy.level > LEVEL_RANGE) {
      direction = Math.random() < 0.5 ? 1 : -1;
    }
    const roll = weightedRoll(LEVEL_RANGE); // Roll will always be an integer
    const target = enemy.level + roll * direction; 
    enemy.health = getScaledValue(enemy.health, HEALTH_CHANGE, target, enemy.level); 
    enemy.xp_reward = getScaledValue(enemy.xp_reward, XP_CHANGE, target, enemy.level); 
    enemy.attack = getScaledValue(enemy.attack, ATTACK_CHANGE, target, enemy.level);
  }
  
  return {...enemy, health_full: enemy.health, last_combat_event: "", current_animation: null};
}
/**
 * Generates a weighted random roll between 0 and the specified levelRange, 
 * favoring values closer to 0 (Gaussian-like distribution).
 *
 * @param {number} levelRange - The maximum range of the roll (inclusive).
 * @returns {number} - A random integer between 0 and levelRange.
 *
 * The function creates a weight for each possible roll value based on an 
 * exponential decay formula (higher weights for smaller values). It normalizes 
 * these weights to probabilities that sum to 1, then uses a random value to 
 * select a roll based on the cumulative probabilities.
 *
 * Example:
 *   weightedRoll(2) might return:
 *     0 (~68% chance)
 *     1 (~27% chance)
 *     2 (~5% chance)
 *   For levelRange = 3, the likely outcomes and their probabilities:
 *     Roll 0: ~57.1% chance
 *     Roll 1: ~34.6% chance
 *     Roll 2: ~7.7% chance
 *     Roll 3: ~0.6% chance
 */
function weightedRoll(levelRange) {
  const weights = [];
  for (let i = 0; i <= levelRange; i++) {
    // Higher weights for smaller values, exponential decay for larger values
    weights.push(Math.exp(-i * i / 2));
  }
  // Normalize weights so they sum to 1
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const probabilities = weights.map(w => w / totalWeight);

  // Select a roll using cumulative probabilities
  const random = Math.random();
  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (random <= cumulative) {
      return i; // Return the integer roll
    }
  }
  return levelRange; // Fallback, though it shouldn't happen
}
/* 
 * Scales a value depending on level
 * and % per level to the next integer 
 * that is dividable with 5. 
 */
function getScaledValue(baseValue, change_per_level, target_level, base_level) {
  return Math.round( baseValue * ( 1 + change_per_level * ( target_level - base_level ) ) / 5) * 5; 
}

// Constants for item drop probabilities and configurations
const DROP_CHANCES = {
  1: { dropRate: 0.10, rarity: { common: 0.9, uncommon: 0.1 } },
  11: { dropRate: 0.15, rarity: { common: 0.689, uncommon: 0.29, rare: 0.02, epic: 0.001 } },
  21: { dropRate: 0.20, rarity: { common: 0.1, uncommon: 0.8, rare: 0.1, epic: 0.01 } },
  31: { dropRate: 0.20, rarity: { uncommon: 0.6, rare: 0.34, epic: 0.05, legendary: 0.01 } },
  41: { dropRate: 0.25, rarity: { uncommon: 0.1, rare: 0.7, epic: 0.17, legendary: 0.03 } },
  51: { dropRate: 0.25, rarity: { rare: 0.5, epic: 0.35, legendary: 0.15 } },
  61: { dropRate: 0.30, rarity: { rare: 0.1, epic: 0.7, legendary: 0.198, perfectLegendary: 0.002 } },
};

// Armor Stat Ranges by Rarity
const STAT_RANGES = {
  common: { min: 1, max: 5 },
  uncommon: { min: 5, max: 12 },
  rare: { min: 10, max: 25 },
  epic: { min: 23, max: 35 },
  legendary: { min: 33, max: 48 },
  perfectLegendary: { min: 49, max: 50 },
};

// Function to generate a random number between min and max
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to determine the rarity of the item
function getRarity(rarityChances) {
  const random = Math.random();
  let cumulative = 0;
  for (const [rarity, chance] of Object.entries(rarityChances)) {
    cumulative += chance;
    if (random <= cumulative) {
      return rarity;
    }
  }
  return null; // Should never reach here if probabilities sum to 1
}

// Function to get an enemy's loot based on their level
// TODO: Pity System for item after x kill
// TODO: Pity System for legendaries 
export function getEnemyLoot(enemyLevel) {
  // Determine which range the enemy level falls into
  const range = Object.keys(DROP_CHANCES).reverse().find(level => enemyLevel >= level);
  if (!range) return null; // No loot table for this level

  const { dropRate, rarity } = DROP_CHANCES[range];

  // Determine if an item drops
  if (Math.random() > dropRate) return null;

  // Determine the rarity of the item
  const itemRarity = getRarity(rarity);

  // Generate stats for the item based on rarity
  const statRange = STAT_RANGES[itemRarity];
  const itemStat = Math.round(randomInRange(statRange.min, statRange.max) * 100) / 100;
  const midPoint = statRange.min + (statRange.max - statRange.min) / 2; 
  const subRarity = itemStat >= midPoint ? 'high' : 'low' ;

  // Return the item details
  return {
    itemType: "Armor",
    itemRarity: itemRarity,
    subRarity: subRarity, 
    statDesc: "Damage Reduction", 
    itemStat: itemStat,
  };
}

export function getItemImage(item) {
  return '';
}
