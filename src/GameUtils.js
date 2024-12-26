import swordHit from './assets/sounds/sword-hit.ogg';

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
  const base_xp = GameState.XP_TO_LEVEL2; 
  const xp_scaling = GameState.XP_SCALING; 
  return Math.ceil(base_xp * Math.pow(current_level, xp_scaling)); 
}
