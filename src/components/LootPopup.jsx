import { getItemImage } from './../GameUtils.js';

const LootPopup = ({ show, gameState, newItem, onEquip, onKeep }) => {
  if (!show) return null; // Don't render the popup if not visible

  // Determine the currently equipped item based on type
  let currentItem = null;

  if (newItem.itemType === "Armor") {
    currentItem = gameState.hero.armor;
  } else if (newItem.itemType === "Helm") {
    currentItem = gameState.hero.helm;
  } else if (newItem.itemType === "Boots") {
    currentItem = gameState.hero.boots;
  } else if (newItem.itemType === "Ring") {
    currentItem = gameState.hero.ring;
  } else if (newItem.itemType === "Amulet") {
    currentItem = gameState.hero.amulet;
  } else if (newItem.itemType === "Sword") {
    currentItem = gameState.hero.sword;
  } else {
    console.error(`Unknown item type: ${newItem.itemType}`);
    return null;
  }

  // Determine if the new item is better (only applicable if it has one stat)
  const isSingleStat = Object.keys(newItem.itemStats).length === 1;
  const primaryStatKey = Object.keys(newItem.itemStats)[0]; // First stat key
  const isBetter = isSingleStat && newItem.itemStats[primaryStatKey] > (currentItem.itemStats[primaryStatKey] || 0);

  // Function to get rarity-based classNames
  const getRarityClass = (rarity, type) => {
    const classes = {
      common: { text: "text-secondary", bg: "bg-secondary", border: "border-secondary" },
      uncommon: { text: "text-success", bg: "bg-success", border: "border-success" },
      rare: { text: "text-primary", bg: "bg-primary", border: "border-primary" },
      epic: { text: "text-purple", bg: "bg-purple", border: "border-purple" },
      legendary: { text: "text-dark-orange", bg: "bg-dark-orange", border: "border-dark-orange" },
      perfectLegendary: { text: "text-dark-orange", bg: "bg-dark-orange", border: "border-dark-orange" },
    };
    return classes[rarity] ? classes[rarity][type] : "text-muted bg-light border-muted";
  };

  // Rarity-based classes
  const oldRarityClass = getRarityClass(currentItem.itemRarity, "text");
  const newRarityClass = getRarityClass(newItem.itemRarity, "text");
  const newRarityBgClass = getRarityClass(newItem.itemRarity, "bg");
  const oldRarityBdClass = getRarityClass(currentItem.itemRarity, "border");
  const newRarityBdClass = getRarityClass(newItem.itemRarity, "border");

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className={`modal-header ${newRarityBgClass}`}>
            <h5 className="modal-title text-white">You found...</h5>
          </div>
          <div className="modal-body d-flex justify-content-around align-items-center">
            {/* Current Item */}
            <div className="text-center">
              <h5>Equipped</h5>
              <img
                src={getItemImage(currentItem)}
                alt="Current Item"
                className={`img-fluid mb-3 rounded ${oldRarityBdClass}`}
                style={{ maxWidth: "100px", borderWidth: "4px", borderStyle: "solid" }}
              />
              <p><strong>Rarity:</strong> <span className={oldRarityClass}>{currentItem.itemRarity}</span></p>
              {currentItem.statDescriptions.map((desc, index) => (
                <p key={index}><strong>{desc}</strong></p>
              ))}
            </div>
            {/* New Item */}
            <div className="text-center">
              <h5>New {newItem.itemType}</h5>
              <img
                src={getItemImage(newItem)}
                alt="New Item"
                className={`img-fluid mb-3 rounded ${newRarityBdClass}`}
                style={{ maxWidth: "100px", borderWidth: "4px", borderStyle: "solid" }}
              />
              <p><strong>Rarity:</strong> <span className={newRarityClass}>{newItem.itemRarity}</span></p>
              {newItem.statDescriptions.map((desc, index) => (
                <p key={index} className="">
                  <strong>{desc}</strong>
                </p>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className={`btn ${isSingleStat ? (isBetter ? "btn-secondary" : "btn-success") : "btn-success"}`} onClick={onKeep}>
              Keep Equipped
            </button>
            <button className={`btn ${isSingleStat ? (!isBetter ? "btn-secondary" : "btn-success") : "btn-success"}`} onClick={onEquip}>
              Equip New {newItem.itemType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LootPopup;
