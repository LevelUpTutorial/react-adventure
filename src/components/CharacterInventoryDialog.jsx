import { useState } from "react";
import { getItemImage } from './../GameUtils.js';
import ListHeroStats from "./ListHeroStats";
import {
  UPGRADE_DAMAGE,
  UPGRADE_MAX_HEALTH,
  UPGRADE_CRIT_CHANCE,
  UPGRADE_CRIT_DAMAGE,
  UPGRADE_EVADE_CHANCE,
  UPGRADE_ATTACK_SPEED,
  DAMAGE_INCREMENT,
  MAX_HEALTH_INCREMENT,
  CRIT_CHANCE_INCREMENT,
  CRIT_DAMAGE_INCREMENT,
  EVADE_CHANCE_INCREMENT,
  ATTACK_SPEED_DECREASE,
} from './../GameUtils.js';
import GameState from './../GameState.js';

const CharacterInventoryDialog = ({ show, gameState, onClose, setGameState }) => {
  if (!show) return null;

  const { hero } = gameState;

  // Define Inventory Grid Slots
  const inventoryGrid = [
    [null, hero.helm, hero.amulet],
    [hero.sword, hero.armor, hero.ring],
    [null, hero.boots, null],
  ];

  // State to track the selected item for showing description
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to toggle selected item
  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null); // Deselect if the same item is clicked
    } else {
      setSelectedItem(item); // Set the new selected item
    }
  };

  // Function to get rarity-based border color
  const getRarityBorderClass = (rarity) => {
    const classes = {
      common: "border-secondary",
      uncommon: "border-success",
      rare: "border-primary",
      epic: "border-purple",
      legendary: "border-dark-orange",
      perfectLegendary: "border-dark-orange",
    };
    return classes[rarity] || "border-muted";
  };

  // Handle Stat Upgrade
  const handleUpgrade = (statKey) => {
    setGameState((prevState) => {
      const hero = prevState.hero;
      if (hero.unspent_points > 0 && hero.upgradeCounts[statKey] < GameState.UPGRADE_LIMITS[statKey]) {
        hero.upgradeCounts[statKey] += 1;
        hero.unspent_points -= 1;

        if (statKey === UPGRADE_DAMAGE) {
          hero.attack += DAMAGE_INCREMENT;
        } else if (statKey === UPGRADE_MAX_HEALTH) {
          hero.health_full += MAX_HEALTH_INCREMENT;
          hero.health = hero.health_full;
        } else if (statKey === UPGRADE_CRIT_CHANCE) {
          hero.crit_chance += CRIT_CHANCE_INCREMENT;
        } else if (statKey === UPGRADE_CRIT_DAMAGE) {
          hero.crit_damage += CRIT_DAMAGE_INCREMENT;
        } else if (statKey === UPGRADE_EVADE_CHANCE) {
          hero.evade_chance += EVADE_CHANCE_INCREMENT;
        } else if (statKey === UPGRADE_ATTACK_SPEED) {
          hero.attack_speed -= ATTACK_SPEED_DECREASE;
          hero.attack_cooldown = hero.attack_speed;
        }
      }
      return { ...prevState, hero };
    });
  };

  // Handle Stat Refund
  const handleRefund = (statKey) => {
    setGameState((prevState) => {
      const hero = prevState.hero;
      if (hero.upgradeCounts[statKey] > 0) {
        hero.upgradeCounts[statKey] -= 1;
        hero.unspent_points += 1;

        if (statKey === UPGRADE_DAMAGE) {
          hero.attack -= DAMAGE_INCREMENT;
        } else if (statKey === UPGRADE_MAX_HEALTH) {
          hero.health_full -= MAX_HEALTH_INCREMENT;
          hero.health = hero.health_full;
        } else if (statKey === UPGRADE_CRIT_CHANCE) {
          hero.crit_chance -= CRIT_CHANCE_INCREMENT;
        } else if (statKey === UPGRADE_CRIT_DAMAGE) {
          hero.crit_damage -= CRIT_DAMAGE_INCREMENT;
        } else if (statKey === UPGRADE_EVADE_CHANCE) {
          hero.evade_chance -= EVADE_CHANCE_INCREMENT;
        } else if (statKey === UPGRADE_ATTACK_SPEED) {
          hero.attack_speed += ATTACK_SPEED_DECREASE;
          hero.attack_cooldown = hero.attack_speed;
        }
      }
      return { ...prevState, hero };
    });
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white">Character Inventory</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            {/* Inventory Grid */}
            <div className="container d-flex flex-column">
              {inventoryGrid.map((row, rowIndex) => (
                <div className="d-flex justify-content-evenly" key={rowIndex}>
                  {row.map((item, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`inventory-slot border ${item ? getRarityBorderClass(item.itemRarity) : "border-secondary"} d-flex flex-column align-items-center`}
                      style={{ 
                        width: "120px", 
                        height: selectedItem === item ? "auto" : "120px", // Expand slot for selected item
                        backgroundColor: "#2c2f33", 
                        borderWidth: "8px", 
                        borderStyle: "solid",  
                      }}
                      onClick={() => handleItemClick(item)}
                    >
                      {item ? (
                        <>
                          <img 
                            src={getItemImage(item)} 
                            alt={item.itemType} 
                            className="img-fluid" 
                            style={{ width: "auto", height: "auto" }} 
                          />
                          {selectedItem === item && item.statDescriptions && (
                            <p className="text-white text-center mt-1" style={{ fontSize: "12px", lineHeight: "1.2" }}>
                              {item.statDescriptions.join(" • ")}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Centered Hero Stats Section */}
          <div className="mt-1">
            <ListHeroStats
              gameState={gameState}
              handleUpgrade={handleUpgrade}
              handleRefund={handleRefund}
              showButtons={true}
            />
          </div>
          {/* Centered Close Button */}
          <div className="modal-footer d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInventoryDialog;
