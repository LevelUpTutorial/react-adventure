import swordHit from './assets/sounds/sword-hit.ogg';
import GameState from './GameState.js';  
/* Hero */
/* Hero Gear Tier 0 */ 
import heroFemaleNeutral from './assets/images/hero/hero_female_neutral.jpg';
import heroMaleNeutral from './assets/images/hero/hero_male_neutral.jpg';
/* Hero Gear */
import maleCombatCommonFire from './assets/images/hero/male_combat_common_fire.webp';
import maleCombatCommonIce from './assets/images/hero/male_combat_common_ice.webp';
import maleCombatCommonLightning from './assets/images/hero/male_combat_common_lightning.webp';
import maleCombatCommonNone from './assets/images/hero/male_combat_common_none.webp';
import maleCombatEpicFire from './assets/images/hero/male_combat_epic_fire.webp';
import maleCombatEpicIce from './assets/images/hero/male_combat_epic_ice.webp';
import maleCombatEpicLightning from './assets/images/hero/male_combat_epic_lightning.webp';
import maleCombatEpicNone from './assets/images/hero/male_combat_epic_none.webp';
import maleCombatLegendaryFire from './assets/images/hero/male_combat_legendary_fire.webp';
import maleCombatLegendaryIce from './assets/images/hero/male_combat_legendary_ice.webp';
import maleCombatLegendaryLightning from './assets/images/hero/male_combat_legendary_lightning.webp';
import maleCombatLegendaryNone from './assets/images/hero/male_combat_legendary_none.webp';
import maleCombatRareFire from './assets/images/hero/male_combat_rare_fire.webp';
import maleCombatRareIce from './assets/images/hero/male_combat_rare_ice.webp';
import maleCombatRareLightning from './assets/images/hero/male_combat_rare_lightning.webp';
import maleCombatRareNone from './assets/images/hero/male_combat_rare_none.webp';
import maleCombatUncommonFire from './assets/images/hero/male_combat_uncommon_fire.webp';
import maleCombatUncommonIce from './assets/images/hero/male_combat_uncommon_ice.webp';
import maleCombatUncommonLightning from './assets/images/hero/male_combat_uncommon_lightning.webp';
import maleCombatUncommonNone from './assets/images/hero/male_combat_uncommon_none.webp';
import femaleCombatCommonFire from './assets/images/hero/female_combat_common_fire.webp';
import femaleCombatCommonIce from './assets/images/hero/female_combat_common_ice.webp';
import femaleCombatCommonLightning from './assets/images/hero/female_combat_common_lightning.webp';
import femaleCombatCommonNone from './assets/images/hero/female_combat_common_none.webp';
import femaleCombatEpicFire from './assets/images/hero/female_combat_epic_fire.webp';
import femaleCombatEpicIce from './assets/images/hero/female_combat_epic_ice.webp';
import femaleCombatEpicLightning from './assets/images/hero/female_combat_epic_lightning.webp';
import femaleCombatEpicNone from './assets/images/hero/female_combat_epic_none.webp';
import femaleCombatLegendaryFire from './assets/images/hero/female_combat_legendary_fire.webp';
import femaleCombatLegendaryIce from './assets/images/hero/female_combat_legendary_ice.webp';
import femaleCombatLegendaryLightning from './assets/images/hero/female_combat_legendary_lightning.webp';
import femaleCombatLegendaryNone from './assets/images/hero/female_combat_legendary_none.webp';
import femaleCombatRareFire from './assets/images/hero/female_combat_rare_fire.webp';
import femaleCombatRareIce from './assets/images/hero/female_combat_rare_ice.webp';
import femaleCombatRareLightning from './assets/images/hero/female_combat_rare_lightning.webp';
import femaleCombatRareNone from './assets/images/hero/female_combat_rare_none.webp';
import femaleCombatUncommonFire from './assets/images/hero/female_combat_uncommon_fire.webp';
import femaleCombatUncommonIce from './assets/images/hero/female_combat_uncommon_ice.webp';
import femaleCombatUncommonLightning from './assets/images/hero/female_combat_uncommon_lightning.webp';
import femaleCombatUncommonNone from './assets/images/hero/female_combat_uncommon_none.webp';
/* Items Armor */ 
import armorCommonHigh from './assets/images/items/armor_common_high.webp';
import armorCommonLow from './assets/images/items/armor_common_low.webp';
import armorEpicHigh from './assets/images/items/armor_epic_high.webp';
import armorEpicLow from './assets/images/items/armor_epic_low.webp';
import armorLegendaryHigh from './assets/images/items/armor_legendary_high.webp';
import armorLegendaryLow from './assets/images/items/armor_legendary_low.webp';
import armorPerfectLegendaryHigh from './assets/images/items/armor_perfectLegendary_high.webp';
import armorRareHigh from './assets/images/items/armor_rare_high.webp';
import armorRareLow from './assets/images/items/armor_rare_low.webp';
import armorUncommonHigh from './assets/images/items/armor_uncommon_high.webp';
import armorUncommonLow from './assets/images/items/armor_uncommon_low.webp';
/* items Helms */
import helmCommonHigh from './assets/images/items/helm_common_high.webp';
import helmCommonLow from './assets/images/items/helm_common_low.webp';
import helmUncommonHigh from './assets/images/items/helm_uncommon_high.webp';
import helmUncommonLow from './assets/images/items/helm_uncommon_low.webp';
import helmRareHigh from './assets/images/items/helm_rare_high.webp';
import helmRareLow from './assets/images/items/helm_rare_low.webp';
import helmEpicHigh from './assets/images/items/helm_epic_high.webp';
import helmEpicLow from './assets/images/items/helm_epic_low.webp';
import helmLegendaryHigh from './assets/images/items/helm_legendary_high.webp';
import helmLegendaryLow from './assets/images/items/helm_legendary_low.webp';
import helmPerfectLegendaryHigh from './assets/images/items/helm_perfectLegendary_high.webp';
/* items boots */
import bootsCommonHigh from './assets/images/items/boots_common_high.webp';
import bootsCommonLow from './assets/images/items/boots_common_low.webp';
import bootsUncommonHigh from './assets/images/items/boots_uncommon_high.webp';
import bootsUncommonLow from './assets/images/items/boots_uncommon_low.webp';
import bootsRareHigh from './assets/images/items/boots_rare_high.webp';
import bootsRareLow from './assets/images/items/boots_rare_low.webp';
import bootsEpicHigh from './assets/images/items/boots_epic_high.webp';
import bootsEpicLow from './assets/images/items/boots_epic_low.webp';
import bootsLegendaryHigh from './assets/images/items/boots_legendary_high.webp';
import bootsLegendaryLow from './assets/images/items/boots_legendary_low.webp';
import bootsPerfectLegendaryHigh from './assets/images/items/boots_perfectLegendary_high.webp';
/* Swords */
import swordCommonHigh from './assets/images/items/sword_common_high.webp';
import swordCommonLow from './assets/images/items/sword_common_low.webp';
import swordUncommonHigh from './assets/images/items/sword_uncommon_high.webp';
import swordUncommonLow from './assets/images/items/sword_uncommon_low.webp';
import swordRareHigh from './assets/images/items/sword_rare_high.webp';
import swordRareLow from './assets/images/items/sword_rare_low.webp';
import swordEpicHigh from './assets/images/items/sword_epic_high.webp';
import swordEpicLow from './assets/images/items/sword_epic_low.webp';
import swordLegendaryHigh from './assets/images/items/sword_legendary_high.webp';
import swordLegendaryLow from './assets/images/items/sword_legendary_low.webp';
import swordPerfectLegendaryHigh from './assets/images/items/sword_perfectLegendary_high.webp';
/* Amulets */
import amuletCommonHigh from './assets/images/items/amulet_common_high.webp';
import amuletCommonLow from './assets/images/items/amulet_common_low.webp';
import amuletUncommonHigh from './assets/images/items/amulet_uncommon_high.webp';
import amuletUncommonLow from './assets/images/items/amulet_uncommon_low.webp';
import amuletRareHigh from './assets/images/items/amulet_rare_high.webp';
import amuletRareLow from './assets/images/items/amulet_rare_low.webp';
import amuletEpicHigh from './assets/images/items/amulet_epic_high.webp';
import amuletEpicLow from './assets/images/items/amulet_epic_low.webp';
import amuletLegendaryHigh from './assets/images/items/amulet_legendary_high.webp';
import amuletLegendaryLow from './assets/images/items/amulet_legendary_low.webp';
import amuletPerfectLegendaryHigh from './assets/images/items/amulet_perfectLegendary_high.webp';
/* Rings */
import ringCommonHigh from './assets/images/items/ring_common_high.webp';
import ringCommonLow from './assets/images/items/ring_common_low.webp';
import ringUncommonHigh from './assets/images/items/ring_uncommon_high.webp';
import ringUncommonLow from './assets/images/items/ring_uncommon_low.webp';
import ringRareHigh from './assets/images/items/ring_rare_high.webp';
import ringRareLow from './assets/images/items/ring_rare_low.webp';
import ringEpicHigh from './assets/images/items/ring_epic_high.webp';
import ringEpicLow from './assets/images/items/ring_epic_low.webp';
import ringLegendaryHigh from './assets/images/items/ring_legendary_high.webp';
import ringLegendaryLow from './assets/images/items/ring_legendary_low.webp';
import ringPerfectLegendaryHigh from './assets/images/items/ring_perfectLegendary_high.webp';
/* Items Loot Chests */
import chestCommon from './assets/images/items/chest_common.webp';
import chestEpic from './assets/images/items/chest_epic.webp';
import chestLegendary from './assets/images/items/chest_legendary.webp';
import chestPerfectLegendary from './assets/images/items/chest_perfectLegendary.webp';
import chestRare from './assets/images/items/chest_rare.webp';
import chestUncommon from './assets/images/items/chest_uncommon.webp';

