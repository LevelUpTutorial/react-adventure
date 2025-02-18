import {
  UPGRADE_DAMAGE,
  UPGRADE_MAX_HEALTH,
  UPGRADE_CRIT_CHANCE,
  UPGRADE_CRIT_DAMAGE,
  UPGRADE_EVADE_CHANCE,
  UPGRADE_ATTACK_SPEED,
} from './../GameUtils.js';
import GameState from './../GameState.js';
import buttonPlus from "./../assets/images/button_plus.jpg"; 
import buttonMinus from "./../assets/images/button_minus.jpg";

const ListHeroStats = ({ gameState, handleUpgrade, handleRefund, showButtons = false }) => {
  if (!gameState || !gameState.hero) return null;

  const heroHPCramped = Math.ceil(Math.max(0, gameState.hero.health));

  const statElements = [
  { label: "Attack", key: "attack", upgradeKey: UPGRADE_DAMAGE },
  { label: "Health", key: "health_full", upgradeKey: UPGRADE_MAX_HEALTH },
  { label: "Crit Chance", key: "crit_chance", upgradeKey: UPGRADE_CRIT_CHANCE },
  { label: "Crit Damage", key: "crit_damage", upgradeKey: UPGRADE_CRIT_DAMAGE },
  { label: "Evade Chance", key: "evade_chance", upgradeKey: UPGRADE_EVADE_CHANCE },
  { label: "Attack Cooldown", key: "attack_speed", upgradeKey: UPGRADE_ATTACK_SPEED },
  ];

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <p>
        <strong>Level:</strong> {gameState.hero.level}
        {gameState.hero.level >= GameState.MAX_LEVEL ? " (max)" : ""}
      </p>
      <p>
        <strong>Unspent Stat Points:</strong> {gameState.hero.unspent_points}
      </p>

      {statElements.map((stat) => (
        <div key={stat.upgradeKey} className="d-flex align-items-center justify-content-center mb-2">
          <span style={{ width: "200px", textAlign: "right" }}>
            <strong>{stat.label}:</strong> {Math.round((gameState.hero[stat.key] || 0) * 100) / 100}{" "}
            ({gameState.hero.upgradeCounts[stat.upgradeKey]}/{GameState.UPGRADE_LIMITS[stat.upgradeKey]})
          </span>

          {showButtons && (
            <>
              {/* Plus Button */}
              <button
                className="btn btn-light mx-2"
                style={{ width: "40px", height: "40px", padding: 0 }} // Ensure padding is removed
                onClick={() => handleUpgrade(stat.upgradeKey)}
                disabled={
                  gameState.hero.unspent_points <= 0 ||
                  gameState.hero.upgradeCounts[stat.upgradeKey] >= GameState.UPGRADE_LIMITS[stat.upgradeKey]
                }
              >
              <img
                src={buttonPlus}
                alt="+"
                style={{ display: "block", width: "100%", height: "100%" }} // Block display ensures it fills the button
              />
              </button>
              {/* Minus Button */}
              <button
                className="btn btn-light mx-2"
                style={{ width: "40px", height: "40px", padding: 0 }}
                onClick={() => handleRefund(stat.upgradeKey)}
                disabled={gameState.hero.upgradeCounts[stat.upgradeKey] <= 0}
              >
                <img src={buttonMinus} alt="-" style={{ display: "block", width: "100%", height: "100%" }} />
              </button>
            </>
          )}
        </div>
      ))}

      <p>
        <strong>Bonus Damage:</strong> {Math.round(gameState.hero.bonus_damage * 100) / 100}%
      </p>
      <p>
        <strong>Damage Reduction:</strong> {Math.round(gameState.hero.damage_reduction * 100) / 100}%
      </p>
      <p>
        <strong>Damage Reflection:</strong> {Math.round(gameState.hero.reflect_damage * 100) / 100}%
      </p>
    </div>
  );
};

export default ListHeroStats;
