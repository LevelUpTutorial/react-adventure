import { getItemImage } from './../GameUtils.js';
import ListHeroStats from "./ListHeroStats";

const CharacterInventoryDialog = ({ show, gameState, onClose }) => {
  if (!show) return null;

  const { hero } = gameState;

  // Define Inventory Grid Slots
  const inventoryGrid = [
    [hero.amulet, hero.helm],
    [hero.sword, hero.armor],
    [hero.ring, hero.boots],
  ];

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

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title text-white">Character Inventory</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            
            {/* Inventory Grid */}
            <div className="container">
              {inventoryGrid.map((row, rowIndex) => (
                <div className="d-flex justify-content-center mb-4" key={rowIndex}>
                  {row.map((item, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`inventory-slot border ${item ? getRarityBorderClass(item.itemRarity) : "border-secondary"} m-2 d-flex flex-column align-items-center`}
                      style={{ width: "120px", height: "160px", backgroundColor: "#2c2f33", borderWidth: "4px", borderStyle: "solid", padding: "10px" }}
                    >
                      {item ? (
                        <>
                          <img 
                            src={getItemImage(item)} 
                            alt={item.itemType} 
                            className="img-fluid" 
                            style={{ maxWidth: "100px", maxHeight: "80px" }} 
                          />
                          {item.statDescriptions && item.statDescriptions.length > 0 && (
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

            {/* Centered Hero Stats Section */}
            <div className="mt-4 d-flex justify-content-center">
              <ListHeroStats gameState={gameState} />
            </div>

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