const HERO_IMAGES = {
  heroMaleNeutral, 
  heroFemaleNeutral,
  maleCombatCommonFire,
  maleCombatCommonIce,
  maleCombatCommonLightning,
  maleCombatCommonNone,
  maleCombatEpicFire,
  maleCombatEpicIce,
  maleCombatEpicLightning,
  maleCombatEpicNone,
  maleCombatLegendaryFire,
  maleCombatLegendaryIce,
  maleCombatLegendaryLightning,
  maleCombatLegendaryNone,
  maleCombatRareFire,
  maleCombatRareIce,
  maleCombatRareLightning,
  maleCombatRareNone,
  maleCombatUncommonFire,
  maleCombatUncommonIce,
  maleCombatUncommonLightning,
  maleCombatUncommonNone,
  femaleCombatCommonFire,
  femaleCombatCommonIce,
  femaleCombatCommonLightning,
  femaleCombatCommonNone,
  femaleCombatEpicFire,
  femaleCombatEpicIce,
  femaleCombatEpicLightning,
  femaleCombatEpicNone,
  femaleCombatLegendaryFire,
  femaleCombatLegendaryIce,
  femaleCombatLegendaryLightning,
  femaleCombatLegendaryNone,
  femaleCombatRareFire,
  femaleCombatRareIce,
  femaleCombatRareLightning,
  femaleCombatRareNone,
  femaleCombatUncommonFire,
  femaleCombatUncommonIce,
  femaleCombatUncommonLightning,
  femaleCombatUncommonNone,
};

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
export function changeLocation(prevState, newLocation, setCounterAttackActive) {
  updateLocation(prevState, newLocation); 
  setCounterAttackActive(false);
  return { ...prevState}; 
}

