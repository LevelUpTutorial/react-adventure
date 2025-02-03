import {
  UPGRADE_DAMAGE,
  UPGRADE_MAX_HEALTH,
  UPGRADE_CRIT_CHANCE,
  UPGRADE_CRIT_DAMAGE,
  UPGRADE_EVADE_CHANCE,
  UPGRADE_ATTACK_SPEED,
} from './../GameUtils.js';
import GameState from './../GameState.js';

const ListHeroStats = ({ gameState }) => {
  if (!gameState || !gameState.hero) return null;

  const heroHPCramped = Math.ceil(Math.max(0, gameState.hero.health));

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <p>
        <strong>Level:</strong> {gameState.hero.level}
        {gameState.hero.level >= GameState.MAX_LEVEL ? " (max)" : ""}
      </p>
      {/* Uncomment if needed */}
      {/* <p>
        <strong>Exp:</strong> {Math.floor(gameState.hero.xp)} / {Math.ceil(gameState.hero.xp_to_levelup)}
      </p> */}
      <p>
        <strong>Health:</strong> {heroHPCramped}
        {gameState.hero.upgradeCounts[UPGRADE_MAX_HEALTH] >= GameState.UPGRADE_LIMITS[UPGRADE_MAX_HEALTH]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Attack:</strong> {Math.floor(gameState.hero.attack)}
        {gameState.hero.upgradeCounts[UPGRADE_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_DAMAGE]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Attack Cooldown:</strong> {Math.round(gameState.hero.attack_speed / 10) / 100}s
        {gameState.hero.upgradeCounts[UPGRADE_ATTACK_SPEED] >= GameState.UPGRADE_LIMITS[UPGRADE_ATTACK_SPEED]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Evade Chance:</strong> {Math.round(gameState.hero.evade_chance * 100) / 100}%
        {gameState.hero.upgradeCounts[UPGRADE_EVADE_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_EVADE_CHANCE]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Damage Reduction:</strong> {Math.round(gameState.hero.damage_reduction * 100) / 100}%
      </p>
      <p>
        <strong>Crit Chance:</strong> {Math.round(gameState.hero.crit_chance * 100) / 100}%
        {gameState.hero.upgradeCounts[UPGRADE_CRIT_CHANCE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_CHANCE]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Crit Damage:</strong> {Math.round(gameState.hero.crit_damage * 100) / 100}%
        {gameState.hero.upgradeCounts[UPGRADE_CRIT_DAMAGE] >= GameState.UPGRADE_LIMITS[UPGRADE_CRIT_DAMAGE]
          ? " (max)"
          : ""}
      </p>
      <p>
        <strong>Bonus Damage:</strong> {Math.round(gameState.hero.bonus_damage * 100) / 100}%
      </p>
    </div>
  );
};

export default ListHeroStats;
