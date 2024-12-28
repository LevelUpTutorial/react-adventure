import swordHit from './assets/sounds/sword-hit.ogg';
import GameState from './GameState.js';  
export const SND_SWORD_HIT = swordHit;

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

export function calculateXpToLevelUp(current_level) {
  return Math.ceil(GameState.XP_TO_LEVEL2 * Math.pow(current_level, GameState.XP_SCALING)); 
}

/*
    Utilities for Hero Level Up 
*/ 
export const UPGRADE_PER_LEVELUP = 3; 
const OPTIONS_PER_LEVELUP = 3; 
const UPGRADE_OPTIONS = [
    { name: "Damage +5", effect: (hero) => hero.attack += 5, probability: 2 },
    { name: "Max Health +50", effect: (hero) => { 
        hero.health_full += 50; 
        hero.health = hero.health_full; 
    }, probability: 2 },
    { name: "Crit Chance +2", effect: (hero) => hero.crit_chance += 2, probability: 2 },
    { name: "Crit Damage +10", effect: (hero) => hero.crit_damage += 10, probability: 2 },
    { name: "Evade Chance +2", effect: (hero) => hero.evade_chance += 2, probability: 2 },
    { name: "Attack Speed -20ms", effect: (hero) => hero.attack_speed -= 20, probability: 2 },
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