/* changes gameState in place */
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
  const {IMG_HERO_COMBAT, IMG_HERO_NEUTRAL} = getHeroImages(gameState); 
  const hero = gameState.hero; 
  
  if (hero.gender === GameState.GENDER_MALE) {
    // Male Hero
    gameState.IMG_HERO_MALE_NEUTRAL = IMG_HERO_NEUTRAL; 
    gameState.IMG_HERO_MALE_COMBAT = IMG_HERO_COMBAT; 
  } else {
    // Female Hero 
    gameState.IMG_HERO_FEMALE_NEUTRAL = IMG_HERO_NEUTRAL;
    gameState.IMG_HERO_FEMALE_COMBAT = IMG_HERO_COMBAT;
  }
}
/* Gets Hero Images dynamically, must follow naming pattern! */
export function getHeroImages(gameState) {
  const { hero } = gameState;

  // Ensure valid values
  const gender = hero.gender; 
  const itemRarity = hero.armor.itemRarity === 'perfectLegendary' ? 'legendary' : hero.armor.itemRarity ; 
  const currentEnchantment = hero.current_enchantment;

  // Construct the variable name dynamically
  const combatImageKey = `${gender}Combat${capitalizeFirstLetter(itemRarity)}${capitalizeFirstLetter(currentEnchantment)}`;
  const neutralImageKey = `hero${capitalizeFirstLetter(gender)}Neutral`; // Assuming neutral images follow this pattern

  return {
    IMG_HERO_COMBAT: HERO_IMAGES[combatImageKey], // Access imported image variable dynamically
    IMG_HERO_NEUTRAL: HERO_IMAGES[neutralImageKey], // Access neutral image variable dynamically
  };
}

