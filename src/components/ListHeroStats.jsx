import {
  UPGRADE_DAMAGE, UPGRADE_MAX_HEALTH, UPGRADE_CRIT_CHANCE, 
  UPGRADE_CRIT_DAMAGE, UPGRADE_EVADE_CHANCE, UPGRADE_ATTACK_SPEED,
} from './../GameUtils.js';
import GameState from './../GameState.js';

const ListHeroStats = (gameState) => {
    if (!gameState) return null; 
    const heroHPCramped = Math.round(Math.max(0, gameState.hero.health));
  
    return (
      <>
        <p>Level: {gameState.hero.level}{gameState.hero.level >= GameState.MAX_LEVEL ? " (max)" : ""}</p>
        {/*<p>Exp: {gameState.hero.xp} / {gameState.hero.xp_to_levelup}</p>*/}
        <p>Health: {heroHPCramped}{gameState.hero.upgradeCounts[UPGRADE_MAX_HEALTH] >= GameState.UPGRADE_LIMITS[UPGRADE_MAX_HEALTH] ? " (max)" : ""}</p>
        <p>Attack: {gameState.hero.attack}{gameState.hero.upgradeCounts[UPGRADE_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_DAMAGE] ? " (max)" : ""}</p>
        <p>Attack Cooldown: {gameState.hero.attack_speed / 1000}s{gameState.hero.upgradeCounts[UPGRADE_ATTACK_SPEED] >= GameState.UPGRADE_LIMITS[UPGRADE_ATTACK_SPEED] ? " (max)" : ""}</p>
        <p>Evade Chance: {gameState.hero.evade_chance}%{gameState.hero.upgradeCounts[UPGRADE_EVADE_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_EVADE_CHANCE] ? " (max)" : ""}</p>
        <p>Damage Reduction: {gameState.hero.damage_reduction}%</p>
        <p>Crit Chance: {gameState.hero.crit_chance}%{gameState.hero.upgradeCounts[UPGRADE_CRIT_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_CHANCE] ? " (max)" : ""}</p>
        <p>Crit Damage: {gameState.hero.crit_damage}%{gameState.hero.upgradeCounts[UPGRADE_CRIT_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_DAMAGE] ? " (max)" : ""}</p>
        <p>Bonus Damage: {gameState.hero.bonus_damage}%</p>
      </>
    ); 
  };

export default ListHeroStats; 
