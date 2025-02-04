import {
  UPGRADE_DAMAGE,
  UPGRADE_MAX_HEALTH,
  UPGRADE_CRIT_CHANCE,
  UPGRADE_CRIT_DAMAGE,
  UPGRADE_EVADE_CHANCE,
  UPGRADE_ATTACK_SPEED,
} from './../GameUtils.js';
import GameState from './../GameState.js';
import buttonPlus from "./assets/images/button_plus.jpg"; 
import buttonMinus from "./assets/images/button_minus.jpg";

const ListHeroStats = ({ gameState, handleUpgrade, handleRefund, showButtons = false }) => {
  if (!gameState || !gameState.hero) return null;

  const heroHPCramped = Math.ceil(Math.max(0, gameState.hero.health));

  const statElements = [
    { label: "Attack", key: UPGRADE_DAMAGE },
    { label: "Health", key: UPGRADE_MAX_HEALTH },
    { label: "Crit Chance", key: UPGRADE_CRIT_CHANCE },
    { label: "Crit Damage", key: UPGRADE_CRIT_DAMAGE },
    { label: "Evade Chance", key: UPGRADE_EVADE_CHANCE },
    { label: "Attack Cooldown", key: UPGRADE_ATTACK_SPEED },
  ];

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <p>
        <strong>Level:</strong> {gameState.hero.level}
        {gameState.hero.level >= GameState.MAX_LEVEL ? " (max)" : ""}
      </p>
      <p>
        <strong>Damage Reduction:</strong> {Math.round(gameState.hero.damage_reduction * 100) / 100}%
      </p>
      <p>
        <strong>Bonus Damage:</strong> {Math.round(gameState.hero.bonus_damage * 100) / 100}%
      </p>

      {statElements.map((stat) => (
        <div key={stat.key} className="d-flex align-items-center justify-content-center mb-2">
          <span style={{ width: "200px", textAlign: "right" }}>
            <strong>{stat.label}:</strong> {Math.round(gameState.hero[stat.key] * 100) / 100}{" "}
            ({gameState.hero.upgradeCounts[stat.key]}/{GameState.UPGRADE_LIMITS[stat.key]})
          </span>

          {showButtons && (
            <>
              {/* Minus Button */}
              <button
                className="btn btn-light mx-2"
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleRefund(stat.key)}
                disabled={gameState.hero.upgradeCounts[stat.key] <= 0}
              >
                <img src={buttonMinus} alt="-" style={{ width: "100%", height: "100%" }} />
              </button>

              {/* Plus Button */}
              <button
                className="btn btn-light mx-2"
                style={{ width: "30px", height: "30px" }}
                onClick={() => handleUpgrade(stat.key)}
                disabled={
                  gameState.hero.unspent_points <= 0 ||
                  gameState.hero.upgradeCounts[stat.key] >= GameState.UPGRADE_LIMITS[stat.key]
                }
              >
                <img src={buttonPlus} alt="+" style={{ width: "100%", height: "100%" }} />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListHeroStats;