// Helper function to capitalize first letter of rarity/enchantment
function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
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
  31: { dropRate: 0.25, rarity: { uncommon: 0.6, rare: 0.34, epic: 0.05, legendary: 0.01 } },
  41: { dropRate: 0.30, rarity: { uncommon: 0.1, rare: 0.7, epic: 0.17, legendary: 0.03 } },
  51: { dropRate: 0.30, rarity: { rare: 0.5, epic: 0.35, legendary: 0.15 } },
  61: { dropRate: 0.35, rarity: { rare: 0.1, epic: 0.7, legendary: 0.198, perfectLegendary: 0.002 } },
};

/* Chances which items type drops */ 
const ITEM_TYPE_CHANCES = {
  Sword: 0.18,
  Helm: 0.14,
  Boots: 0.18,
  Armor: 0.21,
  Amulet: 0.15,
  Ring: 0.14,
};

// Armor Stat Ranges by Rarity
export const ARMOR_STAT_RANGES = {
  common: { min: 1, max: 5 },
  uncommon: { min: 4, max: 12 },
  rare: { min: 11, max: 25 },
  epic: { min: 24, max: 35 },
  legendary: { min: 34, max: 49 },
  perfectLegendary: { min: 49, max: 50 },
};
// Helm Stat Ranges by Rarity
export const HELM_STAT_RANGES = {
  common: { min: 1, max: 2 },
  uncommon: { min: 2, max: 5 },
  rare: { min: 5, max: 10 },
  epic: { min: 9, max: 20 },
  legendary: { min: 19, max: 29 },
  perfectLegendary: { min: 29, max: 30 },
};
// Boots Stat Ranges by Rarity
export const BOOTS_STAT_RANGES = {
  common: { min: 1, max: 2 },
  uncommon: { min: 2, max: 4 },
  rare: { min: 4, max: 7 },
  epic: { min: 7, max: 13 },
  legendary: { min: 13, max: 24 },
  perfectLegendary: { min: 24, max: 25 },
};
// Amulets Stat Ranges by Rarity
const AMULET_STAT_RANGES = {
  common: {
    bonus_damage: { min: 0, max: 2 },
    damage_reduction: { min: 0, max: 1 },
  },
  uncommon: {
    bonus_damage: { min: 2, max: 5 },
    damage_reduction: { min: 1, max: 2 },
  },
  rare: {
    bonus_damage: { min: 5, max: 8 },
    damage_reduction: { min: 2, max: 4 },
  },
  epic: {
    bonus_damage: { min: 8, max: 12 },
    damage_reduction: { min: 4, max: 6 },
  },
  legendary: {
    bonus_damage: { min: 12, max: 24 },
    damage_reduction: { min: 6, max: 10 },
  },
  perfectLegendary: {
    bonus_damage: { min: 24, max: 25 },
    damage_reduction: { min: 10, max: 10 },
  },
};
// Rings Stat Ranges by Rarity
const RING_STAT_RANGES = {
  common: {
    crit_chance: { min: 0, max: 1 },
    crit_damage: { min: 1, max: 5 },
  },
  uncommon: {
    crit_chance: { min: 1, max: 2 },
    crit_damage: { min: 4, max: 12 },
  },
  rare: {
    crit_chance: { min: 2, max: 4 },
    crit_damage: { min: 11, max: 25 },
  },
  epic: {
    crit_chance: { min: 4, max: 6 },
    crit_damage: { min: 24, max: 35 },
  },
  legendary: {
    crit_chance: { min: 6, max: 10 },
    crit_damage: { min: 34, max: 49 },
  },
  perfectLegendary: {
    crit_chance: { min: 10, max: 10 },
    crit_damage: { min: 49, max: 50 },
  },
};
// Swords Stat Ranges by Rarity
const SWORD_STAT_RANGES = {
  common: {
    attack: { min: 5, max: 10 },
    bonus_damage: { min: 0, max: 2 },
    attack_speed: { min: 0, max: 20 },
  },
  uncommon: {
    attack: { min: 10, max: 20 },
    bonus_damage: { min: 2, max: 5 },
    attack_speed: { min: 20, max: 40 },
  },
  rare: {
    attack: { min: 20, max: 40 },
    bonus_damage: { min: 5, max: 8 },
    attack_speed: { min: 40, max: 80 },
  },
  epic: {
    attack: { min: 40, max: 60 },
    bonus_damage: { min: 8, max: 12 },
    attack_speed: { min: 80, max: 120 },
  },
  legendary: {
    attack: { min: 60, max: 90 },
    bonus_damage: { min: 12, max: 24 },
    attack_speed: { min: 120, max: 180 },
  },
  perfectLegendary: {
    attack: { min: 90, max: 120 },
    bonus_damage: { min: 24, max: 25 },
    attack_speed: { min: 180, max: 250 },
  },
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

/* rolls a random item type */
function getItemType() {
  const random = Math.random(); // Generates a number between 0 and 1
  let cumulativeProbability = 0;

  for (const [itemType, probability] of Object.entries(ITEM_TYPE_CHANCES)) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return itemType;
    }
  }
  
  return "Armor"; // Fallback (shouldn't occur unless probabilities don't sum to 1)
}

// Function to get an enemy's loot based on their level
let itemPityCount = 0;
let legendaryPityCount = 0;
export function getEnemyLoot(enemyLevel) {
  // Determine which range the enemy level falls into
  const range = Object.keys(DROP_CHANCES).reverse().find(level => enemyLevel >= level);
  if (!range) return null; // No loot table for this level

  const { dropRate, rarity } = DROP_CHANCES[range];

  // Determine if an item drops
  if (itemPityCount < 10 && Math.random() > dropRate) {
    itemPityCount += 1; // No item dropped
    return null;
  }

  // Generate item drop
  itemPityCount = 0;
  const itemType = getItemType();
  console.log(`getEnemyLoot item type ${itemType}`);
  let itemRarity = getRarity(rarity);

  // Check for legendary pity
  if (
    enemyLevel > 50 &&
    itemRarity !== "legendary" &&
    itemRarity !== "perfectLegendary" &&
    legendaryPityCount >= 5
  ) {
    itemRarity = "legendary";
    legendaryPityCount = 0;
  }

  // Generate stats for the item based on rarity
  let itemStats = {};
  let statDescriptions = [];

  if (itemType === "Armor" || itemType === "Helm") {
    const statRange = itemType === "Armor" ? ARMOR_STAT_RANGES[itemRarity] : HELM_STAT_RANGES[itemRarity];
    itemStats = {
      damage_reduction: rollStat(statRange.min, statRange.max),
    };
    statDescriptions.push(`Damage Reduction ${itemStats.damage_reduction}% [${statRange.min}% - ${statRange.max}%]`);
  } else if (itemType === "Boots") {
    const statRange = BOOTS_STAT_RANGES[itemRarity];
    itemStats = {
      evade_chance: rollStat(statRange.min, statRange.max),
    };
    statDescriptions.push(`Evade Chance ${itemStats.evade_chance}% [${statRange.min}% - ${statRange.max}%]`);
  } else if (itemType === "Ring") {
    const statRanges = RING_STAT_RANGES[itemRarity];
    itemStats = {
      crit_chance: rollStat(statRanges.crit_chance.min, statRanges.crit_chance.max),
      crit_damage: rollStat(statRanges.crit_damage.min, statRanges.crit_damage.max),
    };
    statDescriptions.push(
      `Crit Chance ${itemStats.crit_chance}% [${statRange.crit_chance.min}% - ${statRange.crit_chance.max}%]`,
      `Crit Damage ${itemStats.crit_damage}% [${statRange.crit_damage.min}% - ${statRange.crit_damage.max}%]`
    );
  } else if (itemType === "Amulet") {
    const statRanges = AMULET_STAT_RANGES[itemRarity];
    itemStats = {
      damage_reduction: rollStat(statRanges.damage_reduction.min, statRanges.damage_reduction.max),
      bonus_damage: rollStat(statRanges.bonus_damage.min, statRanges.bonus_damage.max),
    };
    statDescriptions.push(
      `Damage Reduction ${itemStats.damage_reduction}% [${statRange.damage_reduction.min}% - ${statRange.damage_reduction.max}%]`, 
      `Bonus Damage ${itemStats.bonus_damage}% [${statRange.bonus_damage.min}% - ${statRange.bonus_damage.max}%]`
    );
  } else if (itemType === "Sword") {
    const statRanges = SWORD_STAT_RANGES[itemRarity];
    itemStats = {
      attack: rollStat(statRanges.attack.min, statRanges.attack.max),
      bonus_damage: rollStat(statRanges.bonus_damage.min, statRanges.bonus_damage.max),
      attack_speed: rollStat(statRanges.attack_speed.min, statRanges.attack_speed.max),
    };
    statDescriptions.push(
      `Attack ${itemStats.attack} [${statRange.attack.min} - ${statRange.attack.max}]`, 
      `Bonus Damage ${itemStats.bonus_damage}% [${statRange.bonus_damage.min}% - ${statRange.bonus_damage.max}%]`, 
      `Attack Cooldown -${itemStats.attack_speed}ms [-${statRange.attack_speed.min}ms - -${statRange.attack_speed.max}ms]`
    );
  } else {
    console.error(`Unknown item type ${itemType}`);
    return null;
  }

  // Determine sub-rarity based on primary stat
  let subRarity = "low";
  const primaryStatKey = Object.keys(itemStats)[0]; // Get first key (main stat)
  const statRange = getStatRange(itemType, itemRarity);
  const midPoint = statRange.min + (statRange.max - statRange.min) / 2;
  subRarity = itemStats[primaryStatKey] >= midPoint ? "high" : "low";

  // Return the item details
  return {
    itemType,
    itemRarity,
    subRarity,
    statDescriptions,
    itemStats,
  };
}

// Helper to roll a stat within a range
function rollStat(min, max) {
  const decimalPlaces = 100;
  return Math.round(randomInRange(min, max) * decimalPlaces) / decimalPlaces;
}

// Helper function to get stat ranges for any item type
function getStatRange(itemType, itemRarity) {
  switch (itemType) {
    case "Armor": return ARMOR_STAT_RANGES[itemRarity];
    case "Boots": return BOOTS_STAT_RANGES[itemRarity];
    case "Helm": return HELM_STAT_RANGES[itemRarity];
    case "Ring": return RING_STAT_RANGES[itemRarity].crit_chance; // Use crit_chance as primary
    case "Amulet": return AMULET_STAT_RANGES[itemRarity].bonus_damage; // Use bonus_damage as primary
    case "Sword": return SWORD_STAT_RANGES[itemRarity].attack; // Use attack as primary
    default: return { min: 0, max: 1 };
  }
}

export function getItemImage(item) {
  switch (item.itemType) {
    case 'Armor':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? armorCommonHigh : armorCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? armorUncommonHigh : armorUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? armorRareHigh : armorRareLow;
        case 'epic':
          return item.subRarity === 'high' ? armorEpicHigh : armorEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? armorLegendaryHigh : armorLegendaryLow;
        case 'perfectLegendary':
          return armorPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Helm':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? helmCommonHigh : helmCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? helmUncommonHigh : helmUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? helmRareHigh : helmRareLow;
        case 'epic':
          return item.subRarity === 'high' ? helmEpicHigh : helmEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? helmLegendaryHigh : helmLegendaryLow;
        case 'perfectLegendary':
          return helmPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Boots':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? bootsCommonHigh : bootsCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? bootsUncommonHigh : bootsUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? bootsRareHigh : bootsRareLow;
        case 'epic':
          return item.subRarity === 'high' ? bootsEpicHigh : bootsEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? bootsLegendaryHigh : bootsLegendaryLow;
        case 'perfectLegendary':
          return bootsPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Sword':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? armorCommonHigh : armorCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? swordUncommonHigh : swordUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? swordRareHigh : swordRareLow;
        case 'epic':
          return item.subRarity === 'high' ? swordEpicHigh : swordEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? swordLegendaryHigh : swordLegendaryLow;
        case 'perfectLegendary':
          return swordPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Amulet':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? amuletCommonHigh : amuletCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? amuletUncommonHigh : amuletUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? amuletareHigh : amuletRareLow;
        case 'epic':
          return item.subRarity === 'high' ? amuletEpicHigh : amuletEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? amuletLegendaryHigh : amuletLegendaryLow;
        case 'perfectLegendary':
          return amuletPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Ring':
      switch (item.itemRarity) {
        case 'common':
          return item.subRarity === 'high' ? ringCommonHigh : ringCommonLow;
        case 'uncommon':
          return item.subRarity === 'high' ? ringUncommonHigh : ringUncommonLow;
        case 'rare':
          return item.subRarity === 'high' ? ringRareHigh : ringRareLow;
        case 'epic':
          return item.subRarity === 'high' ? ringEpicHigh : ringEpicLow;
        case 'legendary':
          return item.subRarity === 'high' ? ringLegendaryHigh : ringLegendaryLow;
        case 'perfectLegendary':
          return ringPerfectLegendaryHigh;
        default:
          return '';
      }
    case 'Chest':
      switch (item.itemRarity) {
        case 'common':
          return chestCommon;
        case 'uncommon':
          return chestUncommon;
        case 'rare':
          return chestRare;
        case 'epic':
          return chestEpic;
        case 'legendary':
          return chestLegendary;
        case 'perfectLegendary':
          return chestPerfectLegendary;
        default:
          return '';
      }
    // Add more cases for other item types if needed
    default:
      return '';
  }
}
